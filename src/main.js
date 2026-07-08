const { app, BrowserWindow, Menu, Tray, dialog, ipcMain, nativeImage, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const { exec, execFile, spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const pty = require('node-pty');
const packageJson = require('../package.json');

const APP_NAME = 'Codex VDS Launcher';
const BETA_APP_NAME = 'Codex VDS Launcher Beta';
const APP_VERSION = packageJson.version;
const IS_BETA_BUILD = /(?:^|-)beta(?:\.|$)/i.test(APP_VERSION);
const APP_DISPLAY_NAME = IS_BETA_BUILD ? (packageJson.desktopName || BETA_APP_NAME) : APP_NAME;
const UPDATE_CHANNEL = IS_BETA_BUILD ? 'beta' : 'latest';
const RELEASE_NAME = packageJson.releaseName || 'Codex VDS Launcher Developer Beta 4';
const DISPLAY_VERSION = packageJson.displayVersion || packageJson.version;
const SSH_CONNECT_TIMEOUT_SECONDS = 15;
const DIAGNOSTIC_TIMEOUT_MS = 30000;
const LONG_DIAGNOSTIC_TIMEOUT_MS = 60000;
const MAX_BUFFER = 1024 * 1024 * 5;
const DEFAULT_COLS = 120;
const DEFAULT_ROWS = 34;
const CONFIG_FILE_NAME = 'config.json';
const HISTORY_FILE_NAME = 'codex-history.json';
const SETTINGS_FILE_NAME = 'codex-settings.json';
const LAUNCH_STATE_FILE_NAME = 'launch-state.json';
const MANAGED_AGENT_MARKER = '<!-- Managed by Codex VDS Launcher -->';
const MAX_MARKDOWN_INSTRUCTION_BYTES = 256 * 1024;
const ALLOWED_CODEX_COMMANDS = new Set(['codex', 'codex-vpn']);
const RENDERER_ASSETS_DIR = path.join(__dirname, 'renderer', 'assets');
const APP_ICON_PATH = path.join(RENDERER_ASSETS_DIR, 'app-icon.png');
const TRAY_ICON_PATH = path.join(RENDERER_ASSETS_DIR, 'tray-iconTemplate@2x.png');

const DEFAULT_QUICK_PROMPTS = [
  {
    id: 'project-map',
    title: 'Project map',
    text: 'Analyze this repository and show a concise project map. Do not modify files.'
  },
  {
    id: 'git-status',
    title: 'Git status',
    text: 'Show git status, current branch, remotes, and recent commits. Do not modify files.'
  },
  {
    id: 'plan-before-changes',
    title: 'Plan before changes',
    text: 'Before changing files, explain the implementation plan, affected files, risks, and rollback strategy.'
  },
  {
    id: 'docker-overview',
    title: 'Docker overview',
    text: 'Show docker compose files, running containers, and health status. Do not restart services.'
  },
  {
    id: 'server-health',
    title: 'Server health',
    text: 'Show uptime, disk usage, memory usage, load average, and current directory. Do not modify files.'
  },
  {
    id: 'safe-production-check',
    title: 'Safe production check',
    text: 'Run read-only checks only. Do not restart services, do not run migrations, do not delete files, do not change firewall, SSH, VPN, systemd, or database state.'
  }
];

const DEFAULT_QUICK_COMMAND_SETS = [
  {
    id: 'pwd-git-status',
    title: 'pwd + git status',
    text: 'pwd\ngit status --short --branch'
  },
  {
    id: 'docker-ps',
    title: 'Docker ps',
    text: 'docker ps'
  },
  {
    id: 'compose-ps',
    title: 'Compose ps',
    text: 'docker compose ps'
  }
];

const DEFAULT_AGENT_INSTRUCTIONS = [
  '# Codex VDS Launcher',
  '',
  '- Answer concisely and stay focused on the requested task.',
  '- Explain the plan before risky changes.',
  '- Do not print secrets, tokens, private keys, or .env values.',
  '- Do not run destructive commands without explicit confirmation.',
  '- Write release notes only when the user asks for them.'
].join('\n');

const DEFAULT_CONFIG = {
  sshAlias: 'my-vds',
  codexCommand: 'codex',
  projects: [
    {
      id: 'root',
      name: 'Server root',
      path: '/'
    },
    {
      id: 'app',
      name: 'App',
      path: '/opt/app'
    }
  ],
  quickPrompts: DEFAULT_QUICK_PROMPTS
};

let mainWindow = null;
let tray = null;
let nextSessionNumber = 1;
let currentConfig = null;
let showVersionWelcomeOnLoad = false;
const sessions = new Map();
let updateState = {
  status: 'idle',
  channel: UPDATE_CHANNEL,
  currentVersion: APP_VERSION,
  displayVersion: DISPLAY_VERSION,
  releaseName: RELEASE_NAME,
  availableVersion: null,
  percent: null,
  message: ''
};
let updateCheckInProgress = false;
let manualUpdateCheck = false;

function getUserDataDir() {
  try {
    return app.getPath('userData');
  } catch (_error) {
    return path.join(os.homedir(), '.codex-vds-launcher');
  }
}

function ensureUserDataDir() {
  const userDataDir = getUserDataDir();
  fs.mkdirSync(userDataDir, { recursive: true });
  return userDataDir;
}

function getDataFilePath(fileName) {
  return path.join(ensureUserDataDir(), fileName);
}

function readJsonFile(fileName, fallbackValue) {
  const filePath = getDataFilePath(fileName);

  try {
    if (!fs.existsSync(filePath)) {
      return fallbackValue;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    return raw.trim() ? JSON.parse(raw) : fallbackValue;
  } catch (error) {
    console.error(`Failed to read ${fileName}:`, error);
    return fallbackValue;
  }
}

function writeJsonFile(fileName, value) {
  const filePath = getDataFilePath(fileName);
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(tempPath, filePath);
  return filePath;
}

function shouldShowVersionWelcome() {
  const state = readJsonFile(LAUNCH_STATE_FILE_NAME, {});
  const previousVersion = typeof state.version === 'string' ? state.version : null;

  writeJsonFile(LAUNCH_STATE_FILE_NAME, {
    version: APP_VERSION,
    displayVersion: DISPLAY_VERSION,
    updatedAt: new Date().toISOString()
  });

  return Boolean(previousVersion && previousVersion !== APP_VERSION);
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (_error) {
    return false;
  }
}

function findInPath(commandName) {
  const pathEntries = (process.env.PATH || '').split(path.delimiter).filter(Boolean);

  for (const entry of pathEntries) {
    const candidate = path.join(entry, commandName);

    if (fileExists(candidate)) {
      return candidate;
    }
  }

  return null;
}

function resolveSshExecutable() {
  const candidates = [];

  if (process.platform === 'win32') {
    const systemRoot = process.env.SystemRoot || process.env.WINDIR || 'C:\\Windows';
    candidates.push(
      path.join(systemRoot, 'System32', 'OpenSSH', 'ssh.exe'),
      path.join(systemRoot, 'Sysnative', 'OpenSSH', 'ssh.exe')
    );

    if (process.env.ProgramFiles) {
      candidates.push(path.join(process.env.ProgramFiles, 'Git', 'usr', 'bin', 'ssh.exe'));
    }

    if (process.env['ProgramFiles(x86)']) {
      candidates.push(path.join(process.env['ProgramFiles(x86)'], 'Git', 'usr', 'bin', 'ssh.exe'));
    }

    const pathSsh = findInPath('ssh.exe');
    if (pathSsh) {
      candidates.push(pathSsh);
    }
  } else {
    const pathSsh = findInPath('ssh');
    if (pathSsh) {
      candidates.push(pathSsh);
    }

    candidates.push('/usr/bin/ssh', '/usr/local/bin/ssh', '/opt/homebrew/bin/ssh');
  }

  const sshPath = candidates.find((candidate) => candidate && fileExists(candidate));

  return {
    ok: Boolean(sshPath),
    path: sshPath || null,
    error: sshPath ? '' : 'OpenSSH client was not found. Install OpenSSH or add ssh to PATH.'
  };
}

function validateSshAlias(value) {
  return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(value);
}

function validateProjectId(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{1,80}$/.test(value);
}

function validateUnixPath(value) {
  return typeof value === 'string'
    && value.startsWith('/')
    && value.length <= 4096
    && !/[\0\r\n]/.test(value);
}

function normalizeQuickItems(value, fallbackItems) {
  const source = Array.isArray(value) ? value : fallbackItems;
  const items = [];
  const seen = new Set();

  source.slice(0, 50).forEach((item, index) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    const title = typeof item.title === 'string' ? item.title.trim().slice(0, 80) : '';
    const text = typeof item.text === 'string' ? item.text.trim().slice(0, 8000) : '';
    const fallbackId = `quick-${index + 1}`;
    const id = validateProjectId(item.id) ? item.id : fallbackId;

    if (!title || !text || seen.has(id)) {
      return;
    }

    seen.add(id);
    items.push({ id, title, text });
  });

  return items.length > 0 ? items : fallbackItems.map((item) => ({ ...item }));
}

function normalizeProjects(value) {
  const source = Array.isArray(value) ? value : DEFAULT_CONFIG.projects;
  const projects = [];
  const seen = new Set();

  source.slice(0, 100).forEach((item) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    const id = typeof item.id === 'string' ? item.id.trim() : '';
    const name = typeof item.name === 'string' ? item.name.trim().slice(0, 100) : '';
    const remotePath = typeof item.path === 'string' ? item.path.trim() : '';

    if (!validateProjectId(id) || !name || !validateUnixPath(remotePath) || seen.has(id)) {
      return;
    }

    seen.add(id);
    projects.push({ id, name, path: remotePath });
  });

  return projects.length > 0 ? projects : DEFAULT_CONFIG.projects.map((item) => ({ ...item }));
}

function normalizeConfig(value = {}) {
  const errors = [];
  const sshAlias = validateSshAlias(value.sshAlias) ? value.sshAlias : DEFAULT_CONFIG.sshAlias;
  const codexCommand = ALLOWED_CODEX_COMMANDS.has(value.codexCommand)
    ? value.codexCommand
    : DEFAULT_CONFIG.codexCommand;
  const projects = normalizeProjects(value.projects);

  if (value.sshAlias && !validateSshAlias(value.sshAlias)) {
    errors.push('Invalid sshAlias. Use letters, digits, dot, underscore, or dash.');
  }

  if (value.codexCommand && !ALLOWED_CODEX_COMMANDS.has(value.codexCommand)) {
    errors.push(`Invalid codexCommand. Allowed values: ${Array.from(ALLOWED_CODEX_COMMANDS).join(', ')}.`);
  }

  if (Array.isArray(value.projects) && projects.length !== value.projects.length) {
    errors.push('Some projects were ignored because id/name/path validation failed.');
  }

  return {
    version: 1,
    path: getDataFilePath(CONFIG_FILE_NAME),
    sshAlias,
    codexCommand,
    projects,
    quickPrompts: normalizeQuickItems(value.quickPrompts, DEFAULT_QUICK_PROMPTS),
    validationErrors: errors
  };
}

function ensureConfigFile() {
  const configPath = getDataFilePath(CONFIG_FILE_NAME);

  if (!fs.existsSync(configPath)) {
    writeJsonFile(CONFIG_FILE_NAME, DEFAULT_CONFIG);
  }

  return configPath;
}

function loadAppConfig() {
  ensureConfigFile();
  currentConfig = normalizeConfig(readJsonFile(CONFIG_FILE_NAME, DEFAULT_CONFIG));
  return currentConfig;
}

function getConfig() {
  return currentConfig || loadAppConfig();
}

function getProject(projectId) {
  return getConfig().projects.find((project) => project.id === projectId) || null;
}

function emptyBuffers() {
  return Object.fromEntries(getConfig().projects.map((project) => [project.id, '']));
}

function normalizeHistory(value = {}) {
  const buffers = emptyBuffers();
  const sourceBuffers = value && typeof value.buffers === 'object' ? value.buffers : value;

  if (sourceBuffers && typeof sourceBuffers === 'object') {
    for (const [projectId, buffer] of Object.entries(sourceBuffers)) {
      if (typeof buffer === 'string') {
        buffers[projectId] = buffer.slice(-500000);
      }
    }
  }

  const firstProjectId = getConfig().projects[0]?.id || 'root';
  const activeTargetId = getProject(value.activeTargetId) ? value.activeTargetId : firstProjectId;

  return {
    version: 2,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null,
    activeTargetId,
    buffers
  };
}

function normalizePanelSettings(value = {}) {
  const panels = value && typeof value === 'object' ? value : {};

  return {
    left: panels.left !== false,
    right: panels.right !== false
  };
}

function normalizeAgentInstructions(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text ? text.slice(0, 24000) : DEFAULT_AGENT_INSTRUCTIONS;
}

function normalizeSettings(value = {}) {
  const theme = value.theme === 'light' ? 'light' : 'dark';
  const language = value.language === 'en' ? 'en' : 'ru';
  const allowedAccentColors = new Set(['blue', 'cyan', 'emerald', 'violet', 'rose', 'amber']);
  const accentColor = allowedAccentColors.has(value.accentColor) ? value.accentColor : 'blue';

  return {
    version: 5,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null,
    language,
    theme,
    accentColor,
    panels: normalizePanelSettings(value.panels),
    onboardingSeen: value.onboardingSeen === true,
    syncAgentInstructions: value.syncAgentInstructions !== false,
    agentInstructions: normalizeAgentInstructions(value.agentInstructions),
    quickCommandSets: normalizeQuickItems(value.quickCommandSets, DEFAULT_QUICK_COMMAND_SETS)
  };
}

function loadHistory() {
  return normalizeHistory(readJsonFile(HISTORY_FILE_NAME, {}));
}

function saveHistory(history) {
  const normalized = normalizeHistory({
    ...history,
    updatedAt: new Date().toISOString()
  });
  writeJsonFile(HISTORY_FILE_NAME, normalized);
  return normalized;
}

function clearHistory() {
  const emptyHistory = normalizeHistory({
    updatedAt: new Date().toISOString(),
    activeTargetId: getConfig().projects[0]?.id || 'root',
    buffers: emptyBuffers()
  });
  writeJsonFile(HISTORY_FILE_NAME, emptyHistory);
  return emptyHistory;
}

function loadSettings() {
  return normalizeSettings(readJsonFile(SETTINGS_FILE_NAME, {}));
}

function saveSettings(settings) {
  const current = readJsonFile(SETTINGS_FILE_NAME, {});
  const normalized = normalizeSettings({
    ...current,
    ...settings,
    updatedAt: new Date().toISOString()
  });
  writeJsonFile(SETTINGS_FILE_NAME, normalized);
  return normalized;
}

function saveQuickPrompts(quickPrompts) {
  const current = readJsonFile(CONFIG_FILE_NAME, DEFAULT_CONFIG);
  const normalizedPrompts = normalizeQuickItems(quickPrompts, DEFAULT_QUICK_PROMPTS);
  writeJsonFile(CONFIG_FILE_NAME, {
    ...current,
    quickPrompts: normalizedPrompts
  });
  return loadAppConfig();
}

function sendToRenderer(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

function sendUiCommand(command) {
  sendToRenderer('ui:command', { command });
}

function updateStatus(overrides = {}) {
  updateState = {
    ...updateState,
    ...overrides,
    channel: UPDATE_CHANNEL,
    currentVersion: APP_VERSION,
    displayVersion: DISPLAY_VERSION,
    releaseName: RELEASE_NAME
  };
  sendToRenderer('updates:status', updateState);
  return updateState;
}

function updaterMessage(error) {
  if (!error) {
    return '';
  }

  return error.message || String(error);
}

function configureAutoUpdater() {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.allowPrerelease = IS_BETA_BUILD;
  autoUpdater.allowDowngrade = false;
  autoUpdater.channel = UPDATE_CHANNEL;

  autoUpdater.on('checking-for-update', () => {
    updateStatus({
      status: 'checking',
      availableVersion: null,
      percent: null,
      message: 'Проверяем обновления...'
    });
  });

  autoUpdater.on('update-available', (info) => {
    updateStatus({
      status: 'downloading',
      availableVersion: info?.version || null,
      percent: 0,
      message: `Найдена версия ${info?.version || 'обновления'}. Скачиваем...`
    });

    autoUpdater.downloadUpdate().catch((error) => {
      updateCheckInProgress = false;
      manualUpdateCheck = false;
      updateStatus({
        status: 'error',
        percent: null,
        message: updaterMessage(error)
      });
    });
  });

  autoUpdater.on('update-not-available', () => {
    updateCheckInProgress = false;
    updateStatus({
      status: 'latest',
      availableVersion: null,
      percent: null,
      message: 'У вас установлена последняя версия.'
    });

    if (manualUpdateCheck) {
      manualUpdateCheck = false;
      dialog.showMessageBox(mainWindow || undefined, {
        type: 'info',
        buttons: ['OK'],
        defaultId: 0,
        message: 'У вас установлена последняя версия',
        detail: `Сейчас работает ${RELEASE_NAME}: ${DISPLAY_VERSION}. Канал обновлений: ${UPDATE_CHANNEL}.`
      }).catch(() => {});
    }
  });

  autoUpdater.on('download-progress', (progress) => {
    updateStatus({
      status: 'downloading',
      percent: Math.max(0, Math.min(100, Number(progress.percent) || 0)),
      message: `Скачиваем обновление: ${Math.round(Number(progress.percent) || 0)}%`
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    updateCheckInProgress = false;
    manualUpdateCheck = false;
    updateStatus({
      status: 'downloaded',
      availableVersion: info?.version || updateState.availableVersion,
      percent: 100,
      message: 'Обновление скачано и готово к установке.'
    });

    dialog.showMessageBox(mainWindow || undefined, {
      type: 'question',
      buttons: ['Перезапустить и установить', 'Позже'],
      defaultId: 0,
      cancelId: 1,
      message: 'Обновление готово к установке',
      detail: `Будет установлена версия ${info?.version || 'обновления'}. После запуска появится приветственное окно с текущей версией.`
    }).then(({ response }) => {
      if (response === 0) {
        stopAllTerminalSessions();
        autoUpdater.quitAndInstall(false, true);
      }
    }).catch(() => {});
  });

  autoUpdater.on('error', (error) => {
    updateCheckInProgress = false;
    const message = updaterMessage(error);
    updateStatus({
      status: 'error',
      percent: null,
      message
    });

    if (manualUpdateCheck) {
      manualUpdateCheck = false;
      dialog.showMessageBox(mainWindow || undefined, {
        type: 'error',
        buttons: ['OK'],
        defaultId: 0,
        message: 'Не удалось проверить обновления',
        detail: message
      }).catch(() => {});
    }
  });
}

async function checkForUpdates({ manual = false } = {}) {
  if (!app.isPackaged) {
    const state = updateStatus({
      status: 'unsupported',
      percent: null,
      message: 'Обновления доступны только в установленной сборке приложения.'
    });

    if (manual) {
      await dialog.showMessageBox(mainWindow || undefined, {
        type: 'info',
        buttons: ['OK'],
        defaultId: 0,
        message: 'Обновления доступны после установки приложения',
        detail: 'В dev-режиме Electron не использует app-update.yml из собранного пакета.'
      });
    }

    return { ok: false, state };
  }

  if (updateCheckInProgress) {
    return { ok: true, state: updateState };
  }

  manualUpdateCheck = manual;
  updateCheckInProgress = true;

  try {
    await autoUpdater.checkForUpdates();
    return { ok: true, state: updateState };
  } catch (error) {
    const wasManual = manualUpdateCheck;
    updateCheckInProgress = false;
    manualUpdateCheck = false;
    const state = updateStatus({
      status: 'error',
      percent: null,
      message: updaterMessage(error)
    });

    if (wasManual) {
      await dialog.showMessageBox(mainWindow || undefined, {
        type: 'error',
        buttons: ['OK'],
        defaultId: 0,
        message: 'Не удалось проверить обновления',
        detail: state.message
      });
    }

    return { ok: false, state, error: state.message };
  }
}

function getSshConfigPath() {
  return path.join(os.homedir(), '.ssh', 'config');
}

function sshConfigHasAlias(configText, alias) {
  const wanted = alias.toLowerCase();
  const lines = configText.split(/\r?\n/);

  return lines.some((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      return false;
    }

    const match = /^Host\s+(.+)$/i.exec(trimmed);

    if (!match) {
      return false;
    }

    return match[1].split(/\s+/).some((pattern) => pattern.toLowerCase() === wanted);
  });
}

function buildSshConfigExample(alias = getConfig().sshAlias) {
  return [
    `Host ${alias}`,
    '    HostName YOUR_SERVER_IP',
    '    User root',
    '    IdentityFile ~/.ssh/my_vds_key',
    '    IdentitiesOnly yes',
    '    PreferredAuthentications publickey',
    '    PasswordAuthentication no',
    '    ServerAliveInterval 30',
    '    ServerAliveCountMax 3'
  ].join('\n');
}

function getSshSetupStatus() {
  const config = getConfig();
  const ssh = resolveSshExecutable();
  const configPath = getSshConfigPath();
  let configText = '';
  let aliasPresent = false;
  let error = '';

  try {
    if (fileExists(configPath)) {
      configText = fs.readFileSync(configPath, 'utf8');
      aliasPresent = sshConfigHasAlias(configText, config.sshAlias);
    }
  } catch (readError) {
    error = readError.message || String(readError);
  }

  if (!ssh.ok) {
    error = ssh.error;
  } else if (!aliasPresent) {
    error = `SSH alias "${config.sshAlias}" was not found in ${configPath}. Add it manually and reload config.`;
  }

  return {
    ok: ssh.ok && aliasPresent && !error,
    checkedAt: new Date().toISOString(),
    sshFound: ssh.ok,
    sshPath: ssh.path,
    alias: config.sshAlias,
    aliasPresent,
    configPath,
    error,
    example: buildSshConfigExample(config.sshAlias)
  };
}

function runLocalCommand(command, timeout = DIAGNOSTIC_TIMEOUT_MS) {
  return new Promise((resolve) => {
    exec(command, { timeout, maxBuffer: MAX_BUFFER }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        command,
        stdout: stdout || '',
        stderr: stderr || '',
        error: error ? error.message : ''
      });
    });
  });
}

function runSshCommand(remoteCommand, timeout = DIAGNOSTIC_TIMEOUT_MS) {
  const config = getConfig();
  const ssh = resolveSshExecutable();
  const setup = getSshSetupStatus();

  if (!ssh.ok) {
    return Promise.resolve({
      ok: false,
      command: `ssh ${config.sshAlias} ${quoteRemoteCommandForLocalShell(remoteCommand)}`,
      stdout: '',
      stderr: '',
      error: ssh.error
    });
  }

  if (!setup.ok) {
    return Promise.resolve({
      ok: false,
      command: `${ssh.path} ${config.sshAlias} ${quoteRemoteCommandForLocalShell(remoteCommand)}`,
      stdout: '',
      stderr: '',
      error: setup.error
    });
  }

  const args = [
    '-o',
    'BatchMode=yes',
    '-o',
    `ConnectTimeout=${SSH_CONNECT_TIMEOUT_SECONDS}`,
    config.sshAlias,
    remoteCommand
  ];

  return new Promise((resolve) => {
    execFile(ssh.path, args, { timeout, maxBuffer: MAX_BUFFER }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        command: `${ssh.path} ${args.join(' ')}`,
        stdout: stdout || '',
        stderr: stderr || '',
        error: error ? error.message : ''
      });
    });
  });
}

function escapeAppleScriptString(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function quoteLocalCommandPath(value) {
  if (process.platform === 'win32') {
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  return value.includes(' ') ? `"${value.replace(/"/g, '\\"')}"` : value;
}

function quoteForPosixShell(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

function quoteRemoteCommandForLocalShell(value) {
  return quoteForPosixShell(value);
}

function buildAgentFileText(settings) {
  return `${MANAGED_AGENT_MARKER}\n${normalizeAgentInstructions(settings.agentInstructions)}\n`;
}

function buildTargetLaunchCommand(project, settings = loadSettings()) {
  const config = getConfig();
  const commands = [`cd ${quoteForPosixShell(project.path)} || exit`];

  if (settings.syncAgentInstructions) {
    const agentText = buildAgentFileText(settings);
    commands.push(
      'agent_file=AGENTS.md',
      `agent_marker=${quoteForPosixShell(MANAGED_AGENT_MARKER)}`,
      'if [ -f "$agent_file" ] && ! grep -Fqx "$agent_marker" "$agent_file"; then',
      `  echo "[${APP_NAME}] AGENTS.md was not changed: existing file is not managed by this app."`,
      'else',
      '  umask 077',
      `  printf %s ${quoteForPosixShell(agentText)} > "$agent_file"`,
      `  echo "[${APP_NAME}] AGENTS.md updated from local settings."`,
      'fi'
    );
  }

  commands.push(config.codexCommand);
  return commands.join('\n');
}

function buildDiagnosticCommand(checkId, projectId) {
  const config = getConfig();
  const project = getProject(projectId) || config.projects[0];
  const projectPath = quoteForPosixShell(project.path);
  const codexCommand = config.codexCommand;

  switch (checkId) {
    case 'ssh':
      return ':';
    case 'remote-info':
      return 'printf "user: "; whoami; printf "host: "; hostname; printf "pwd: "; pwd';
    case 'codex-command':
      return `command -v ${codexCommand}`;
    case 'vpn-command':
      return codexCommand === 'codex-vpn' ? 'command -v codex-vpn' : 'printf "codex-vpn is not selected in config.json\\n"';
    case 'server-health':
      return 'uptime; echo; df -h; echo; if command -v free >/dev/null 2>&1; then free -h; else vm_stat 2>/dev/null || true; fi';
    case 'git-status':
      return `cd ${projectPath} && git status --short --branch 2>&1 || true`;
    case 'docker-compose':
      return [
        `cd ${projectPath} || exit`,
        'printf "compose files:\\n"',
        'find . -maxdepth 3 \\( -name "compose.yml" -o -name "compose.yaml" -o -name "docker-compose.yml" -o -name "docker-compose.yaml" \\) -print 2>/dev/null',
        'echo',
        'if command -v docker >/dev/null 2>&1; then docker ps; else echo "Docker is not available."; fi'
      ].join('\n');
    default:
      return null;
  }
}

function runDiagnostic(checkId, projectId) {
  const command = buildDiagnosticCommand(checkId, projectId);

  if (!command) {
    return Promise.resolve({
      ok: false,
      command: '',
      stdout: '',
      stderr: '',
      error: `Unknown diagnostic: ${checkId}`
    });
  }

  const timeout = checkId === 'docker-compose' || checkId === 'server-health'
    ? LONG_DIAGNOSTIC_TIMEOUT_MS
    : DIAGNOSTIC_TIMEOUT_MS;
  return runSshCommand(command, timeout);
}

function isMarkdownPath(filePath) {
  const extension = path.extname(filePath || '').toLowerCase();
  return extension === '.md' || extension === '.markdown' || extension === '.mdown' || extension === '.mkd';
}

function readMarkdownInstructionFile(filePath) {
  if (typeof filePath !== 'string' || !filePath) {
    return { ok: false, error: 'No file selected.' };
  }

  if (!isMarkdownPath(filePath)) {
    return { ok: false, error: 'Select a Markdown file with .md or .markdown extension.' };
  }

  try {
    const stat = fs.statSync(filePath);

    if (!stat.isFile()) {
      return { ok: false, error: 'The selected path is not a file.' };
    }

    if (stat.size > MAX_MARKDOWN_INSTRUCTION_BYTES) {
      return {
        ok: false,
        error: `Markdown file is too large. Maximum size is ${Math.round(MAX_MARKDOWN_INSTRUCTION_BYTES / 1024)} KB.`
      };
    }

    return {
      ok: true,
      filePath,
      fileName: path.basename(filePath),
      content: fs.readFileSync(filePath, 'utf8')
    };
  } catch (error) {
    return { ok: false, error: error.message || String(error) };
  }
}

async function selectMarkdownInstructionFile() {
  const result = await dialog.showOpenDialog(mainWindow || undefined, {
    title: 'Select Markdown instructions',
    properties: ['openFile'],
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown', 'mdown', 'mkd'] },
      { name: 'All files', extensions: ['*'] }
    ]
  });

  if (result.canceled || !result.filePaths[0]) {
    return { ok: false, canceled: true, error: 'No file selected.' };
  }

  return readMarkdownInstructionFile(result.filePaths[0]);
}

function openTerminal(command) {
  if (process.platform === 'win32') {
    const child = spawn('cmd.exe', ['/c', 'start', APP_NAME, 'cmd.exe', '/k', command], {
      detached: true,
      stdio: 'ignore',
      windowsHide: false
    });
    child.unref();
    return Promise.resolve({ ok: true, command, stdout: '', stderr: '', error: '' });
  }

  if (process.platform !== 'darwin') {
    const terminalCandidates = [
      ['x-terminal-emulator', ['-e', command]],
      ['gnome-terminal', ['--', 'bash', '-lc', `${command}; exec bash`]],
      ['konsole', ['-e', 'bash', '-lc', `${command}; exec bash`]],
      ['xterm', ['-e', command]]
    ];

    return new Promise((resolve) => {
      let resolved = false;

      function tryNext(index) {
        if (index >= terminalCandidates.length) {
          resolved = true;
          resolve({
            ok: false,
            command,
            stdout: '',
            stderr: '',
            error: 'No supported terminal emulator was found.'
          });
          return;
        }

        const [binary, args] = terminalCandidates[index];
        const child = spawn(binary, args, { detached: true, stdio: 'ignore' });

        child.once('error', () => {
          if (!resolved) {
            tryNext(index + 1);
          }
        });

        child.once('spawn', () => {
          resolved = true;
          child.unref();
          resolve({ ok: true, command, stdout: '', stderr: '', error: '' });
        });
      }

      tryNext(0);
    });
  }

  const escapedCommand = escapeAppleScriptString(command);
  const script = [
    'tell application "Terminal"',
    'activate',
    `do script "${escapedCommand}"`,
    'end tell'
  ].join('\n');

  return new Promise((resolve) => {
    execFile('osascript', ['-e', script], { timeout: 10000 }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        command,
        stdout: stdout || '',
        stderr: stderr || '',
        error: error ? error.message : ''
      });
    });
  });
}

function openTerminalWithSsh(remoteCommand) {
  const config = getConfig();
  const ssh = resolveSshExecutable();
  const setup = getSshSetupStatus();

  if (!ssh.ok) {
    return Promise.resolve({
      ok: false,
      command: `ssh -tt ${config.sshAlias} ${quoteRemoteCommandForLocalShell(remoteCommand)}`,
      stdout: '',
      stderr: '',
      error: ssh.error
    });
  }

  if (!setup.ok) {
    return Promise.resolve({
      ok: false,
      command: `${quoteLocalCommandPath(ssh.path)} -tt ${config.sshAlias} ${quoteRemoteCommandForLocalShell(remoteCommand)}`,
      stdout: '',
      stderr: '',
      error: setup.error
    });
  }

  return openTerminal(
    `${quoteLocalCommandPath(ssh.path)} -tt -o BatchMode=yes -o ConnectTimeout=${SSH_CONNECT_TIMEOUT_SECONDS} ${config.sshAlias} ${quoteRemoteCommandForLocalShell(remoteCommand)}`
  );
}

function openProjectInTerminal(project) {
  return openTerminalWithSsh(buildTargetLaunchCommand(project, loadSettings()));
}

function emitTerminalData(webContents, sessionId, data) {
  if (!webContents.isDestroyed()) {
    webContents.send('terminal:data', { sessionId, data });
  }
}

function emitTerminalExit(webContents, sessionId, payload) {
  if (!webContents.isDestroyed()) {
    webContents.send('terminal:exit', { sessionId, ...payload });
  }
}

function startTerminalSession(event, projectId) {
  const config = getConfig();
  const project = getProject(projectId);

  if (!project) {
    return {
      ok: false,
      error: `Unknown project: ${projectId}`
    };
  }

  const sessionId = `${projectId}-${Date.now()}-${nextSessionNumber++}`;
  const webContents = event.sender;
  const ssh = resolveSshExecutable();
  const setup = getSshSetupStatus();
  const remoteCommand = buildTargetLaunchCommand(project, loadSettings());
  let terminal = null;

  if (!ssh.ok) {
    return {
      ok: false,
      error: ssh.error
    };
  }

  if (!setup.ok) {
    return {
      ok: false,
      error: setup.error
    };
  }

  const sshArgs = [
    '-tt',
    '-o',
    'BatchMode=yes',
    '-o',
    `ConnectTimeout=${SSH_CONNECT_TIMEOUT_SECONDS}`,
    config.sshAlias,
    remoteCommand
  ];

  try {
    terminal = pty.spawn(ssh.path, sshArgs, {
      name: 'xterm-256color',
      cols: DEFAULT_COLS,
      rows: DEFAULT_ROWS,
      cwd: os.homedir(),
      env: { ...process.env, TERM: 'xterm-256color' }
    });
  } catch (error) {
    return {
      ok: false,
      error: error.message || String(error)
    };
  }

  const session = {
    id: sessionId,
    projectId,
    project,
    terminal,
    webContents
  };

  sessions.set(sessionId, session);

  terminal.onData((data) => {
    emitTerminalData(webContents, sessionId, data);
  });

  terminal.onExit(({ exitCode, signal }) => {
    sessions.delete(sessionId);
    emitTerminalExit(webContents, sessionId, {
      projectId,
      exitCode,
      signal: signal || null
    });
  });

  return {
    ok: true,
    sessionId,
    projectId,
    title: project.name,
    remotePath: project.path,
    sshAlias: config.sshAlias,
    codexCommand: config.codexCommand
  };
}

function writeTerminalSession(sessionId, data) {
  const session = sessions.get(sessionId) || null;

  if (!session) {
    return { ok: false, error: `Unknown session: ${sessionId}` };
  }

  if (typeof data !== 'string') {
    return { ok: false, error: 'Terminal data must be a string.' };
  }

  session.terminal.write(data);
  return { ok: true };
}

function resizeTerminalSession(sessionId, cols, rows) {
  const session = sessions.get(sessionId) || null;

  if (!session) {
    return { ok: false, error: `Unknown session: ${sessionId}` };
  }

  const safeCols = Math.max(20, Math.min(300, Number.parseInt(cols, 10) || DEFAULT_COLS));
  const safeRows = Math.max(8, Math.min(120, Number.parseInt(rows, 10) || DEFAULT_ROWS));
  session.terminal.resize(safeCols, safeRows);
  return { ok: true, cols: safeCols, rows: safeRows };
}

function stopTerminalSession(sessionId) {
  const session = sessions.get(sessionId) || null;

  if (!session) {
    return { ok: false, error: `Unknown session: ${sessionId}` };
  }

  session.terminal.kill();
  sessions.delete(sessionId);
  return { ok: true };
}

function stopAllTerminalSessions() {
  for (const [sessionId, session] of sessions) {
    session.terminal.kill();
    sessions.delete(sessionId);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 820,
    minWidth: 1100,
    minHeight: 760,
    title: APP_DISPLAY_NAME,
    icon: APP_ICON_PATH,
    backgroundColor: '#0f172a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.once('did-finish-load', () => {
    sendToRenderer('updates:status', updateState);

    if (showVersionWelcomeOnLoad) {
      sendUiCommand('show-version-welcome');
      showVersionWelcomeOnLoad = false;
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function configureAboutPanel() {
  app.setAboutPanelOptions({
    applicationName: APP_DISPLAY_NAME,
    applicationVersion: DISPLAY_VERSION,
    version: DISPLAY_VERSION,
    copyright: 'Copyright © 2026 Codex VDS Launcher contributors',
    iconPath: APP_ICON_PATH
  });
}

function setupApplicationMenu() {
  const appMenu = [
    { label: `О ${APP_DISPLAY_NAME}`, role: 'about' },
    { label: 'Инструкция подключения к VDS', click: () => sendUiCommand('show-setup-guide') },
    { type: 'separator' },
    { role: 'services', label: 'Службы' },
    { type: 'separator' },
    { label: `Скрыть ${APP_DISPLAY_NAME}`, role: 'hide' },
    { label: 'Скрыть остальные', role: 'hideOthers' },
    { label: 'Показать все', role: 'unhide' },
    { type: 'separator' },
    {
      label: `Закрыть ${APP_DISPLAY_NAME}`,
      accelerator: 'Command+Q',
      click: () => {
        stopAllTerminalSessions();
        app.quit();
      }
    }
  ];

  const template = [
    ...(process.platform === 'darwin' ? [{ label: APP_NAME, submenu: appMenu }] : []),
    {
      label: 'Подключение',
      submenu: [
        { label: 'Инструкция подключения к VDS', accelerator: 'CmdOrCtrl+Shift+/', click: () => sendUiCommand('show-setup-guide') },
        { label: 'Открыть config.json', accelerator: 'CmdOrCtrl+,', click: () => sendUiCommand('open-config') },
        { label: 'Перезагрузить config.json', accelerator: 'CmdOrCtrl+R', click: () => sendUiCommand('reload-config') },
        { label: 'Скопировать пример SSH config', click: () => sendUiCommand('copy-ssh-config') },
        { type: 'separator' },
        { label: 'Проверить SSH', click: () => sendUiCommand('run-ssh-check') }
      ]
    },
    {
      label: 'Сессия',
      submenu: [
        { label: 'Запустить сессию', accelerator: 'CmdOrCtrl+Enter', click: () => sendUiCommand('start-session') },
        { label: 'Остановить сессию', click: () => sendUiCommand('stop-session') },
        { label: 'Перезапустить сессию', accelerator: 'CmdOrCtrl+Shift+R', click: () => sendUiCommand('restart-session') },
        { label: 'Открыть внешний терминал', click: () => sendUiCommand('open-external') },
        { type: 'separator' },
        { label: 'Очистить терминал', click: () => sendUiCommand('clear-terminal') },
        { label: 'Очистить историю', click: () => sendUiCommand('clear-history') }
      ]
    },
    {
      label: 'Панели',
      submenu: [
        { label: 'Показать/скрыть левую панель', click: () => sendUiCommand('toggle-left-panel') },
        { label: 'Показать/скрыть правую панель', click: () => sendUiCommand('toggle-right-panel') },
        { type: 'separator' },
        { label: 'Полный экран', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Справка',
      submenu: [
        { label: RELEASE_NAME, enabled: false },
        { label: `Версия ${DISPLAY_VERSION}`, enabled: false },
        { label: `Канал обновлений: ${UPDATE_CHANNEL}`, enabled: false },
        { type: 'separator' },
        { label: 'Обновить приложение', click: () => checkForUpdates({ manual: true }) },
        { label: 'Показать приветственный экран', click: () => sendUiCommand('show-welcome') },
        { label: 'Инструкция подключения', click: () => sendUiCommand('show-setup-guide') }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function showMainWindow() {
  if (!mainWindow) {
    createWindow();
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
}

function createTray() {
  if (tray) {
    return;
  }

  const image = nativeImage.createFromPath(TRAY_ICON_PATH);
  const trayImage = process.platform === 'darwin' ? image.resize({ width: 18, height: 18 }) : image;
  trayImage.setTemplateImage(process.platform === 'darwin');
  tray = new Tray(trayImage);
  tray.setToolTip(APP_DISPLAY_NAME);

  const contextMenu = Menu.buildFromTemplate([
    { label: `Открыть ${APP_DISPLAY_NAME}`, click: showMainWindow },
    { label: 'Инструкция подключения', click: () => sendUiCommand('show-setup-guide') },
    {
      label: 'Открыть первый проект во внешнем терминале',
      click: () => {
        const project = getConfig().projects[0];
        if (project) {
          openProjectInTerminal(project);
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Очистить историю',
      click: () => {
        const result = dialog.showMessageBoxSync(mainWindow || undefined, {
          type: 'warning',
          buttons: ['Отмена', 'Очистить историю'],
          defaultId: 0,
          cancelId: 0,
          message: 'Очистить сохранённую историю терминала?',
          detail: 'Сохранённые буферы терминала для всех проектов будут удалены.'
        });

        if (result !== 1) {
          return;
        }

        clearHistory();
        sendToRenderer('history:cleared', loadHistory());
      }
    },
    { type: 'separator' },
    {
      label: 'Выйти',
      click: () => {
        stopAllTerminalSessions();
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('click', showMainWindow);
}

function registerHandlers() {
  ipcMain.handle('app:config', () => getConfig());
  ipcMain.handle('config:openFile', async () => {
    const configPath = ensureConfigFile();
    const error = await shell.openPath(configPath);
    return { ok: !error, path: configPath, error };
  });
  ipcMain.handle('config:reload', () => {
    const config = loadAppConfig();
    const history = loadHistory();
    sendToRenderer('config:changed', { config, history });
    return { ok: true, config, history };
  });
  ipcMain.handle('config:sshExample', () => buildSshConfigExample(getConfig().sshAlias));
  ipcMain.handle('config:saveQuickPrompts', (_event, quickPrompts) => {
    const config = saveQuickPrompts(quickPrompts);
    const history = loadHistory();
    sendToRenderer('config:changed', { config, history });
    return { ok: true, config, history };
  });
  ipcMain.handle('ssh:setupStatus', () => getSshSetupStatus());
  ipcMain.handle('diagnostic:run', (_event, checkId, projectId) => runDiagnostic(checkId, projectId));

  ipcMain.handle('terminal:start', startTerminalSession);
  ipcMain.handle('terminal:write', (_event, sessionId, data) => writeTerminalSession(sessionId, data));
  ipcMain.handle('terminal:resize', (_event, sessionId, cols, rows) => resizeTerminalSession(sessionId, cols, rows));
  ipcMain.handle('terminal:stop', (_event, sessionId) => stopTerminalSession(sessionId));
  ipcMain.handle('terminal:clear', () => ({ ok: true }));
  ipcMain.handle('terminal:openExternal', (_event, projectId) => {
    const project = getProject(projectId);

    if (!project) {
      return { ok: false, error: `Unknown project: ${projectId}` };
    }

    return openProjectInTerminal(project);
  });

  ipcMain.handle('history:load', () => loadHistory());
  ipcMain.handle('history:save', (_event, history) => saveHistory(history));
  ipcMain.handle('history:clear', () => {
    const history = clearHistory();
    sendToRenderer('history:cleared', history);
    return history;
  });

  ipcMain.handle('settings:load', () => loadSettings());
  ipcMain.handle('settings:save', (_event, settings) => saveSettings(settings));
  ipcMain.handle('settings:defaultAgentInstructions', () => DEFAULT_AGENT_INSTRUCTIONS);
  ipcMain.handle('markdown:selectInstructionFile', () => selectMarkdownInstructionFile());
  ipcMain.handle('markdown:readInstructionFile', (_event, filePath) => readMarkdownInstructionFile(filePath));
  ipcMain.handle('updates:status', () => updateState);
  ipcMain.handle('updates:check', () => checkForUpdates({ manual: true }));
}

app.whenReady().then(() => {
  app.setName(APP_DISPLAY_NAME);
  showVersionWelcomeOnLoad = shouldShowVersionWelcome();
  configureAboutPanel();
  configureAutoUpdater();
  loadAppConfig();
  registerHandlers();
  setupApplicationMenu();
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('before-quit', () => {
  stopAllTerminalSessions();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
