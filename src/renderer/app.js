const DISPLAY_VERSION = '1 - beta 4.1 (1 - beta 4.1)';
const RELEASE_NAME = 'Codex VDS Launcher Developer Beta 4.1';

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
    vdsConfiguration: 'Конфигурация VDS',
    configLoading: 'config.json загружается',
    configLoaded: 'config.json загружен',
    openConfig: 'Открыть config file',
    reloadConfig: 'Перезагрузить config',
    copySshConfig: 'Скопировать пример SSH config',
    codexCommandHelpCodex: 'Команда Codex на VDS: codex. Это обычный вариант для новых пользователей.',
    codexCommandHelpVpn: 'Команда Codex на VDS: codex-vpn. Это пользовательская обёртка, приложение её не устанавливает. Новым пользователям нужен обычный codex.',
    openSetupGuide: 'Инструкция подключения',
    language: 'Язык',
    appearance: 'Оформление',
    customization: 'Кастомизация',
    theme: 'Тема',
    themeDark: 'Тёмная',
    themeLight: 'Светлая',
    accentColor: 'Акцентный цвет',
    syncAgents: 'Синхронизировать AGENTS.md',
    configureAgents: 'Настроить AGENTS.md',
    updateApp: 'Обновить приложение',
    updateIdle: 'Обновления не проверялись',
    updateChecking: 'Проверяем обновления...',
    updateDownloading: 'Скачиваем обновление',
    updateDownloaded: 'Обновление готово к установке',
    updateLatest: 'У вас установлена последняя версия.',
    updateUnsupported: 'Обновления доступны только в установленной сборке.',
    updateError: 'Ошибка обновления',
    updateChannel: 'Канал',
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
    addQuickPrompt: 'Добавить быстрый промпт',
    addCommandSet: 'Добавить набор команд',
    close: 'Закрыть',
    title: 'Название',
    text: 'Текст',
    cancel: 'Отмена',
    save: 'Сохранить',
    reset: 'Сбросить',
    startUsing: 'Начать работу',
    versionLabel: 'Версия',
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
    diagVpnCommand: 'Проверка codex-vpn (опционально)',
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
    addQuickPromptDialog: 'Добавить быстрый промпт',
    editQuickPromptDialog: 'Изменить быстрый промпт',
    commandSetPlaceholder: 'Команды, которые будут отправлены в активную консоль',
    quickPromptPlaceholder: 'Промпт, который будет вставлен в активную консоль',
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
    vdsConfiguration: 'VDS Configuration',
    configLoading: 'Loading config.json',
    configLoaded: 'config.json loaded',
    openConfig: 'Open config file',
    reloadConfig: 'Reload config',
    copySshConfig: 'Copy SSH config example',
    codexCommandHelpCodex: 'Codex command on VDS: codex. This is the normal choice for new users.',
    codexCommandHelpVpn: 'Codex command on VDS: codex-vpn. This is a custom wrapper and the app does not install it. New users should use plain codex.',
    openSetupGuide: 'Connection guide',
    language: 'Language',
    appearance: 'Appearance',
    customization: 'Customization',
    theme: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    accentColor: 'Accent color',
    syncAgents: 'Sync AGENTS.md',
    configureAgents: 'Configure AGENTS.md',
    updateApp: 'Update app',
    updateIdle: 'Updates have not been checked',
    updateChecking: 'Checking for updates...',
    updateDownloading: 'Downloading update',
    updateDownloaded: 'Update is ready to install',
    updateLatest: 'You are running the latest version.',
    updateUnsupported: 'Updates are available only in an installed build.',
    updateError: 'Update error',
    updateChannel: 'Channel',
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
    addQuickPrompt: 'Add quick prompt',
    addCommandSet: 'Add command set',
    close: 'Close',
    title: 'Title',
    text: 'Text',
    cancel: 'Cancel',
    save: 'Save',
    reset: 'Reset',
    startUsing: 'Start using',
    versionLabel: 'Version',
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
    diagVpnCommand: 'codex-vpn wrapper check (optional)',
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
    addQuickPromptDialog: 'Add quick prompt',
    editQuickPromptDialog: 'Edit quick prompt',
    commandSetPlaceholder: 'Commands that will be sent to the active terminal',
    quickPromptPlaceholder: 'Prompt that will be inserted into the active terminal',
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
const codexCommandHelp = document.querySelector('#codexCommandHelp');
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
const updateAppButton = document.querySelector('#updateApp');
const updateStatus = document.querySelector('#updateStatus');
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
const openSetupGuideButton = document.querySelector('#openSetupGuide');
const addQuickPromptButton = document.querySelector('#addQuickPrompt');
const addQuickCommandSetButton = document.querySelector('#addQuickCommandSet');
const quickItemDialog = document.querySelector('#quickItemDialog');
const quickItemForm = document.querySelector('#quickItemForm');
const quickItemDialogTitle = document.querySelector('#quickItemDialogTitle');
const quickItemTitle = document.querySelector('#quickItemTitle');
const quickItemText = document.querySelector('#quickItemText');
const cancelQuickItemButton = document.querySelector('#cancelQuickItem');
const cancelQuickItemFooterButton = document.querySelector('#cancelQuickItemFooter');
const setupGuideDialog = document.querySelector('#setupGuideDialog');
const setupGuideKicker = document.querySelector('#setupGuideKicker');
const setupGuideTitle = document.querySelector('#setupGuideTitle');
const setupGuideContent = document.querySelector('#setupGuideContent');
const closeSetupGuideButton = document.querySelector('#closeSetupGuide');
const finishSetupGuideButton = document.querySelector('#finishSetupGuide');
const copyGuideSshConfigButton = document.querySelector('#copyGuideSshConfig');
const openGuideConfigButton = document.querySelector('#openGuideConfig');
const appVersionLabel = document.querySelector('#appVersionLabel');

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
  codexCommand: 'codex',
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
let currentUpdateState = { status: 'idle' };

let currentSettings = {
  language: 'ru',
  theme: 'dark',
  accentColor: 'blue',
  panels: {
    left: true,
    right: true
  },
  onboardingSeen: false,
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
  updateStatusText(currentUpdateState);
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
    onboardingSeen: settings.onboardingSeen === true,
    syncAgentInstructions: settings.syncAgentInstructions !== false,
    agentInstructions: normalizeAgentInstructions(settings.agentInstructions),
    quickCommandSets: normalizeQuickItems(settings.quickCommandSets, DEFAULT_QUICK_COMMAND_SETS)
  };

  document.body.dataset.theme = currentSettings.theme;
  document.body.dataset.accent = currentSettings.accentColor;
  terminal.options.theme = buildTerminalTheme(currentSettings);
  appVersionLabel.textContent = DISPLAY_VERSION;
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

function updateStatusText(state = {}) {
  const hasMessage = Object.prototype.hasOwnProperty.call(state, 'message');
  currentUpdateState = {
    ...currentUpdateState,
    ...state,
    message: hasMessage ? state.message : (state.status ? '' : currentUpdateState.message)
  };
  const status = currentUpdateState.status || 'idle';
  const channel = currentUpdateState.channel || 'latest';
  const percent = Number.isFinite(currentUpdateState.percent) ? ` ${Math.round(currentUpdateState.percent)}%` : '';
  const suffix = ` · ${t('updateChannel')}: ${channel}`;
  const explicitMessage = typeof currentUpdateState.message === 'string' ? currentUpdateState.message.trim() : '';

  const fallback = {
    idle: t('updateIdle'),
    checking: t('updateChecking'),
    downloading: `${t('updateDownloading')}${percent}`,
    downloaded: t('updateDownloaded'),
    latest: t('updateLatest'),
    unsupported: t('updateUnsupported'),
    error: t('updateError')
  }[status] || t('updateIdle');

  updateStatus.textContent = `${explicitMessage || fallback}${suffix}`;
  updateStatus.dataset.state = status;
  updateAppButton.disabled = ['checking', 'downloading'].includes(status);
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
  footerCommand.textContent = appConfig.codexCommand || 'codex';
  activeSshAlias.textContent = `ssh ${appConfig.sshAlias || 'my-vds'}`;
  activeCommand.textContent = appConfig.codexCommand || 'codex';
  codexCommandHelp.textContent = appConfig.codexCommand === 'codex-vpn'
    ? t('codexCommandHelpVpn')
    : t('codexCommandHelpCodex');

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

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'mini-button quick-action-button';
    editButton.textContent = '✎';
    editButton.title = t('editPrompt');
    editButton.setAttribute('aria-label', `${t('editPrompt')} ${item.title}`);
    editButton.addEventListener('click', () => openQuickItemEditor(kind, index));

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'mini-button quick-action-button danger';
    deleteButton.textContent = '×';
    deleteButton.title = t('deletePrompt');
    deleteButton.setAttribute('aria-label', `${t('deletePrompt')} ${item.title}`);
    deleteButton.addEventListener('click', () => deleteQuickItem(kind, index));

    row.append(editButton, deleteButton);

    container.appendChild(row);
  });
}

function renderQuickLists() {
  renderQuickItems(quickPrompts, appConfig.quickPrompts || [], 'prompt');
  renderQuickItems(quickCommandSets, currentSettings.quickCommandSets, 'command');
}

function openQuickItemEditor(kind = 'command', index = -1) {
  const isPrompt = kind === 'prompt';
  const source = isPrompt ? appConfig.quickPrompts || [] : currentSettings.quickCommandSets;
  const item = index >= 0 ? source[index] : null;
  quickItemEditor = { kind, index };
  quickItemDialogTitle.textContent = item
    ? t(isPrompt ? 'editQuickPromptDialog' : 'editQuickCommandSetDialog')
    : t(isPrompt ? 'addQuickPromptDialog' : 'addQuickCommandSetDialog');
  quickItemTitle.value = item?.title || '';
  quickItemText.value = item?.text || '';
  quickItemText.placeholder = t(isPrompt ? 'quickPromptPlaceholder' : 'commandSetPlaceholder');
  quickItemDialog.showModal();
  quickItemTitle.focus();
}

function closeQuickItemEditor() {
  quickItemEditor = null;
  quickItemForm.reset();
  quickItemDialog.close();
}

async function saveQuickItem(event) {
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

  const isPrompt = quickItemEditor.kind === 'prompt';
  const items = isPrompt ? [...(appConfig.quickPrompts || [])] : [...currentSettings.quickCommandSets];
  const normalizedItem = makeQuickItem(title, text);

  if (quickItemEditor.index >= 0) {
    normalizedItem.id = items[quickItemEditor.index]?.id || normalizedItem.id;
    items[quickItemEditor.index] = normalizedItem;
  } else {
    items.push(normalizedItem);
  }

  if (isPrompt) {
    try {
      const result = await api.saveQuickPrompts(items);
      if (result.ok && result.config) {
        appConfig = result.config;
      }
    } catch (error) {
      writeLocal(activeProjectId, `\r\n[quick prompts] ${t('statusError')}: ${error.message || String(error)}\r\n`);
      return;
    }
  } else {
    currentSettings = {
      ...currentSettings,
      quickCommandSets: items
    };
    saveSettingsSoon();
  }

  renderQuickLists();
  closeQuickItemEditor();
}

async function deleteQuickItem(kind, index) {
  const isPrompt = kind === 'prompt';
  const source = isPrompt ? appConfig.quickPrompts || [] : currentSettings.quickCommandSets;
  const item = source[index];

  if (!item) {
    return;
  }

  const confirmText = currentSettings.language === 'en'
    ? `Delete "${item.title}"?`
    : `Удалить "${item.title}"?`;

  if (!window.confirm(confirmText)) {
    return;
  }

  const nextItems = source.filter((_entry, entryIndex) => entryIndex !== index);

  if (isPrompt) {
    try {
      const result = await api.saveQuickPrompts(nextItems);
      if (result.ok && result.config) {
        appConfig = result.config;
      }
    } catch (error) {
      writeLocal(activeProjectId, `\r\n[quick prompts] ${t('statusError')}: ${error.message || String(error)}\r\n`);
      return;
    }
  } else {
    currentSettings = {
      ...currentSettings,
      quickCommandSets: nextItems
    };
    saveSettingsSoon();
  }

  renderQuickLists();
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

async function checkForAppUpdates() {
  updateStatusText({ status: 'checking' });

  try {
    const result = await api.checkForUpdates();
    if (result?.state) {
      updateStatusText(result.state);
    }
  } catch (error) {
    updateStatusText({
      status: 'error',
      message: error.message || String(error)
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setupGuideMarkup({ welcome = false } = {}) {
  const alias = escapeHtml(appConfig.sshAlias || 'my-vds');
  const configFile = escapeHtml(appConfig.path || 'config.json');

  if (currentSettings.language === 'en') {
    return `
      <section class="guide-hero">
        <img src="./assets/app-icon.png" alt="">
        <div>
          <h3>${welcome ? 'Welcome to the developer beta' : 'Connect your VDS'}</h3>
          <p class="guide-version-line"><strong>Version:</strong> ${escapeHtml(DISPLAY_VERSION)}</p>
          <p>Install Codex CLI on the VDS, set up a normal OpenSSH alias once, then launch Codex on the server from this app.</p>
        </div>
      </section>
      <section class="guide-grid">
        <article><strong>Left panel</strong><span>Projects, sessions, config, customization, AGENTS.md.</span></article>
        <article><strong>Center</strong><span>Embedded terminal and session controls.</span></article>
        <article><strong>Right panel</strong><span>Server checks, diagnostics, quick prompts, quick commands.</span></article>
      </section>
      <p class="guide-note"><strong>What is codex-vpn?</strong> It is not part of Codex CLI and is not installed by this app. Treat it as an advanced custom wrapper. For a fresh server, install and use the regular <code>codex</code> command.</p>
      <ol class="guide-steps">
        <li><strong>Install Codex CLI on the VDS.</strong><span>Connect to the server and run the official macOS/Linux installer, then start <code>codex</code> once to sign in with ChatGPT or an API key.</span><pre>ssh root@YOUR_SERVER_IP
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex</pre></li>
        <li><strong>Create or pick a local SSH key.</strong><code>ssh-keygen -t ed25519 -f ~/.ssh/my_vds_key</code></li>
        <li><strong>Add the public key to your VDS.</strong><code>ssh-copy-id -i ~/.ssh/my_vds_key.pub root@YOUR_SERVER_IP</code></li>
        <li><strong>Add an alias to your local ~/.ssh/config.</strong><pre>Host ${alias}
    HostName YOUR_SERVER_IP
    User root
    IdentityFile ~/.ssh/my_vds_key
    IdentitiesOnly yes
    PreferredAuthentications publickey
    PasswordAuthentication no
    ServerAliveInterval 30
    ServerAliveCountMax 3</pre></li>
        <li><strong>Test it in Terminal.</strong><code>ssh ${alias}</code></li>
        <li><strong>Open ${configFile}.</strong><span>Set <code>sshAlias</code> to <code>${alias}</code>, keep <code>codexCommand</code> as <code>codex</code>, and add project paths like <code>/opt/app</code>.</span></li>
        <li><strong>Reload config and start a session.</strong><span>Use the play button in the top toolbar or the project start button.</span></li>
      </ol>
    `;
  }

  return `
    <section class="guide-hero">
      <img src="./assets/app-icon.png" alt="">
      <div>
        <h3>${welcome ? 'Добро пожаловать в developer beta' : 'Подключение к своему VDS'}</h3>
        <p class="guide-version-line"><strong>Версия:</strong> ${escapeHtml(DISPLAY_VERSION)}</p>
        <p>Установите Codex CLI на VDS, один раз настройте обычный OpenSSH alias, а затем запускайте Codex на сервере из приложения.</p>
      </div>
    </section>
      <section class="guide-grid">
        <article><strong>Левая панель</strong><span>Проекты, сессии, конфиг, кастомизация, AGENTS.md.</span></article>
        <article><strong>Центр</strong><span>Встроенный терминал и кнопки управления сессией.</span></article>
        <article><strong>Правая панель</strong><span>Проверки сервера, диагностика, быстрые промпты и команды.</span></article>
      </section>
      <p class="guide-note"><strong>Что такое codex-vpn?</strong> Это не часть Codex CLI и приложение его не устанавливает. Считайте это продвинутой пользовательской обёрткой. Для нового сервера установите и используйте обычную команду <code>codex</code>.</p>
      <ol class="guide-steps">
      <li><strong>Установите Codex CLI на VDS.</strong><span>Подключитесь к серверу, запустите официальный installer для macOS/Linux, затем один раз выполните <code>codex</code> и авторизуйтесь через ChatGPT или API key.</span><pre>ssh root@YOUR_SERVER_IP
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex</pre></li>
      <li><strong>Создайте или выберите локальный SSH-ключ.</strong><code>ssh-keygen -t ed25519 -f ~/.ssh/my_vds_key</code></li>
      <li><strong>Добавьте публичный ключ на VDS.</strong><code>ssh-copy-id -i ~/.ssh/my_vds_key.pub root@YOUR_SERVER_IP</code></li>
      <li><strong>Добавьте alias в локальный ~/.ssh/config.</strong><pre>Host ${alias}
    HostName YOUR_SERVER_IP
    User root
    IdentityFile ~/.ssh/my_vds_key
    IdentitiesOnly yes
    PreferredAuthentications publickey
    PasswordAuthentication no
    ServerAliveInterval 30
    ServerAliveCountMax 3</pre></li>
      <li><strong>Проверьте подключение в Terminal.</strong><code>ssh ${alias}</code></li>
      <li><strong>Откройте ${configFile}.</strong><span>Укажите <code>sshAlias</code> как <code>${alias}</code>, оставьте <code>codexCommand</code> равным <code>codex</code> и добавьте пути проектов вроде <code>/opt/app</code>.</span></li>
      <li><strong>Перезагрузите config и запустите сессию.</strong><span>Используйте кнопку запуска в верхней панели или кнопку старта у проекта.</span></li>
    </ol>
  `;
}

function openSetupGuide({ welcome = false } = {}) {
  setupGuideKicker.textContent = RELEASE_NAME;
  setupGuideTitle.textContent = currentSettings.language === 'en'
    ? (welcome ? 'First launch guide' : 'VDS connection guide')
    : (welcome ? 'Первый запуск' : 'Инструкция подключения к VDS');
  setupGuideContent.innerHTML = setupGuideMarkup({ welcome });
  setupGuideDialog.showModal();
}

function closeSetupGuide({ markSeen = false } = {}) {
  if (markSeen) {
    currentSettings = {
      ...currentSettings,
      onboardingSeen: true
    };
    saveSettingsSoon();
  }

  setupGuideDialog.close();
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
openSetupGuideButton.addEventListener('click', () => openSetupGuide());
addQuickPromptButton.addEventListener('click', () => openQuickItemEditor('prompt'));
addQuickCommandSetButton.addEventListener('click', () => openQuickItemEditor('command'));
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
updateAppButton.addEventListener('click', checkForAppUpdates);
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
closeSetupGuideButton.addEventListener('click', () => closeSetupGuide({ markSeen: true }));
finishSetupGuideButton.addEventListener('click', () => closeSetupGuide({ markSeen: true }));
copyGuideSshConfigButton.addEventListener('click', copySshConfigExample);
openGuideConfigButton.addEventListener('click', openConfigFile);
setupGuideDialog.addEventListener('cancel', () => {
  currentSettings = {
    ...currentSettings,
    onboardingSeen: true
  };
  saveSettingsSoon();
});
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

api.onUiCommand(({ command }) => {
  const actions = {
    'show-welcome': () => openSetupGuide({ welcome: true }),
    'show-version-welcome': () => openSetupGuide({ welcome: true }),
    'show-setup-guide': () => openSetupGuide(),
    'open-config': openConfigFile,
    'reload-config': reloadConfig,
    'copy-ssh-config': copySshConfigExample,
    'run-ssh-check': () => runCheck('ssh'),
    'start-session': () => startSession(),
    'stop-session': () => stopSession(),
    'restart-session': () => restartSession(),
    'open-external': openExternalTerminal,
    'clear-terminal': clearActiveTerminal,
    'clear-history': clearSavedHistory,
    'toggle-left-panel': () => toggleLeftPanelButton.click(),
    'toggle-right-panel': () => toggleRightPanelButton.click()
  };

  actions[command]?.();
});

api.onUpdateStatus((state) => {
  updateStatusText(state);
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
  try {
    updateStatusText(await api.getUpdateStatus());
  } catch (_error) {
    updateStatusText({ status: 'idle' });
  }
  updateControls();
  renderActiveBuffer();
  await renderSshSetupStatus();
  if (!currentSettings.onboardingSeen) {
    window.setTimeout(() => openSetupGuide({ welcome: true }), 180);
  }
  window.setTimeout(fitAndResize, 100);
}

initialize();
