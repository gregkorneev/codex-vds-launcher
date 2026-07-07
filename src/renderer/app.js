const DIAGNOSTICS = [
  {
    id: 'ssh',
    label: 'SSH check',
    target: 'card'
  },
  {
    id: 'remote-info',
    label: 'Remote whoami/hostname/pwd',
    target: 'card'
  },
  {
    id: 'codex-command',
    label: 'Codex command check',
    target: 'card'
  },
  {
    id: 'vpn-command',
    label: 'VPN command check',
    target: 'card'
  },
  {
    id: 'server-health',
    label: 'Server health',
    target: 'terminal'
  },
  {
    id: 'git-status',
    label: 'Git status current project',
    target: 'terminal'
  },
  {
    id: 'docker-compose',
    label: 'Docker compose check',
    target: 'terminal'
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

const STATUS_TEXT = {
  active: 'активна',
  inactive: 'неактивна',
  loading: 'загрузка',
  ok: 'ок',
  error: 'ошибка',
  unknown: 'неизвестно'
};

const HISTORY_TEXT = {
  saved: 'сохранена',
  saving: 'сохранение',
  error: 'ошибка',
  new: 'новая',
  loaded: 'загружена',
  empty: 'пусто'
};

const api = window.codexVdsLauncher;
const terminalElement = document.querySelector('#terminal');
const projectList = document.querySelector('#projectList');
const sessionList = document.querySelector('#sessionList');
const activeTitle = document.querySelector('#activeTitle');
const activePath = document.querySelector('#activePath');
const activeSshAlias = document.querySelector('#activeSshAlias');
const activeCommand = document.querySelector('#activeCommand');
const footerProject = document.querySelector('#footerProject');
const footerStatus = document.querySelector('#footerStatus');
const footerAlias = document.querySelector('#footerAlias');
const footerCommand = document.querySelector('#footerCommand');
const historyStatus = document.querySelector('#historyStatus');
const configPath = document.querySelector('#configPath');
const configErrors = document.querySelector('#configErrors');
const quickPrompts = document.querySelector('#quickPrompts');
const quickCommandSets = document.querySelector('#quickCommandSets');
const statusCards = document.querySelector('#statusCards');
const diagnosticActions = document.querySelector('#diagnosticActions');
const startSessionButton = document.querySelector('#startSession');
const stopSessionButton = document.querySelector('#stopSession');
const restartSessionButton = document.querySelector('#restartSession');
const clearTerminalButton = document.querySelector('#clearTerminal');
const openExternalButton = document.querySelector('#openExternal');
const clearHistoryButton = document.querySelector('#clearHistory');
const themeSelect = document.querySelector('#themeSelect');
const syncAgentInstructions = document.querySelector('#syncAgentInstructions');
const editAgentInstructionsButton = document.querySelector('#editAgentInstructions');
const agentInstructionsDialog = document.querySelector('#agentInstructionsDialog');
const agentInstructionsForm = document.querySelector('#agentInstructionsForm');
const agentInstructionsText = document.querySelector('#agentInstructionsText');
const cancelAgentInstructionsButton = document.querySelector('#cancelAgentInstructions');
const cancelAgentInstructionsFooterButton = document.querySelector('#cancelAgentInstructionsFooter');
const resetAgentInstructionsButton = document.querySelector('#resetAgentInstructions');
const runMarkdownButton = document.querySelector('#runMarkdownFile');
const markdownDropZone = document.querySelector('#markdownDropZone');
const toggleLeftPanelButton = document.querySelector('#toggleLeftPanel');
const toggleRightPanelButton = document.querySelector('#toggleRightPanel');
const openConfigButton = document.querySelector('#openConfigFile');
const reloadConfigButton = document.querySelector('#reloadConfig');
const copySshConfigButton = document.querySelector('#copySshConfig');
const addQuickPromptButton = document.querySelector('#addQuickPrompt');
const addQuickCommandSetButton = document.querySelector('#addQuickCommandSet');
const quickItemDialog = document.querySelector('#quickItemDialog');
const quickItemForm = document.querySelector('#quickItemForm');
const quickItemDialogTitle = document.querySelector('#quickItemDialogTitle');
const quickItemTitle = document.querySelector('#quickItemTitle');
const quickItemText = document.querySelector('#quickItemText');
const cancelQuickItemButton = document.querySelector('#cancelQuickItem');
const cancelQuickItemFooterButton = document.querySelector('#cancelQuickItemFooter');

const terminal = new Terminal({
  cursorBlink: true,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 13,
  letterSpacing: 0,
  lineHeight: 1.18,
  scrollback: 6000,
  theme: {
    background: '#07111f',
    foreground: '#dce7f2',
    cursor: '#38bdf8',
    selectionBackground: '#334155'
  }
});

const fitAddon = new FitAddon.FitAddon();
terminal.loadAddon(fitAddon);
terminal.open(terminalElement);

let appConfig = {
  sshAlias: 'my-vds',
  codexCommand: 'codex-vpn',
  projects: [],
  quickPrompts: [],
  validationErrors: []
};
let activeProjectId = 'root';
let resizeTimer = null;
let saveHistoryTimer = null;
let saveSettingsTimer = null;
let quickItemEditor = null;
let sshStatusRendered = false;

let currentSettings = {
  theme: 'dark',
  panels: {
    left: true,
    right: true
  },
  syncAgentInstructions: true,
  agentInstructions: DEFAULT_AGENT_INSTRUCTIONS,
  quickCommandSets: DEFAULT_QUICK_COMMAND_SETS.map((item) => ({ ...item }))
};

const sessionsByProject = {};
const targetBySession = new Map();
const stoppingSessions = new Set();
const buffersByProject = {};

function getProjects() {
  return Array.isArray(appConfig.projects) ? appConfig.projects : [];
}

function getProject(projectId) {
  return getProjects().find((project) => project.id === projectId) || null;
}

function getActiveProject() {
  return getProject(activeProjectId) || getProjects()[0] || null;
}

function ensureProjectState(projectId) {
  if (!Object.prototype.hasOwnProperty.call(sessionsByProject, projectId)) {
    sessionsByProject[projectId] = null;
  }

  if (!Object.prototype.hasOwnProperty.call(buffersByProject, projectId)) {
    const project = getProject(projectId);
    buffersByProject[projectId] = project
      ? `Ready. Start ${project.name} to open Codex CLI through ssh ${appConfig.sshAlias} and ${appConfig.codexCommand}.\r\n`
      : '';
  }
}

function syncProjectState() {
  getProjects().forEach((project) => ensureProjectState(project.id));

  if (!getProject(activeProjectId)) {
    activeProjectId = getProjects()[0]?.id || 'root';
    ensureProjectState(activeProjectId);
  }
}

function cloneQuickItems(items) {
  return items.map((item) => ({ ...item }));
}

function normalizeQuickItems(value, fallbackItems) {
  const source = Array.isArray(value) ? value : fallbackItems;
  const items = [];

  source.slice(0, 50).forEach((item, index) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    const title = typeof item.title === 'string' ? item.title.trim().slice(0, 80) : '';
    const text = typeof item.text === 'string' ? item.text.trim().slice(0, 8000) : '';

    if (!title || !text) {
      return;
    }

    const fallbackId = `quick-${index + 1}`;
    const id = typeof item.id === 'string' && /^[a-z0-9_-]{1,80}$/i.test(item.id)
      ? item.id
      : fallbackId;

    items.push({ id, title, text });
  });

  return items.length > 0 ? items : cloneQuickItems(fallbackItems);
}

function makeQuickItem(title, text) {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return {
    id: `custom-${Date.now().toString(36)}-${randomPart}`,
    title: title.trim().slice(0, 80),
    text: text.trim().slice(0, 8000)
  };
}

function normalizePanelSettings(value = {}) {
  return {
    left: value.left !== false,
    right: value.right !== false
  };
}

function normalizeAgentInstructions(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text ? text.slice(0, 24000) : DEFAULT_AGENT_INSTRUCTIONS;
}

function buildTerminalTheme(settings) {
  if (settings.theme === 'light') {
    return {
      background: '#f8fafc',
      foreground: '#0f172a',
      cursor: '#0284c7',
      selectionBackground: '#bae6fd'
    };
  }

  return {
    background: '#07111f',
    foreground: '#dce7f2',
    cursor: '#38bdf8',
    selectionBackground: '#334155'
  };
}

function updatePanelToggle(button, side, visible) {
  const label = visible ? `Скрыть ${side} панель` : `Показать ${side} панель`;
  button.title = label;
  button.setAttribute('aria-label', label);
  button.setAttribute('aria-pressed', String(!visible));
}

function applyPanelVisibility() {
  document.body.classList.toggle('left-panel-hidden', !currentSettings.panels.left);
  document.body.classList.toggle('right-panel-hidden', !currentSettings.panels.right);
  updatePanelToggle(toggleLeftPanelButton, 'левую', currentSettings.panels.left);
  updatePanelToggle(toggleRightPanelButton, 'правую', currentSettings.panels.right);
  scheduleFit();
}

function applySettings(settings) {
  currentSettings = {
    theme: settings.theme === 'light' ? 'light' : 'dark',
    panels: normalizePanelSettings(settings.panels),
    syncAgentInstructions: settings.syncAgentInstructions !== false,
    agentInstructions: normalizeAgentInstructions(settings.agentInstructions),
    quickCommandSets: normalizeQuickItems(settings.quickCommandSets, DEFAULT_QUICK_COMMAND_SETS)
  };

  document.body.dataset.theme = currentSettings.theme;
  terminal.options.theme = buildTerminalTheme(currentSettings);
  themeSelect.value = currentSettings.theme;
  syncAgentInstructions.checked = currentSettings.syncAgentInstructions;
  applyPanelVisibility();
}

function saveSettingsSoon() {
  window.clearTimeout(saveSettingsTimer);
  saveSettingsTimer = window.setTimeout(() => {
    api.saveSettings(currentSettings).catch(() => {});
  }, 200);
}

function historyPayload() {
  return {
    activeTargetId: activeProjectId,
    buffers: { ...buffersByProject }
  };
}

async function saveHistoryNow() {
  window.clearTimeout(saveHistoryTimer);

  try {
    await api.saveHistory(historyPayload());
    historyStatus.textContent = HISTORY_TEXT.saved;
  } catch (_error) {
    historyStatus.textContent = HISTORY_TEXT.error;
  }
}

function saveHistorySoon() {
  historyStatus.textContent = HISTORY_TEXT.saving;
  window.clearTimeout(saveHistoryTimer);
  saveHistoryTimer = window.setTimeout(saveHistoryNow, 350);
}

function applyHistory(history, { emptyAllowed = false } = {}) {
  syncProjectState();
  const buffers = history && history.buffers ? history.buffers : null;
  const hasSavedText = buffers && Object.values(buffers).some((value) => typeof value === 'string' && value.length > 0);

  if (!emptyAllowed && !history?.updatedAt && !hasSavedText) {
    historyStatus.textContent = HISTORY_TEXT.new;
    return;
  }

  Object.entries(buffers || {}).forEach(([projectId, value]) => {
    if (typeof value === 'string') {
      buffersByProject[projectId] = value;
    }
  });

  if (history?.activeTargetId && getProject(history.activeTargetId)) {
    activeProjectId = history.activeTargetId;
  }

  historyStatus.textContent = hasSavedText ? HISTORY_TEXT.loaded : HISTORY_TEXT.empty;
}

function clampBuffer(projectId) {
  const maxLength = 500000;
  ensureProjectState(projectId);

  if (buffersByProject[projectId].length > maxLength) {
    buffersByProject[projectId] = buffersByProject[projectId].slice(-maxLength);
  }
}

function writeLocal(projectId, text) {
  ensureProjectState(projectId);
  buffersByProject[projectId] += text;
  clampBuffer(projectId);
  saveHistorySoon();

  if (projectId === activeProjectId) {
    terminal.write(text);
  }
}

function renderActiveBuffer() {
  ensureProjectState(activeProjectId);
  terminal.reset();
  terminal.write(buffersByProject[activeProjectId] || '');
  terminal.focus();
  fitAndResize();
}

function currentSessionId() {
  return sessionsByProject[activeProjectId];
}

function sessionStatus(projectId) {
  return sessionsByProject[projectId] ? 'active' : 'inactive';
}

function renderProjectList() {
  projectList.innerHTML = '';
  sessionList.innerHTML = '';

  getProjects().forEach((project) => {
    ensureProjectState(project.id);

    const row = document.createElement('article');
    row.className = 'project-row';
    row.dataset.project = project.id;
    row.addEventListener('click', (event) => {
      if (!event.target.closest('button')) {
        switchProject(project.id);
      }
    });

    const text = document.createElement('div');
    const name = document.createElement('strong');
    const remotePath = document.createElement('span');
    name.textContent = project.name;
    remotePath.textContent = project.path;
    text.append(name, remotePath);

    const startButton = document.createElement('button');
    startButton.type = 'button';
    startButton.className = 'icon-button project-start';
    startButton.title = `Запустить ${project.name}`;
    startButton.setAttribute('aria-label', `Запустить ${project.name}`);
    startButton.textContent = '▶';
    startButton.addEventListener('click', () => startSession(project.id));

    const state = document.createElement('span');
    state.className = 'project-state';
    state.dataset.stateTarget = project.id;
    state.textContent = STATUS_TEXT[sessionStatus(project.id)];

    row.append(text, startButton, state);
    projectList.appendChild(row);

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'session-chip';
    chip.dataset.sessionTarget = project.id;
    chip.addEventListener('click', () => switchProject(project.id));

    const dot = document.createElement('span');
    dot.className = 'session-dot';
    dot.setAttribute('aria-hidden', 'true');

    chip.append(dot, document.createTextNode(project.name));
    sessionList.appendChild(chip);
  });
}

function renderConfigSummary() {
  configPath.textContent = appConfig.path || '';
  footerAlias.textContent = appConfig.sshAlias || 'my-vds';
  footerCommand.textContent = appConfig.codexCommand || 'codex-vpn';
  activeSshAlias.textContent = `ssh ${appConfig.sshAlias || 'my-vds'}`;
  activeCommand.textContent = appConfig.codexCommand || 'codex-vpn';

  const errors = Array.isArray(appConfig.validationErrors) ? appConfig.validationErrors : [];
  configErrors.textContent = errors.length > 0 ? errors.join(' ') : 'config.json загружен';
  configErrors.classList.toggle('error-text', errors.length > 0);
}

function renderDiagnostics() {
  statusCards.innerHTML = '';
  diagnosticActions.innerHTML = '';

  DIAGNOSTICS.forEach((check) => {
    if (check.target === 'card') {
      const card = document.createElement('article');
      card.className = 'status-card';
      card.dataset.checkCard = check.id;
      card.innerHTML = [
        '<div class="status-card-top">',
        '<div>',
        `<strong>${check.label}</strong>`,
        '<span class="status-label unknown">неизвестно</span>',
        '</div>',
        `<button type="button" class="mini-button" data-check="${check.id}" title="Обновить ${check.label}" aria-label="Обновить ${check.label}">↻</button>`,
        '</div>',
        '<pre class="status-output">Нет данных.</pre>'
      ].join('');
      statusCards.appendChild(card);
    } else {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'diagnostic-button';
      button.dataset.check = check.id;
      button.textContent = check.label;
      diagnosticActions.appendChild(button);
    }
  });

  document.querySelectorAll('[data-check]').forEach((button) => {
    button.addEventListener('click', () => runCheck(button.dataset.check));
  });
}

function updateControls() {
  const activeProject = getActiveProject();
  const hasSession = Boolean(currentSessionId());

  if (!activeProject) {
    return;
  }

  activeTitle.textContent = activeProject.name;
  activePath.textContent = activeProject.path;
  footerProject.textContent = activeProject.name;
  footerStatus.textContent = STATUS_TEXT[sessionStatus(activeProject.id)];
  startSessionButton.disabled = hasSession;
  stopSessionButton.disabled = !hasSession;
  restartSessionButton.disabled = false;
  clearTerminalButton.disabled = false;

  document.querySelectorAll('.project-row').forEach((row) => {
    const projectId = row.dataset.project;
    row.classList.toggle('active', projectId === activeProjectId);
    row.classList.toggle('running', Boolean(sessionsByProject[projectId]));
  });

  document.querySelectorAll('[data-state-target]').forEach((state) => {
    state.textContent = STATUS_TEXT[sessionStatus(state.dataset.stateTarget)];
  });

  document.querySelectorAll('.session-chip').forEach((chip) => {
    const projectId = chip.dataset.sessionTarget;
    chip.classList.toggle('active', projectId === activeProjectId);
    chip.classList.toggle('running', Boolean(sessionsByProject[projectId]));
  });
}

function switchProject(projectId) {
  if (!getProject(projectId) || projectId === activeProjectId) {
    return;
  }

  activeProjectId = projectId;
  saveHistorySoon();
  updateControls();
  renderActiveBuffer();
}

function formatResult(result) {
  const parts = [];

  if (result.stdout) {
    parts.push(result.stdout.trimEnd());
  }

  if (result.stderr) {
    parts.push(`stderr:\n${result.stderr.trimEnd()}`);
  }

  if (result.error) {
    parts.push(`error:\n${result.error}`);
  }

  return parts.length > 0 ? parts.join('\n\n') : 'No output.';
}

function setCheckState(checkId, state, output) {
  const card = document.querySelector(`[data-check-card="${checkId}"]`);

  if (!card) {
    return;
  }

  const label = card.querySelector('.status-label');
  const outputElement = card.querySelector('.status-output');
  label.className = `status-label ${state}`;
  label.textContent = STATUS_TEXT[state] || state;
  outputElement.textContent = output || 'Нет данных.';
}

async function runCheck(checkId) {
  const check = DIAGNOSTICS.find((item) => item.id === checkId);

  if (!check) {
    return;
  }

  if (check.target === 'terminal') {
    writeLocal(activeProjectId, `\r\n[diagnostic] ${check.label}\r\nRunning read-only check...\r\n`);
  } else {
    setCheckState(checkId, 'loading', 'Выполняется...');
  }

  try {
    const result = await api.runDiagnostic(checkId, activeProjectId);
    const output = formatResult(result);

    if (check.target === 'terminal') {
      writeLocal(activeProjectId, `${output}\r\n`);
    } else {
      setCheckState(checkId, result.ok ? 'ok' : 'error', output);
    }
  } catch (error) {
    const message = error.message || String(error);

    if (check.target === 'terminal') {
      writeLocal(activeProjectId, `error:\r\n${message}\r\n`);
    } else {
      setCheckState(checkId, 'error', message);
    }
  }
}

function fitAndResize() {
  try {
    fitAddon.fit();
  } catch (_error) {
    return;
  }

  const sessionId = currentSessionId();

  if (sessionId) {
    api.terminalResize(sessionId, terminal.cols, terminal.rows);
  }
}

function scheduleFit() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(fitAndResize, 60);
}

async function startSession(projectId = activeProjectId) {
  const project = getProject(projectId);

  if (!project) {
    return;
  }

  if (sessionsByProject[projectId]) {
    switchProject(projectId);
    terminal.focus();
    return;
  }

  switchProject(projectId);
  writeLocal(projectId, `\r\n[session] Starting ${project.name} through ssh ${appConfig.sshAlias} / ${appConfig.codexCommand}...\r\n`);
  updateControls();

  const result = await api.terminalStart(projectId);

  if (!result.ok) {
    writeLocal(projectId, `[session] Start failed: ${result.error || 'unknown error'}\r\n`);
    updateControls();
    return;
  }

  sessionsByProject[projectId] = result.sessionId;
  targetBySession.set(result.sessionId, projectId);
  updateControls();
  fitAndResize();
}

async function stopSession(projectId = activeProjectId) {
  const sessionId = sessionsByProject[projectId];
  const project = getProject(projectId);

  if (!sessionId || !project) {
    return;
  }

  stoppingSessions.add(sessionId);
  await api.terminalStop(sessionId);
  sessionsByProject[projectId] = null;
  targetBySession.delete(sessionId);
  writeLocal(projectId, `\r\n[session] ${project.name} stopped.\r\n`);
  updateControls();
}

async function restartSession() {
  const projectId = activeProjectId;

  if (sessionsByProject[projectId]) {
    await stopSession(projectId);
  }

  await startSession(projectId);
}

function clearActiveTerminal() {
  const sessionId = currentSessionId();
  buffersByProject[activeProjectId] = '';
  terminal.clear();
  terminal.reset();
  saveHistorySoon();

  if (sessionId) {
    api.terminalClear(sessionId);
  }
}

async function openExternalTerminal() {
  const result = await api.terminalOpenExternal(activeProjectId);

  if (!result.ok) {
    writeLocal(activeProjectId, `\r\n[external terminal] Error: ${result.error || 'unknown error'}\r\n`);
  }
}

function normalizeTerminalNewlines(text) {
  return text.replace(/\r?\n/g, '\r');
}

function writeSessionText(text, { label, execute = false } = {}) {
  const sessionId = currentSessionId();

  if (!sessionId) {
    writeLocal(activeProjectId, `\r\n[${label || 'insert'}] Start a session first.\r\n`);
    return;
  }

  const payload = execute
    ? `${normalizeTerminalNewlines(text).replace(/\r+$/g, '')}\r`
    : text;

  api.terminalWrite(sessionId, payload);
  terminal.focus();
}

function insertPrompt(prompt) {
  writeSessionText(prompt, {
    label: 'quick prompt',
    execute: false
  });
}

function insertCommandSet(commandText) {
  writeSessionText(commandText, {
    label: 'quick commands',
    execute: true
  });
}

function buildMarkdownInstructionPrompt(file) {
  return [
    'Run the instructions from the user selected local Markdown file.',
    `File: ${file.fileName || 'instructions.md'}`,
    '',
    'The remote server cannot access the local file system. Use only the content pasted below.',
    '',
    '--- BEGIN LOCAL MARKDOWN ---',
    file.content || '',
    '--- END LOCAL MARKDOWN ---'
  ].join('\n');
}

function runMarkdownInstruction(file) {
  if (!file?.ok) {
    if (file && !file.canceled) {
      writeLocal(activeProjectId, `\r\n[md] Error: ${file.error || 'could not read file'}\r\n`);
    }
    return;
  }

  if (!currentSessionId()) {
    writeLocal(activeProjectId, `\r\n[md] Start a session to send instructions from ${file.fileName}.\r\n`);
    return;
  }

  writeSessionText(buildMarkdownInstructionPrompt(file), {
    label: 'local MD',
    execute: true
  });
  writeLocal(activeProjectId, `\r\n[md] Sent instructions from ${file.fileName}.\r\n`);
}

async function selectAndRunMarkdownInstruction() {
  try {
    runMarkdownInstruction(await api.selectMarkdownInstructionFile());
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[md] Error: ${error.message || String(error)}\r\n`);
  }
}

async function readAndRunDroppedMarkdown(filePath) {
  if (!filePath) {
    writeLocal(activeProjectId, '\r\n[md] Could not get a local file path. Use the Markdown picker button.\r\n');
    return;
  }

  try {
    runMarkdownInstruction(await api.readMarkdownInstructionFile(filePath));
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[md] Error: ${error.message || String(error)}\r\n`);
  }
}

function openAgentInstructionsEditor() {
  agentInstructionsText.value = currentSettings.agentInstructions;
  syncAgentInstructions.checked = currentSettings.syncAgentInstructions;
  agentInstructionsDialog.showModal();
  agentInstructionsText.focus();
}

function closeAgentInstructionsEditor() {
  agentInstructionsForm.reset();
  agentInstructionsDialog.close();
}

function saveAgentInstructions(event) {
  event.preventDefault();

  const text = normalizeAgentInstructions(agentInstructionsText.value);
  currentSettings = {
    ...currentSettings,
    syncAgentInstructions: syncAgentInstructions.checked,
    agentInstructions: text
  };
  agentInstructionsText.value = text;
  saveSettingsSoon();
  closeAgentInstructionsEditor();
}

async function resetAgentInstructions() {
  try {
    agentInstructionsText.value = await api.defaultAgentInstructions();
  } catch (_error) {
    agentInstructionsText.value = DEFAULT_AGENT_INSTRUCTIONS;
  }
}

function renderQuickItems(container, items, kind) {
  container.innerHTML = '';

  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'quick-item-row';

    const mainButton = document.createElement('button');
    mainButton.type = 'button';
    mainButton.className = 'quick-main-button';
    mainButton.textContent = item.title;
    mainButton.title = item.title;
    mainButton.addEventListener('click', () => {
      if (kind === 'prompt') {
        insertPrompt(item.text);
      } else {
        insertCommandSet(item.text);
      }
    });

    row.append(mainButton);

    if (kind === 'command') {
      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.className = 'mini-button quick-action-button';
      editButton.textContent = '✎';
      editButton.title = 'Изменить';
      editButton.setAttribute('aria-label', `Изменить ${item.title}`);
      editButton.addEventListener('click', () => openQuickItemEditor(index));

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'mini-button quick-action-button danger';
      deleteButton.textContent = '×';
      deleteButton.title = 'Удалить';
      deleteButton.setAttribute('aria-label', `Удалить ${item.title}`);
      deleteButton.addEventListener('click', () => deleteQuickCommandSet(index));

      row.append(editButton, deleteButton);
    }

    container.appendChild(row);
  });
}

function renderQuickLists() {
  renderQuickItems(quickPrompts, appConfig.quickPrompts || [], 'prompt');
  renderQuickItems(quickCommandSets, currentSettings.quickCommandSets, 'command');
}

function openQuickItemEditor(index = -1) {
  const item = index >= 0 ? currentSettings.quickCommandSets[index] : null;
  quickItemEditor = { index };
  quickItemDialogTitle.textContent = `${item ? 'Изменить' : 'Добавить'} набор команд`;
  quickItemTitle.value = item?.title || '';
  quickItemText.value = item?.text || '';
  quickItemText.placeholder = 'Команды, которые будут отправлены в активную консоль';
  quickItemDialog.showModal();
  quickItemTitle.focus();
}

function closeQuickItemEditor() {
  quickItemEditor = null;
  quickItemForm.reset();
  quickItemDialog.close();
}

function saveQuickItem(event) {
  event.preventDefault();

  if (!quickItemEditor) {
    return;
  }

  const title = quickItemTitle.value.trim();
  const text = quickItemText.value.trim();

  if (!title || !text) {
    quickItemForm.reportValidity();
    return;
  }

  const items = [...currentSettings.quickCommandSets];
  const normalizedItem = makeQuickItem(title, text);

  if (quickItemEditor.index >= 0) {
    normalizedItem.id = items[quickItemEditor.index]?.id || normalizedItem.id;
    items[quickItemEditor.index] = normalizedItem;
  } else {
    items.push(normalizedItem);
  }

  currentSettings = {
    ...currentSettings,
    quickCommandSets: items
  };

  renderQuickLists();
  saveSettingsSoon();
  closeQuickItemEditor();
}

function deleteQuickCommandSet(index) {
  const item = currentSettings.quickCommandSets[index];

  if (!item || !window.confirm(`Удалить "${item.title}"?`)) {
    return;
  }

  currentSettings = {
    ...currentSettings,
    quickCommandSets: currentSettings.quickCommandSets.filter((_entry, entryIndex) => entryIndex !== index)
  };

  renderQuickLists();
  saveSettingsSoon();
}

async function clearSavedHistory() {
  const confirmed = window.confirm('Очистить сохранённую историю терминала для всех сессий?');

  if (!confirmed) {
    return;
  }

  const history = await api.clearHistory();
  applyHistory(history, { emptyAllowed: true });
  renderActiveBuffer();
  updateControls();
}

async function renderSshSetupStatus() {
  if (sshStatusRendered) {
    return;
  }

  try {
    const status = await api.getSshSetupStatus();
    sshStatusRendered = true;

    if (!status || status.ok) {
      return;
    }

    writeLocal(
      activeProjectId,
      [
        '\r\n[ssh] SSH alias is not ready.',
        `\r\n[ssh] Config: ${status.configPath}`,
        `\r\n[ssh] Alias: ${status.alias}`,
        status.error ? `\r\n[ssh] ${status.error}` : '',
        '\r\n[ssh] Use "Copy SSH config example", add it to ~/.ssh/config, then reload config.\r\n'
      ].join('')
    );
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[ssh] SSH check failed: ${error.message || String(error)}\r\n`);
  }
}

async function openConfigFile() {
  const result = await api.openConfigFile();

  if (!result.ok) {
    writeLocal(activeProjectId, `\r\n[config] Could not open config.json: ${result.error || 'unknown error'}\r\n`);
  }
}

async function reloadConfig() {
  const result = await api.reloadConfig();

  if (!result.ok) {
    writeLocal(activeProjectId, `\r\n[config] Reload failed: ${result.error || 'unknown error'}\r\n`);
    return;
  }

  applyConfig(result.config);
  applyHistory(result.history, { emptyAllowed: true });
  renderActiveBuffer();
  updateControls();
  writeLocal(activeProjectId, '\r\n[config] config.json reloaded.\r\n');
}

async function copySshConfigExample() {
  const example = await api.getSshConfigExample();
  api.writeClipboardText(example);
  writeLocal(activeProjectId, '\r\n[ssh] SSH config example copied to clipboard.\r\n');
}

function applyConfig(config) {
  appConfig = config;
  syncProjectState();
  renderProjectList();
  renderConfigSummary();
  renderDiagnostics();
  renderQuickLists();
}

terminal.onData((data) => {
  const sessionId = currentSessionId();

  if (sessionId) {
    api.terminalWrite(sessionId, data);
  }
});

terminal.attachCustomKeyEventHandler((event) => {
  if (event.type !== 'keydown') {
    return true;
  }

  const key = event.key.toLowerCase();
  const isPrimaryShortcut = event.ctrlKey || event.metaKey;

  if (!isPrimaryShortcut) {
    return true;
  }

  if (key === 'c' && terminal.hasSelection()) {
    api.writeClipboardText(terminal.getSelection());
    terminal.clearSelection();
    return false;
  }

  if (key === 'v') {
    api.readClipboardText()
      .then((text) => {
        if (text) {
          writeSessionText(normalizeTerminalNewlines(text), {
            label: 'clipboard',
            execute: false
          });
        }
      })
      .catch(() => {});
    return false;
  }

  return true;
});

terminal.onResize(({ cols, rows }) => {
  const sessionId = currentSessionId();

  if (sessionId) {
    api.terminalResize(sessionId, cols, rows);
  }
});

api.onTerminalData(({ sessionId, data }) => {
  const projectId = targetBySession.get(sessionId);

  if (!projectId) {
    return;
  }

  writeLocal(projectId, data);
});

api.onTerminalExit(({ sessionId, projectId, exitCode, signal }) => {
  const knownProjectId = targetBySession.get(sessionId) || projectId;

  if (!knownProjectId) {
    return;
  }

  sessionsByProject[knownProjectId] = null;
  targetBySession.delete(sessionId);

  if (stoppingSessions.has(sessionId)) {
    stoppingSessions.delete(sessionId);
    updateControls();
    return;
  }

  writeLocal(
    knownProjectId,
    `\r\n[session] Exited with code ${exitCode ?? 'unknown'}${signal ? `, signal ${signal}` : ''}.\r\n`
  );
  updateControls();
});

startSessionButton.addEventListener('click', () => startSession());
stopSessionButton.addEventListener('click', () => stopSession());
restartSessionButton.addEventListener('click', () => restartSession());
clearTerminalButton.addEventListener('click', clearActiveTerminal);
openExternalButton.addEventListener('click', openExternalTerminal);
clearHistoryButton.addEventListener('click', clearSavedHistory);
openConfigButton.addEventListener('click', openConfigFile);
reloadConfigButton.addEventListener('click', reloadConfig);
copySshConfigButton.addEventListener('click', copySshConfigExample);
addQuickPromptButton.addEventListener('click', openConfigFile);
addQuickCommandSetButton.addEventListener('click', () => openQuickItemEditor());
toggleLeftPanelButton.addEventListener('click', () => {
  currentSettings = {
    ...currentSettings,
    panels: {
      ...currentSettings.panels,
      left: !currentSettings.panels.left
    }
  };
  applyPanelVisibility();
  saveSettingsSoon();
});
toggleRightPanelButton.addEventListener('click', () => {
  currentSettings = {
    ...currentSettings,
    panels: {
      ...currentSettings.panels,
      right: !currentSettings.panels.right
    }
  };
  applyPanelVisibility();
  saveSettingsSoon();
});
editAgentInstructionsButton.addEventListener('click', openAgentInstructionsEditor);
agentInstructionsForm.addEventListener('submit', saveAgentInstructions);
cancelAgentInstructionsButton.addEventListener('click', closeAgentInstructionsEditor);
cancelAgentInstructionsFooterButton.addEventListener('click', closeAgentInstructionsEditor);
resetAgentInstructionsButton.addEventListener('click', resetAgentInstructions);
agentInstructionsDialog.addEventListener('cancel', () => {
  agentInstructionsForm.reset();
});
syncAgentInstructions.addEventListener('change', () => {
  currentSettings = {
    ...currentSettings,
    syncAgentInstructions: syncAgentInstructions.checked
  };
  saveSettingsSoon();
});
runMarkdownButton.addEventListener('click', selectAndRunMarkdownInstruction);
markdownDropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  markdownDropZone.classList.add('drag-over');
});
markdownDropZone.addEventListener('dragleave', () => {
  markdownDropZone.classList.remove('drag-over');
});
markdownDropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  markdownDropZone.classList.remove('drag-over');

  const file = event.dataTransfer?.files?.[0];
  readAndRunDroppedMarkdown(file ? api.getPathForFile(file) || file.path || '' : '');
});
quickItemForm.addEventListener('submit', saveQuickItem);
cancelQuickItemButton.addEventListener('click', closeQuickItemEditor);
cancelQuickItemFooterButton.addEventListener('click', closeQuickItemEditor);
quickItemDialog.addEventListener('cancel', () => {
  quickItemEditor = null;
  quickItemForm.reset();
});
themeSelect.addEventListener('change', () => {
  currentSettings = {
    ...currentSettings,
    theme: themeSelect.value === 'light' ? 'light' : 'dark'
  };
  applySettings(currentSettings);
  saveSettingsSoon();
});
window.addEventListener('resize', scheduleFit);
window.addEventListener('beforeunload', () => {
  api.saveHistory(historyPayload()).catch(() => {});
  api.saveSettings(currentSettings).catch(() => {});
});

api.onHistoryCleared((history) => {
  applyHistory(history, { emptyAllowed: true });
  renderActiveBuffer();
  updateControls();
});

api.onConfigChanged(({ config, history }) => {
  applyConfig(config);
  applyHistory(history, { emptyAllowed: true });
  renderActiveBuffer();
  updateControls();
});

async function initialize() {
  try {
    applyConfig(await api.loadConfig());
  } catch (_error) {
    applyConfig(appConfig);
  }

  try {
    applySettings(await api.loadSettings());
  } catch (_error) {
    applySettings(currentSettings);
  }

  try {
    applyHistory(await api.loadHistory());
  } catch (_error) {
    historyStatus.textContent = HISTORY_TEXT.error;
  }

  renderQuickLists();
  updateControls();
  renderActiveBuffer();
  await renderSshSetupStatus();
  window.setTimeout(fitAndResize, 100);
}

initialize();
