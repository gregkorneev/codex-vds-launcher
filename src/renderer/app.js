const DIAGNOSTICS = [
  {
    id: 'ssh',
    labelKey: 'diagSsh',
    target: 'card'
  },
  {
    id: 'remote-info',
    labelKey: 'diagRemoteInfo',
    target: 'card'
  },
  {
    id: 'codex-command',
    labelKey: 'diagCodexCommand',
    target: 'card'
  },
  {
    id: 'vpn-command',
    labelKey: 'diagVpnCommand',
    target: 'card'
  },
  {
    id: 'server-health',
    labelKey: 'diagServerHealth',
    target: 'terminal'
  },
  {
    id: 'git-status',
    labelKey: 'diagGitStatus',
    target: 'terminal'
  },
  {
    id: 'docker-compose',
    labelKey: 'diagDockerCompose',
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

const TRANSLATIONS = {
  ru: {
    navLabel: 'Навигация Codex VDS Launcher',
    brandSubtitle: 'SSH-лаунчер для Codex CLI',
    projects: 'Проекты',
    sessions: 'Сессии',
    config: 'Конфиг',
    configLoading: 'config.json загружается',
    configLoaded: 'config.json загружен',
    openConfig: 'Открыть config file',
    reloadConfig: 'Перезагрузить config',
    copySshConfig: 'Скопировать пример SSH config',
    language: 'Язык',
    appearance: 'Оформление',
    theme: 'Тема',
    themeDark: 'Тёмная',
    themeLight: 'Светлая',
    accentColor: 'Акцентный цвет',
    syncAgents: 'Синхронизировать AGENTS.md',
    configureAgents: 'Настроить AGENTS.md',
    history: 'История',
    clearHistory: 'Очистить историю',
    clearHistoryTitle: 'Очистить сохранённую историю',
    activeSession: 'Активная сессия',
    sessionParams: 'Параметры сессии',
    terminalControls: 'Управление терминалом',
    startSession: 'Запустить сессию',
    stopSession: 'Остановить сессию',
    restartSession: 'Перезапустить сессию',
    clearTerminal: 'Очистить терминал',
    openExternal: 'Открыть внешний терминал',
    embeddedTerminal: 'Встроенный терминал Codex',
    rightPanelLabel: 'Статусы и быстрые промпты',
    serverStatus: 'Статус сервера',
    diagnostics: 'Диагностика',
    localMd: 'Локальные MD',
    runMarkdown: 'Выполнить Markdown',
    dropMarkdown: 'Перетащите .md сюда',
    quickPrompts: 'Быстрые промпты',
    quickCommands: 'Быстрые команды',
    editPromptsInConfig: 'Редактировать быстрые промпты в config.json',
    addCommandSet: 'Добавить набор команд',
    close: 'Закрыть',
    title: 'Название',
    text: 'Текст',
    cancel: 'Отмена',
    save: 'Сохранить',
    reset: 'Сбросить',
    codexInstructions: 'Инструкции для Codex',
    sshAlias: 'SSH alias',
    activeProject: 'Активный проект',
    sessionStatus: 'Статус сессии',
    historyStatus: 'История',
    noSecrets: 'Секреты не хранятся',
    statusActive: 'активна',
    statusInactive: 'неактивна',
    statusLoading: 'загрузка',
    statusOk: 'ок',
    statusError: 'ошибка',
    statusUnknown: 'неизвестно',
    historySaved: 'сохранена',
    historySaving: 'сохранение',
    historyError: 'ошибка',
    historyNew: 'новая',
    historyLoaded: 'загружена',
    historyEmpty: 'пусто',
    noData: 'Нет данных.',
    noOutput: 'Нет вывода.',
    running: 'Выполняется...',
    readOnlyRunning: 'Выполняется read-only проверка...',
    diagSsh: 'SSH check',
    diagRemoteInfo: 'Remote whoami/hostname/pwd',
    diagCodexCommand: 'Проверка команды Codex',
    diagVpnCommand: 'Проверка команды VPN',
    diagServerHealth: 'Здоровье сервера',
    diagGitStatus: 'Git status текущего проекта',
    diagDockerCompose: 'Docker compose check',
    launchProject: 'Запустить',
    readyPrefix: 'Готово. Запустите',
    readySuffix: 'чтобы открыть Codex CLI через',
    startSessionLog: 'Запуск',
    startFailed: 'Ошибка запуска',
    sessionStopped: 'остановлена',
    sessionExited: 'Завершена с кодом',
    signal: 'сигнал',
    unknownError: 'неизвестная ошибка',
    unknown: 'неизвестно',
    insertStartFirst: 'Сначала запустите сессию.',
    mdNoPath: 'Не удалось получить локальный путь файла. Используйте кнопку выбора Markdown.',
    mdStartFirst: 'Запустите сессию, чтобы отправить инструкции из',
    mdSent: 'Отправлены инструкции из',
    configReloaded: 'config.json перезагружен.',
    configReloadFailed: 'Не удалось перезагрузить config',
    configOpenFailed: 'Не удалось открыть config.json',
    sshExampleCopied: 'Пример SSH config скопирован в буфер обмена.',
    sshNotReady: 'SSH alias не готов.',
    sshUseExample: 'Используйте “Copy SSH config example”, добавьте блок в ~/.ssh/config и перезагрузите config.',
    addQuickCommandSetDialog: 'Добавить набор команд',
    editQuickCommandSetDialog: 'Изменить набор команд',
    commandSetPlaceholder: 'Команды, которые будут отправлены в активную консоль',
    deletePrompt: 'Удалить',
    editPrompt: 'Изменить',
    localMarkdownInstruction: 'Выполни инструкции из локального Markdown-файла пользователя.',
    localMarkdownNoFs: 'Удалённый сервер не имеет доступа к локальной файловой системе. Используй только содержимое ниже.'
  },
  en: {
    navLabel: 'Codex VDS Launcher navigation',
    brandSubtitle: 'SSH launcher for Codex CLI',
    projects: 'Projects',
    sessions: 'Sessions',
    config: 'Config',
    configLoading: 'Loading config.json',
    configLoaded: 'config.json loaded',
    openConfig: 'Open config file',
    reloadConfig: 'Reload config',
    copySshConfig: 'Copy SSH config example',
    language: 'Language',
    appearance: 'Appearance',
    theme: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    accentColor: 'Accent color',
    syncAgents: 'Sync AGENTS.md',
    configureAgents: 'Configure AGENTS.md',
    history: 'History',
    clearHistory: 'Clear history',
    clearHistoryTitle: 'Clear saved history',
    activeSession: 'Active session',
    sessionParams: 'Session parameters',
    terminalControls: 'Terminal controls',
    startSession: 'Start session',
    stopSession: 'Stop session',
    restartSession: 'Restart session',
    clearTerminal: 'Clear terminal',
    openExternal: 'Open external terminal',
    embeddedTerminal: 'Embedded Codex terminal',
    rightPanelLabel: 'Status and quick prompts',
    serverStatus: 'Server status',
    diagnostics: 'Diagnostics',
    localMd: 'Local MD',
    runMarkdown: 'Run Markdown',
    dropMarkdown: 'Drop .md here',
    quickPrompts: 'Quick prompts',
    quickCommands: 'Quick commands',
    editPromptsInConfig: 'Edit quick prompts in config.json',
    addCommandSet: 'Add command set',
    close: 'Close',
    title: 'Title',
    text: 'Text',
    cancel: 'Cancel',
    save: 'Save',
    reset: 'Reset',
    codexInstructions: 'Instructions for Codex',
    sshAlias: 'SSH alias',
    activeProject: 'Active project',
    sessionStatus: 'Session status',
    historyStatus: 'History',
    noSecrets: 'Secrets are not stored',
    statusActive: 'active',
    statusInactive: 'inactive',
    statusLoading: 'loading',
    statusOk: 'ok',
    statusError: 'error',
    statusUnknown: 'unknown',
    historySaved: 'saved',
    historySaving: 'saving',
    historyError: 'error',
    historyNew: 'new',
    historyLoaded: 'loaded',
    historyEmpty: 'empty',
    noData: 'No data.',
    noOutput: 'No output.',
    running: 'Running...',
    readOnlyRunning: 'Running read-only check...',
    diagSsh: 'SSH check',
    diagRemoteInfo: 'Remote whoami/hostname/pwd',
    diagCodexCommand: 'Codex command check',
    diagVpnCommand: 'VPN command check',
    diagServerHealth: 'Server health',
    diagGitStatus: 'Git status current project',
    diagDockerCompose: 'Docker compose check',
    launchProject: 'Start',
    readyPrefix: 'Ready. Start',
    readySuffix: 'to open Codex CLI through',
    startSessionLog: 'Starting',
    startFailed: 'Start failed',
    sessionStopped: 'stopped',
    sessionExited: 'Exited with code',
    signal: 'signal',
    unknownError: 'unknown error',
    unknown: 'unknown',
    insertStartFirst: 'Start a session first.',
    mdNoPath: 'Could not get a local file path. Use the Markdown picker button.',
    mdStartFirst: 'Start a session to send instructions from',
    mdSent: 'Sent instructions from',
    configReloaded: 'config.json reloaded.',
    configReloadFailed: 'Reload failed',
    configOpenFailed: 'Could not open config.json',
    sshExampleCopied: 'SSH config example copied to clipboard.',
    sshNotReady: 'SSH alias is not ready.',
    sshUseExample: 'Use “Copy SSH config example”, add it to ~/.ssh/config, then reload config.',
    addQuickCommandSetDialog: 'Add command set',
    editQuickCommandSetDialog: 'Edit command set',
    commandSetPlaceholder: 'Commands that will be sent to the active terminal',
    deletePrompt: 'Delete',
    editPrompt: 'Edit',
    localMarkdownInstruction: 'Run the instructions from the user selected local Markdown file.',
    localMarkdownNoFs: 'The remote server cannot access the local file system. Use only the content pasted below.'
  }
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
const languageSelect = document.querySelector('#languageSelect');
const themeSelect = document.querySelector('#themeSelect');
const accentPicker = document.querySelector('#accentPicker');
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
  language: 'ru',
  theme: 'dark',
  accentColor: 'blue',
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

function t(key) {
  const language = currentSettings.language === 'en' ? 'en' : 'ru';
  return TRANSLATIONS[language][key] || TRANSLATIONS.ru[key] || key;
}

function statusText(state) {
  const keys = {
    active: 'statusActive',
    inactive: 'statusInactive',
    loading: 'statusLoading',
    ok: 'statusOk',
    error: 'statusError',
    unknown: 'statusUnknown'
  };
  return t(keys[state] || 'statusUnknown');
}

function historyText(state) {
  const keys = {
    saved: 'historySaved',
    saving: 'historySaving',
    error: 'historyError',
    new: 'historyNew',
    loaded: 'historyLoaded',
    empty: 'historyEmpty'
  };
  return t(keys[state] || 'historyError');
}

function applyI18n() {
  const language = currentSettings.language === 'en' ? 'en' : 'ru';
  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(';').forEach((entry) => {
      const [attribute, key] = entry.split(':');
      if (attribute && key) {
        element.setAttribute(attribute, t(key));
      }
    });
  });

  updatePanelToggle(toggleLeftPanelButton, 'left', currentSettings.panels.left);
  updatePanelToggle(toggleRightPanelButton, 'right', currentSettings.panels.right);
  renderConfigSummary();
  renderDiagnostics();
  renderQuickLists();
  updateControls();
}

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
      ? `${t('readyPrefix')} ${project.name} ${t('readySuffix')} ssh ${appConfig.sshAlias} / ${appConfig.codexCommand}.\r\n`
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

function normalizeLanguage(value) {
  return value === 'en' ? 'en' : 'ru';
}

function normalizeAccentColor(value) {
  return ['blue', 'cyan', 'emerald', 'violet', 'rose', 'amber'].includes(value) ? value : 'blue';
}

function normalizeAgentInstructions(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text ? text.slice(0, 24000) : DEFAULT_AGENT_INSTRUCTIONS;
}

function buildTerminalTheme(settings) {
  const accentMap = {
    blue: '#38bdf8',
    cyan: '#22d3ee',
    emerald: '#34d399',
    violet: '#a78bfa',
    rose: '#fb7185',
    amber: '#fbbf24'
  };
  const cursor = accentMap[settings.accentColor] || accentMap.blue;

  if (settings.theme === 'light') {
    return {
      background: '#f8fafc',
      foreground: '#0f172a',
      cursor,
      selectionBackground: '#bae6fd'
    };
  }

  return {
    background: '#07111f',
    foreground: '#dce7f2',
    cursor,
    selectionBackground: '#334155'
  };
}

function updatePanelToggle(button, side, visible) {
  const isLeft = side === 'left';
  const label = currentSettings.language === 'en'
    ? `${visible ? 'Hide' : 'Show'} ${isLeft ? 'left' : 'right'} panel`
    : `${visible ? 'Скрыть' : 'Показать'} ${isLeft ? 'левую' : 'правую'} панель`;
  button.title = label;
  button.setAttribute('aria-label', label);
  button.setAttribute('aria-pressed', String(!visible));
}

function applyPanelVisibility() {
  document.body.classList.toggle('left-panel-hidden', !currentSettings.panels.left);
  document.body.classList.toggle('right-panel-hidden', !currentSettings.panels.right);
  updatePanelToggle(toggleLeftPanelButton, 'left', currentSettings.panels.left);
  updatePanelToggle(toggleRightPanelButton, 'right', currentSettings.panels.right);
  scheduleFit();
}

function applySettings(settings) {
  currentSettings = {
    language: normalizeLanguage(settings.language),
    theme: settings.theme === 'light' ? 'light' : 'dark',
    accentColor: normalizeAccentColor(settings.accentColor),
    panels: normalizePanelSettings(settings.panels),
    syncAgentInstructions: settings.syncAgentInstructions !== false,
    agentInstructions: normalizeAgentInstructions(settings.agentInstructions),
    quickCommandSets: normalizeQuickItems(settings.quickCommandSets, DEFAULT_QUICK_COMMAND_SETS)
  };

  document.body.dataset.theme = currentSettings.theme;
  document.body.dataset.accent = currentSettings.accentColor;
  terminal.options.theme = buildTerminalTheme(currentSettings);
  languageSelect.value = currentSettings.language;
  themeSelect.value = currentSettings.theme;
  syncAgentInstructions.checked = currentSettings.syncAgentInstructions;
  document.querySelectorAll('.accent-swatch').forEach((button) => {
    const active = button.dataset.accent === currentSettings.accentColor;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  applyPanelVisibility();
  applyI18n();
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
    historyStatus.textContent = historyText('saved');
  } catch (_error) {
    historyStatus.textContent = historyText('error');
  }
}

function saveHistorySoon() {
  historyStatus.textContent = historyText('saving');
  window.clearTimeout(saveHistoryTimer);
  saveHistoryTimer = window.setTimeout(saveHistoryNow, 350);
}

function applyHistory(history, { emptyAllowed = false } = {}) {
  syncProjectState();
  const buffers = history && history.buffers ? history.buffers : null;
  const hasSavedText = buffers && Object.values(buffers).some((value) => typeof value === 'string' && value.length > 0);

  if (!emptyAllowed && !history?.updatedAt && !hasSavedText) {
    historyStatus.textContent = historyText('new');
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

  historyStatus.textContent = hasSavedText ? historyText('loaded') : historyText('empty');
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
    startButton.title = `${t('launchProject')} ${project.name}`;
    startButton.setAttribute('aria-label', `${t('launchProject')} ${project.name}`);
    startButton.textContent = '▶';
    startButton.addEventListener('click', () => startSession(project.id));

    const state = document.createElement('span');
    state.className = 'project-state';
    state.dataset.stateTarget = project.id;
    state.textContent = statusText(sessionStatus(project.id));

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
  configErrors.textContent = errors.length > 0 ? errors.join(' ') : t('configLoaded');
  configErrors.classList.toggle('error-text', errors.length > 0);
}

function renderDiagnostics() {
  statusCards.innerHTML = '';
  diagnosticActions.innerHTML = '';

  DIAGNOSTICS.forEach((check) => {
    if (check.target === 'card') {
      const label = t(check.labelKey);
      const card = document.createElement('article');
      card.className = 'status-card';
      card.dataset.checkCard = check.id;
      card.innerHTML = [
        '<div class="status-card-top">',
        '<div>',
        `<strong>${label}</strong>`,
        `<span class="status-label unknown">${statusText('unknown')}</span>`,
        '</div>',
        `<button type="button" class="mini-button" data-check="${check.id}" title="${t('reloadConfig')} ${label}" aria-label="${t('reloadConfig')} ${label}">↻</button>`,
        '</div>',
        `<pre class="status-output">${t('noData')}</pre>`
      ].join('');
      statusCards.appendChild(card);
    } else {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'diagnostic-button';
      button.dataset.check = check.id;
      button.textContent = t(check.labelKey);
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
  footerStatus.textContent = statusText(sessionStatus(activeProject.id));
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
    state.textContent = statusText(sessionStatus(state.dataset.stateTarget));
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

  return parts.length > 0 ? parts.join('\n\n') : t('noOutput');
}

function setCheckState(checkId, state, output) {
  const card = document.querySelector(`[data-check-card="${checkId}"]`);

  if (!card) {
    return;
  }

  const label = card.querySelector('.status-label');
  const outputElement = card.querySelector('.status-output');
  label.className = `status-label ${state}`;
  label.textContent = statusText(state) || state;
  outputElement.textContent = output || t('noData');
}

async function runCheck(checkId) {
  const check = DIAGNOSTICS.find((item) => item.id === checkId);

  if (!check) {
    return;
  }

  if (check.target === 'terminal') {
    writeLocal(activeProjectId, `\r\n[diagnostic] ${t(check.labelKey)}\r\n${t('readOnlyRunning')}\r\n`);
  } else {
    setCheckState(checkId, 'loading', t('running'));
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
  writeLocal(projectId, `\r\n[session] ${t('startSessionLog')} ${project.name} through ssh ${appConfig.sshAlias} / ${appConfig.codexCommand}...\r\n`);
  updateControls();

  const result = await api.terminalStart(projectId);

  if (!result.ok) {
    writeLocal(projectId, `[session] ${t('startFailed')}: ${result.error || t('unknownError')}\r\n`);
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
  writeLocal(projectId, `\r\n[session] ${project.name} ${t('sessionStopped')}.\r\n`);
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
    writeLocal(activeProjectId, `\r\n[external terminal] ${t('statusError')}: ${result.error || t('unknownError')}\r\n`);
  }
}

function normalizeTerminalNewlines(text) {
  return text.replace(/\r?\n/g, '\r');
}

function writeSessionText(text, { label, execute = false } = {}) {
  const sessionId = currentSessionId();

  if (!sessionId) {
    writeLocal(activeProjectId, `\r\n[${label || 'insert'}] ${t('insertStartFirst')}\r\n`);
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
    t('localMarkdownInstruction'),
    `File: ${file.fileName || 'instructions.md'}`,
    '',
    t('localMarkdownNoFs'),
    '',
    '--- BEGIN LOCAL MARKDOWN ---',
    file.content || '',
    '--- END LOCAL MARKDOWN ---'
  ].join('\n');
}

function runMarkdownInstruction(file) {
  if (!file?.ok) {
    if (file && !file.canceled) {
      writeLocal(activeProjectId, `\r\n[md] ${t('statusError')}: ${file.error || 'could not read file'}\r\n`);
    }
    return;
  }

  if (!currentSessionId()) {
    writeLocal(activeProjectId, `\r\n[md] ${t('mdStartFirst')} ${file.fileName}.\r\n`);
    return;
  }

  writeSessionText(buildMarkdownInstructionPrompt(file), {
    label: 'local MD',
    execute: true
  });
  writeLocal(activeProjectId, `\r\n[md] ${t('mdSent')} ${file.fileName}.\r\n`);
}

async function selectAndRunMarkdownInstruction() {
  try {
    runMarkdownInstruction(await api.selectMarkdownInstructionFile());
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[md] ${t('statusError')}: ${error.message || String(error)}\r\n`);
  }
}

async function readAndRunDroppedMarkdown(filePath) {
  if (!filePath) {
    writeLocal(activeProjectId, `\r\n[md] ${t('mdNoPath')}\r\n`);
    return;
  }

  try {
    runMarkdownInstruction(await api.readMarkdownInstructionFile(filePath));
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[md] ${t('statusError')}: ${error.message || String(error)}\r\n`);
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
      editButton.title = t('editPrompt');
      editButton.setAttribute('aria-label', `${t('editPrompt')} ${item.title}`);
      editButton.addEventListener('click', () => openQuickItemEditor(index));

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'mini-button quick-action-button danger';
      deleteButton.textContent = '×';
      deleteButton.title = t('deletePrompt');
      deleteButton.setAttribute('aria-label', `${t('deletePrompt')} ${item.title}`);
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
  quickItemDialogTitle.textContent = item ? t('editQuickCommandSetDialog') : t('addQuickCommandSetDialog');
  quickItemTitle.value = item?.title || '';
  quickItemText.value = item?.text || '';
  quickItemText.placeholder = t('commandSetPlaceholder');
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

  if (!item) {
    return;
  }

  const confirmText = currentSettings.language === 'en'
    ? `Delete "${item.title}"?`
    : `Удалить "${item.title}"?`;

  if (!window.confirm(confirmText)) {
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
  const confirmed = window.confirm(currentSettings.language === 'en'
    ? 'Clear saved terminal history for all sessions?'
    : 'Очистить сохранённую историю терминала для всех сессий?');

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
        `\r\n[ssh] ${t('sshNotReady')}`,
        `\r\n[ssh] Config: ${status.configPath}`,
        `\r\n[ssh] Alias: ${status.alias}`,
        status.error ? `\r\n[ssh] ${status.error}` : '',
        `\r\n[ssh] ${t('sshUseExample')}\r\n`
      ].join('')
    );
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[ssh] SSH check failed: ${error.message || String(error)}\r\n`);
  }
}

async function openConfigFile() {
  const result = await api.openConfigFile();

  if (!result.ok) {
    writeLocal(activeProjectId, `\r\n[config] ${t('configOpenFailed')}: ${result.error || t('unknownError')}\r\n`);
  }
}

async function reloadConfig() {
  const result = await api.reloadConfig();

  if (!result.ok) {
    writeLocal(activeProjectId, `\r\n[config] ${t('configReloadFailed')}: ${result.error || t('unknownError')}\r\n`);
    return;
  }

  applyConfig(result.config);
  applyHistory(result.history, { emptyAllowed: true });
  renderActiveBuffer();
  updateControls();
  writeLocal(activeProjectId, `\r\n[config] ${t('configReloaded')}\r\n`);
}

async function copySshConfigExample() {
  const example = await api.getSshConfigExample();
  api.writeClipboardText(example);
  writeLocal(activeProjectId, `\r\n[ssh] ${t('sshExampleCopied')}\r\n`);
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
    `\r\n[session] ${t('sessionExited')} ${exitCode ?? t('unknown')}${signal ? `, ${t('signal')} ${signal}` : ''}.\r\n`
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
languageSelect.addEventListener('change', () => {
  currentSettings = {
    ...currentSettings,
    language: normalizeLanguage(languageSelect.value)
  };
  applySettings(currentSettings);
  saveSettingsSoon();
});
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
accentPicker.addEventListener('click', (event) => {
  const button = event.target.closest('[data-accent]');

  if (!button) {
    return;
  }

  currentSettings = {
    ...currentSettings,
    accentColor: normalizeAccentColor(button.dataset.accent)
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
    historyStatus.textContent = historyText("error");
  }

  renderQuickLists();
  updateControls();
  renderActiveBuffer();
  await renderSshSetupStatus();
  window.setTimeout(fitAndResize, 100);
}

initialize();
