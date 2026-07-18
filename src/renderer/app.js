const DISPLAY_VERSION = 'Developer Beta 9 (1.0.0-beta.9)';
const RELEASE_NAME = 'Codex CLI Launcher Developer Beta 9';

const RELEASE_CHANGES = {
  ru: [
    'Историю последнего запуска каждой сессии теперь можно сгрузить в Markdown через кнопку в списке сессий.',
    'Терминал теперь корректно подстраивается под размер окна и панелей без наложения на правую колонку.',
    'Профиль Codex отдельно показывает имя пользователя, email, тип подписки, оставшиеся лимиты и время их обновления.',
    'Профиль поддерживает данные локального Codex CLI и Codex CLI на выбранной VDS без чтения токенов.',
    'Обновлены иконки приложения для macOS, Windows и интерфейса Launcher; иконки menu bar и tray сохранены.'
  ],
  en: [
    'The latest run of each session can now be exported to Markdown from the session list.',
    'The terminal now tracks window and panel size changes without overlapping the right column.',
    'The Codex profile separately shows the username, email, subscription type, remaining limits, and reset times.',
    'The profile supports both the local Codex CLI and the selected VDS Codex CLI without reading tokens.',
    'Application icons have been refreshed for macOS, Windows, and the Launcher UI while menu bar and tray icons remain unchanged.'
  ]
};

const STATUS_CHECKS = [
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
  '# Codex CLI Launcher',
  '',
  '- Answer concisely and stay focused on the requested task.',
  '- Explain the plan before risky changes.',
  '- Do not print secrets, tokens, private keys, or .env values.',
  '- Do not run destructive commands without explicit confirmation.',
  '- Write release notes only when the user asks for them.'
].join('\n');

const TRANSLATIONS = {
  ru: {
    navLabel: 'Навигация Codex CLI Launcher',
    brandSubtitle: 'Codex CLI локально и на VDS',
    projects: 'Проекты',
    sessions: 'Сессии',
    addProject: 'Добавить проект',
    deleteProject: 'Удалить проект',
    add: 'Добавить',
    projectLocation: 'Где запустить Codex',
    projectRemote: 'На VDS',
    projectLocal: 'На этом компьютере',
    projectName: 'Название проекта',
    projectFolder: 'Папка проекта',
    selectLocalFolder: 'Выбрать локальную папку',
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
    settings: 'Настройки',
    launcherMode: 'Режим работы',
    modeLocal: 'На этом компьютере',
    modeVds: 'На VDS через SSH',
    launcherModeHelp: 'Переключение меняет список проектов и скрывает ненужные VDS-разделы.',
    customization: 'Кастомизация',
    theme: 'Тема',
    themeDark: 'Тёмная',
    themeLight: 'Светлая',
    accentColor: 'Акцентный цвет',
    syncAgents: 'Синхронизировать AGENTS.md',
    configureAgents: 'Настроить AGENTS.md',
    updateApp: 'Обновить приложение',
    updates: 'Обновления',
    checkUpdates: 'Проверить обновления',
    updateAvailable: 'Доступна новая версия',
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
    rightPanelLabel: 'Обновления, Markdown и быстрые действия',
    serverStatus: 'Статус сервера',
    localMd: 'Локальные MD',
    runMarkdown: 'Выполнить Markdown',
    dropMarkdown: 'Перетащите .md сюда',
    quickActions: 'Быстрые действия',
    addQuickAction: 'Добавить быстрое действие',
    quickPrompts: 'Промпты',
    quickCommands: 'Команды',
    noProjects: 'В этом режиме пока нет проектов. Добавьте первый проект кнопкой ＋.',
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
    historyExported: 'сгружена в Markdown',
    exportSessionHistory: 'Сгрузить историю сессии',
    exportSessionFailed: 'Не удалось сгрузить историю сессии.',
    noData: 'Нет данных.',
    noOutput: 'Нет вывода.',
    running: 'Выполняется...',
    readOnlyRunning: 'Выполняется read-only проверка...',
    diagSsh: 'VDS / SSH',
    diagRemoteInfo: 'VDS IP / host',
    diagCodexCommand: 'Codex CLI на VDS',
    diagVpnCommand: 'VPN / codex-vpn',
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
    addQuickActionDialog: 'Добавить быстрое действие',
    editQuickActionDialog: 'Изменить быстрое действие',
    quickActionPlaceholder: 'Текст, который будет вставлен в активную консоль',
    accountLoading: 'Проверяем аккаунт Codex…',
    accountUnavailable: 'Профиль Codex недоступен',
    accountNotSignedIn: 'Codex не авторизован',
    apiKeyAccount: 'Аккаунт API key',
    subscriptionType: 'Тип подписки',
    resetCredits: 'Доступно дополнительных сбросов',
    refreshAccount: 'Обновить лимиты',
    limitsRemaining: 'Осталось',
    resetsAt: 'Обновится',
    noLimitData: 'Данные о лимитах недоступны.',
    localMarkdownInstruction: 'Выполни инструкции из локального Markdown-файла пользователя.',
    localMarkdownNoFs: 'Удалённый сервер не имеет доступа к локальной файловой системе. Используй только содержимое ниже.'
  },
  en: {
    navLabel: 'Codex CLI Launcher navigation',
    brandSubtitle: 'Codex CLI locally and on a VDS',
    projects: 'Projects',
    sessions: 'Sessions',
    addProject: 'Add project',
    deleteProject: 'Delete project',
    add: 'Add',
    projectLocation: 'Where to run Codex',
    projectRemote: 'On the VDS',
    projectLocal: 'On this computer',
    projectName: 'Project name',
    projectFolder: 'Project folder',
    selectLocalFolder: 'Select local folder',
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
    settings: 'Settings',
    launcherMode: 'Working mode',
    modeLocal: 'On this computer',
    modeVds: 'On a VDS over SSH',
    launcherModeHelp: 'Switching changes the project list and hides VDS-only sections.',
    customization: 'Customization',
    theme: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    accentColor: 'Accent color',
    syncAgents: 'Sync AGENTS.md',
    configureAgents: 'Configure AGENTS.md',
    updateApp: 'Update app',
    updates: 'Updates',
    checkUpdates: 'Check for updates',
    updateAvailable: 'A new version is available',
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
    rightPanelLabel: 'Updates, Markdown, and quick actions',
    serverStatus: 'Server status',
    localMd: 'Local MD',
    runMarkdown: 'Run Markdown',
    dropMarkdown: 'Drop .md here',
    quickActions: 'Quick actions',
    addQuickAction: 'Add quick action',
    quickPrompts: 'Prompts',
    quickCommands: 'Commands',
    noProjects: 'There are no projects in this mode yet. Add one with the ＋ button.',
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
    historyExported: 'exported to Markdown',
    exportSessionHistory: 'Export session history',
    exportSessionFailed: 'Could not export session history.',
    noData: 'No data.',
    noOutput: 'No output.',
    running: 'Running...',
    readOnlyRunning: 'Running read-only check...',
    diagSsh: 'VDS / SSH',
    diagRemoteInfo: 'VDS IP / host',
    diagCodexCommand: 'Codex CLI on VDS',
    diagVpnCommand: 'VPN / codex-vpn',
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
    addQuickActionDialog: 'Add quick action',
    editQuickActionDialog: 'Edit quick action',
    quickActionPlaceholder: 'Text that will be inserted into the active terminal',
    accountLoading: 'Checking Codex account…',
    accountUnavailable: 'Codex profile unavailable',
    accountNotSignedIn: 'Codex is not signed in',
    apiKeyAccount: 'API key account',
    subscriptionType: 'Subscription type',
    resetCredits: 'Extra resets available',
    refreshAccount: 'Refresh limits',
    limitsRemaining: 'Remaining',
    resetsAt: 'Resets',
    noLimitData: 'Limit data is unavailable.',
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
const quickActionsList = document.querySelector('#quickActionsList');
const statusCards = document.querySelector('#statusCards');
const startSessionButton = document.querySelector('#startSession');
const stopSessionButton = document.querySelector('#stopSession');
const restartSessionButton = document.querySelector('#restartSession');
const clearTerminalButton = document.querySelector('#clearTerminal');
const openExternalButton = document.querySelector('#openExternal');
const clearHistoryButton = document.querySelector('#clearHistory');
const launcherModeSelect = document.querySelector('#launcherMode');
const languageSelect = document.querySelector('#languageSelect');
const themeSelect = document.querySelector('#themeSelect');
const accentPicker = document.querySelector('#accentPicker');
const syncAgentInstructions = document.querySelector('#syncAgentInstructions');
const editAgentInstructionsButton = document.querySelector('#editAgentInstructions');
const checkUpdatesButton = document.querySelector('#checkUpdates');
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
const addQuickActionButton = document.querySelector('#addQuickAction');
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
const addProjectButton = document.querySelector('#addProject');
const projectDialog = document.querySelector('#projectDialog');
const projectForm = document.querySelector('#projectForm');
const projectLocation = document.querySelector('#projectLocation');
const projectName = document.querySelector('#projectName');
const projectRemoteFolder = document.querySelector('#projectRemoteFolder');
const remoteFolderField = document.querySelector('#remoteFolderField');
const localFolderField = document.querySelector('#localFolderField');
const selectLocalFolderButton = document.querySelector('#selectLocalFolder');
const projectLocalPath = document.querySelector('#projectLocalPath');
const projectError = document.querySelector('#projectError');
const cancelProjectButton = document.querySelector('#cancelProject');
const cancelProjectFooterButton = document.querySelector('#cancelProjectFooter');
const accountProfile = document.querySelector('#accountProfile');
const accountName = document.querySelector('#accountName');
const accountEmail = document.querySelector('#accountEmail');
const accountPlan = document.querySelector('#accountPlan');
const accountMode = document.querySelector('#accountMode');
const accountLimits = document.querySelector('#accountLimits');
const refreshAccountButton = document.querySelector('#refreshAccount');

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
let selectedLocalProjectPath = '';
let codexAccount = null;
let codexAccountLoadedAt = 0;

let currentSettings = {
  launcherMode: 'vds',
  language: 'ru',
  theme: 'dark',
  accentColor: 'blue',
  panels: {
    left: true,
    right: true
  },
  sections: {
    projects: true,
    sessions: true,
    appearance: true,
    status: true,
    updates: true,
    localMd: true,
    quickActions: true
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
const lastRunsByProject = {};

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
  renderProjectList();
  renderConfigSummary();
  renderStatusCards();
  renderQuickLists();
  renderCodexAccount(codexAccount);
  updateStatusText(currentUpdateState);
  updateControls();
}

function getProjects() {
  const projects = Array.isArray(appConfig.projects) ? appConfig.projects : [];
  const location = currentSettings.launcherMode === 'local' ? 'local' : 'remote';
  return projects.filter((project) => project.location === location);
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
    const connection = project?.location === 'local' ? t('projectLocal') : `ssh ${appConfig.sshAlias}`;
    buffersByProject[projectId] = project
      ? `${t('readyPrefix')} ${project.name} ${t('readySuffix')} ${connection} / ${project.location === 'local' ? 'codex' : appConfig.codexCommand}.\r\n`
      : '';
  }

  if (!Object.prototype.hasOwnProperty.call(lastRunsByProject, projectId)) {
    lastRunsByProject[projectId] = '';
  }
}

function syncProjectState() {
  getProjects().forEach((project) => ensureProjectState(project.id));

  if (!getProject(activeProjectId)) {
    activeProjectId = getProjects()[0]?.id || '';
    if (activeProjectId) ensureProjectState(activeProjectId);
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

function normalizeSectionSettings(value = {}) {
  return {
    projects: value.projects !== false,
    sessions: value.sessions !== false,
    appearance: value.appearance !== false,
    status: value.status !== false,
    updates: value.updates !== false,
    localMd: value.localMd !== false,
    quickActions: value.quickActions !== false
  };
}

function normalizeLauncherMode(value) {
  return value === 'local' ? 'local' : 'vds';
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

function applySectionVisibility() {
  document.querySelectorAll('[data-section]').forEach((section) => {
    section.open = currentSettings.sections[section.dataset.section] !== false;
  });
}

function applySettings(settings) {
  currentSettings = {
    launcherMode: normalizeLauncherMode(settings.launcherMode),
    language: normalizeLanguage(settings.language),
    theme: settings.theme === 'light' ? 'light' : 'dark',
    accentColor: normalizeAccentColor(settings.accentColor),
    panels: normalizePanelSettings(settings.panels),
    sections: normalizeSectionSettings(settings.sections),
    onboardingSeen: settings.onboardingSeen === true,
    syncAgentInstructions: settings.syncAgentInstructions !== false,
    agentInstructions: normalizeAgentInstructions(settings.agentInstructions),
    quickCommandSets: normalizeQuickItems(settings.quickCommandSets, DEFAULT_QUICK_COMMAND_SETS)
  };

  document.body.dataset.theme = currentSettings.theme;
  document.body.dataset.launcherMode = currentSettings.launcherMode;
  document.title = RELEASE_NAME;
  document.body.dataset.accent = currentSettings.accentColor;
  terminal.options.theme = buildTerminalTheme(currentSettings);
  appVersionLabel.textContent = DISPLAY_VERSION;
  launcherModeSelect.value = currentSettings.launcherMode;
  languageSelect.value = currentSettings.language;
  themeSelect.value = currentSettings.theme;
  syncAgentInstructions.checked = currentSettings.syncAgentInstructions;
  document.querySelectorAll('.accent-swatch').forEach((button) => {
    const active = button.dataset.accent === currentSettings.accentColor;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  applyPanelVisibility();
  applySectionVisibility();
  syncProjectState();
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
    available: currentUpdateState.availableVersion
      ? `${t('updateAvailable')}: v${currentUpdateState.availableVersion}`
      : t('updateAvailable'),
    downloading: `${t('updateDownloading')}${percent}`,
    downloaded: t('updateDownloaded'),
    latest: t('updateLatest'),
    unsupported: t('updateUnsupported'),
    error: t('updateError')
  }[status] || t('updateIdle');

  updateStatus.textContent = `${explicitMessage || fallback}${suffix}`;
  updateStatus.dataset.state = status;
  checkUpdatesButton.disabled = ['checking', 'downloading'].includes(status);
  updateAppButton.hidden = status !== 'available';
  updateAppButton.disabled = status !== 'available';
  if (status === 'available') {
    const version = currentUpdateState.availableVersion ? ` v${currentUpdateState.availableVersion}` : '';
    updateAppButton.textContent = currentUpdateState.updateMode === 'manual-download'
      ? (currentSettings.language === 'en' ? `Download${version} (.dmg)` : `Скачать${version} (.dmg)`)
      : (currentSettings.language === 'en' ? `Update to${version}` : `Обновить до${version}`);
  }
}

function accountModeLabel(mode) {
  return mode === 'vds' ? t('modeVds') : t('modeLocal');
}

function limitWindowLabel(limit) {
  const minutes = limit.windowDurationMins;
  if (!minutes) return limit.name;
  if (minutes % 10080 === 0) {
    const weeks = minutes / 10080;
    return currentSettings.language === 'en' ? `${weeks}-week limit` : `Лимит на ${weeks} нед.`;
  }
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return currentSettings.language === 'en' ? `${hours}-hour limit` : `Лимит на ${hours} ч.`;
  }
  return currentSettings.language === 'en' ? `${minutes}-minute limit` : `Лимит на ${minutes} мин.`;
}

function renderCodexAccount(profile) {
  accountLimits.innerHTML = '';
  if (!profile) {
    accountName.textContent = t('accountLoading');
    accountEmail.textContent = '';
    accountPlan.textContent = '—';
    accountMode.textContent = accountModeLabel(currentSettings.launcherMode);
    return;
  }
  if (!profile.ok) {
    accountName.textContent = t('accountUnavailable');
    accountEmail.textContent = '';
    accountPlan.textContent = '—';
    accountMode.textContent = accountModeLabel(profile.mode);
    const error = document.createElement('p');
    error.className = 'account-error';
    error.textContent = profile.error || t('noLimitData');
    accountLimits.appendChild(error);
    return;
  }
  if (!profile.signedIn) {
    accountName.textContent = t('accountNotSignedIn');
    accountEmail.textContent = '';
    accountPlan.textContent = '—';
    accountMode.textContent = accountModeLabel(profile.mode);
    return;
  }

  accountName.textContent = profile.username || t('apiKeyAccount');
  accountEmail.textContent = profile.email || t('apiKeyAccount');
  const plan = profile.planType ? profile.planType.charAt(0).toUpperCase() + profile.planType.slice(1) : '';
  accountPlan.textContent = plan || '—';
  accountMode.textContent = accountModeLabel(profile.mode);

  profile.limits.forEach((limit) => {
    const row = document.createElement('div');
    row.className = 'account-limit-row';
    const title = document.createElement('strong');
    title.textContent = limitWindowLabel(limit);
    const remaining = document.createElement('span');
    remaining.textContent = `${t('limitsRemaining')}: ${limit.remainingPercent}%`;
    const reset = document.createElement('small');
    reset.textContent = limit.resetsAt
      ? `${t('resetsAt')}: ${new Intl.DateTimeFormat(currentSettings.language, { dateStyle: 'short', timeStyle: 'short' }).format(limit.resetsAt * 1000)}`
      : `${t('resetsAt')}: —`;
    row.append(title, remaining, reset);
    accountLimits.appendChild(row);
  });

  if (profile.resetCredits !== null) {
    const resetCredits = document.createElement('p');
    resetCredits.className = 'account-error';
    resetCredits.textContent = `${t('resetCredits')}: ${profile.resetCredits}`;
    accountLimits.appendChild(resetCredits);
  }

  if (profile.limits.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'account-error';
    empty.textContent = profile.limitsError || t('noLimitData');
    accountLimits.appendChild(empty);
  }
}

async function refreshCodexAccount() {
  refreshAccountButton.disabled = true;
  codexAccount = null;
  renderCodexAccount(null);
  try {
    codexAccount = await api.loadCodexAccount(currentSettings.launcherMode);
  } catch (error) {
    codexAccount = { ok: false, mode: currentSettings.launcherMode, error: error.message || String(error) };
  }
  codexAccountLoadedAt = Date.now();
  refreshAccountButton.disabled = false;
  renderCodexAccount(codexAccount);
}

function setLauncherMode(mode) {
  const launcherMode = normalizeLauncherMode(mode);
  if (launcherMode === currentSettings.launcherMode) return;
  currentSettings = { ...currentSettings, launcherMode };
  applySettings(currentSettings);
  renderActiveBuffer();
  if (launcherMode === 'vds') renderSshSetupStatus();
  saveSettingsSoon();
  refreshCodexAccount();
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
    buffers: { ...buffersByProject },
    runs: { ...lastRunsByProject }
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

  Object.entries(history?.runs || {}).forEach(([projectId, value]) => {
    if (typeof value === 'string') {
      lastRunsByProject[projectId] = value;
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

function writeLocal(projectId, text, { sessionHistory = false } = {}) {
  ensureProjectState(projectId);
  buffersByProject[projectId] += text;
  if (sessionHistory) lastRunsByProject[projectId] += text;
  clampBuffer(projectId);
  if (lastRunsByProject[projectId].length > 500000) {
    lastRunsByProject[projectId] = lastRunsByProject[projectId].slice(-500000);
  }
  saveHistorySoon();

  if (projectId === activeProjectId) {
    terminal.write(text);
  }
}

function renderActiveBuffer() {
  if (!activeProjectId) {
    terminal.reset();
    terminal.write(`${t('noProjects')}\r\n`);
    fitAndResize();
    return;
  }

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

  if (getProjects().length === 0) {
    const empty = document.createElement('p');
    empty.className = 'config-help';
    empty.textContent = t('noProjects');
    projectList.appendChild(empty);
    return;
  }

  getProjects().forEach((project) => {
    ensureProjectState(project.id);

    const row = document.createElement('article');
    row.className = 'project-row';
    row.classList.toggle('custom', project.custom);
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
    remotePath.textContent = `${project.location === 'local' ? t('projectLocal') : 'VDS'} · ${project.path}`;
    text.append(name, remotePath);

    const startButton = document.createElement('button');
    startButton.type = 'button';
    startButton.className = 'icon-button project-start';
    startButton.title = `${t('launchProject')} ${project.name}`;
    startButton.setAttribute('aria-label', `${t('launchProject')} ${project.name}`);
    startButton.textContent = '▶';
    startButton.addEventListener('click', () => startSession(project.id));

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'icon-button project-delete';
    deleteButton.title = `${t('deleteProject')} ${project.name}`;
    deleteButton.setAttribute('aria-label', `${t('deleteProject')} ${project.name}`);
    deleteButton.textContent = '×';
    deleteButton.hidden = !project.custom;
    deleteButton.addEventListener('click', () => deleteProject(project));

    const state = document.createElement('span');
    state.className = 'project-state';
    state.dataset.stateTarget = project.id;
    state.textContent = statusText(sessionStatus(project.id));

    row.append(text, startButton, deleteButton, state);
    projectList.appendChild(row);

    const sessionEntry = document.createElement('div');
    sessionEntry.className = 'session-entry';

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'session-chip';
    chip.dataset.sessionTarget = project.id;
    chip.addEventListener('click', () => switchProject(project.id));

    const dot = document.createElement('span');
    dot.className = 'session-dot';
    dot.setAttribute('aria-hidden', 'true');

    chip.append(dot, document.createTextNode(project.name));

    const exportButton = document.createElement('button');
    exportButton.type = 'button';
    exportButton.className = 'icon-button session-export';
    exportButton.dataset.exportSession = project.id;
    exportButton.title = `${t('exportSessionHistory')}: ${project.name}`;
    exportButton.setAttribute('aria-label', `${t('exportSessionHistory')}: ${project.name}`);
    exportButton.textContent = '⇩';
    exportButton.disabled = !lastRunsByProject[project.id].trim();
    exportButton.addEventListener('click', () => exportSessionHistory(project));

    sessionEntry.append(chip, exportButton);
    sessionList.appendChild(sessionEntry);
  });
}

async function exportSessionHistory(project) {
  const transcript = lastRunsByProject[project.id] || '';
  if (!transcript.trim()) return;

  try {
    const result = await api.exportSessionHistory(project.id, transcript);
    if (result.ok) historyStatus.textContent = t('historyExported');
    else if (!result.canceled) window.alert(result.error || t('exportSessionFailed'));
  } catch (_error) {
    window.alert(t('exportSessionFailed'));
  }
}

async function deleteProject(project) {
  const message = currentSettings.language === 'en'
    ? `Remove "${project.name}" from Launcher? The project folder and its files will not be deleted.`
    : `Удалить «${project.name}» из Launcher? Папка проекта и файлы останутся на месте.`;
  if (!window.confirm(message)) return;

  try {
    const result = await api.deleteProject(project.id);
    if (!result.ok) throw new Error(result.error || 'Could not remove the project.');
    delete sessionsByProject[project.id];
    delete buffersByProject[project.id];
    delete lastRunsByProject[project.id];
    applyConfig(result.config);
    applyHistory(result.history, { emptyAllowed: true });
    renderActiveBuffer();
    updateControls();
  } catch (error) {
    writeLocal(activeProjectId, `\r\n[project] ${t('statusError')}: ${error.message || String(error)}\r\n`);
  }
}

function updateProjectLocationFields() {
  const local = projectLocation.value === 'local';
  remoteFolderField.hidden = local;
  localFolderField.hidden = !local;
  projectRemoteFolder.required = !local;
  if (local) projectError.textContent = '';
}

async function openProjectDialog() {
  projectForm.reset();
  projectError.textContent = '';
  projectLocation.value = currentSettings.launcherMode === 'local' ? 'local' : 'remote';
  selectedLocalProjectPath = '';
  projectLocalPath.textContent = '';
  projectRemoteFolder.replaceChildren(new Option(currentSettings.language === 'en' ? 'Loading folders…' : 'Загрузка папок…', ''));
  projectRemoteFolder.disabled = true;
  updateProjectLocationFields();
  if (!projectDialog.open) projectDialog.showModal();

  if (projectLocation.value === 'local') {
    selectLocalFolderButton.focus();
    return;
  }

  try {
    const result = await api.listRemoteProjectFolders();
    if (!result.ok) throw new Error(result.error || 'Could not list VDS folders.');
    projectRemoteFolder.replaceChildren(...result.folders.map((folder) => new Option(folder, folder)));
    projectRemoteFolder.disabled = result.folders.length === 0;
    if (result.folders.length === 0 && projectLocation.value === 'remote') {
      projectError.textContent = currentSettings.language === 'en'
        ? `No folders were found inside ${result.root || '/opt'}.`
        : `В ${result.root || '/opt'} не найдено доступных папок.`;
    }
    projectName.focus();
  } catch (error) {
    projectRemoteFolder.replaceChildren(new Option(currentSettings.language === 'en' ? 'Folders unavailable' : 'Папки недоступны', ''));
    if (projectLocation.value === 'remote') projectError.textContent = error.message || String(error);
  }
}

function closeProjectDialog() {
  projectForm.reset();
  selectedLocalProjectPath = '';
  projectDialog.close();
}

async function selectLocalProjectFolder() {
  const result = await api.selectLocalProjectFolder();
  if (result.ok) {
    selectedLocalProjectPath = result.path;
    projectLocalPath.textContent = result.path;
    projectError.textContent = '';
  }
}

async function saveProject(event) {
  event.preventDefault();
  const local = currentSettings.launcherMode === 'local';
  const folder = local ? selectedLocalProjectPath : projectRemoteFolder.value;
  projectError.textContent = '';

  if (!folder) {
    projectError.textContent = currentSettings.language === 'en' ? 'Select a project folder.' : 'Выберите папку проекта.';
    return;
  }

  try {
    const result = await api.addProject({
      name: projectName.value,
      path: folder,
      location: local ? 'local' : 'remote'
    });
    if (!result.ok) throw new Error(result.error || 'Could not add the project.');
    applyConfig(result.config);
    if (result.history) applyHistory(result.history, { emptyAllowed: true });
    activeProjectId = result.project.id;
    closeProjectDialog();
    renderActiveBuffer();
    updateControls();
  } catch (error) {
    projectError.textContent = error.message || String(error);
  }
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

function renderStatusCards() {
  statusCards.innerHTML = '';

  STATUS_CHECKS.forEach((check) => {
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
  });

  statusCards.querySelectorAll('[data-check]').forEach((button) => {
    button.addEventListener('click', () => runCheck(button.dataset.check));
  });
}

function updateControls() {
  const activeProject = getActiveProject();
  const hasSession = Boolean(currentSessionId());

  if (!activeProject) {
    activeTitle.textContent = t('projects');
    activePath.textContent = '—';
    activeSshAlias.textContent = currentSettings.launcherMode === 'local' ? t('projectLocal') : t('modeVds');
    activeCommand.textContent = 'codex';
    footerProject.textContent = '—';
    footerStatus.textContent = statusText('inactive');
    footerCommand.textContent = 'codex';
    startSessionButton.disabled = true;
    stopSessionButton.disabled = true;
    restartSessionButton.disabled = true;
    clearTerminalButton.disabled = true;
    openExternalButton.disabled = true;
    return;
  }

  activeTitle.textContent = activeProject.name;
  activePath.textContent = activeProject.path;
  activeSshAlias.textContent = activeProject.location === 'local'
    ? t('projectLocal')
    : `ssh ${appConfig.sshAlias || 'my-vds'}`;
  activeCommand.textContent = activeProject.location === 'local' ? 'codex' : appConfig.codexCommand;
  footerAlias.textContent = activeProject.location === 'local' ? 'local' : appConfig.sshAlias;
  footerCommand.textContent = activeProject.location === 'local' ? 'codex' : appConfig.codexCommand;
  footerProject.textContent = activeProject.name;
  footerStatus.textContent = statusText(sessionStatus(activeProject.id));
  startSessionButton.disabled = hasSession;
  stopSessionButton.disabled = !hasSession;
  restartSessionButton.disabled = false;
  clearTerminalButton.disabled = false;
  openExternalButton.disabled = false;

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

  document.querySelectorAll('[data-export-session]').forEach((button) => {
    button.disabled = !(lastRunsByProject[button.dataset.exportSession] || '').trim();
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
  const check = STATUS_CHECKS.find((item) => item.id === checkId);

  if (!check) {
    return;
  }

  setCheckState(checkId, 'loading', t('running'));

  try {
    const result = await api.runDiagnostic(checkId, activeProjectId);
    const output = formatResult(result);

    setCheckState(checkId, result.ok ? 'ok' : 'error', output);
  } catch (error) {
    const message = error.message || String(error);

    setCheckState(checkId, 'error', message);
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
  lastRunsByProject[projectId] = '';
  const connection = project.location === 'local'
    ? `${t('projectLocal')} / codex`
    : `ssh ${appConfig.sshAlias} / ${appConfig.codexCommand}`;
  writeLocal(projectId, `\r\n[session] ${t('startSessionLog')} ${project.name} through ${connection}...\r\n`, { sessionHistory: true });
  updateControls();

  const result = await api.terminalStart(projectId);

  if (!result.ok) {
    writeLocal(projectId, `[session] ${t('startFailed')}: ${result.error || t('unknownError')}\r\n`, { sessionHistory: true });
    updateControls();
    return;
  }

  sessionsByProject[projectId] = result.sessionId;
  targetBySession.set(result.sessionId, projectId);
  if (result.warning) writeLocal(projectId, `[session] ${result.warning}\r\n`, { sessionHistory: true });
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
  writeLocal(projectId, `\r\n[session] ${project.name} ${t('sessionStopped')}.\r\n`, { sessionHistory: true });
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

function renderQuickItems(container, entries) {
  container.innerHTML = '';

  entries.forEach(({ item, kind, index }) => {
    const row = document.createElement('div');
    row.className = 'quick-item-row';

    const mainButton = document.createElement('button');
    mainButton.type = 'button';
    mainButton.className = 'quick-main-button';
    mainButton.textContent = item.title;
    mainButton.title = item.title;
    mainButton.addEventListener('click', () => insertPrompt(item.text));

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
  const entries = [
    ...(appConfig.quickPrompts || []).map((item, index) => ({ item, kind: 'prompt', index })),
    ...currentSettings.quickCommandSets.map((item, index) => ({ item, kind: 'command', index }))
  ];
  renderQuickItems(quickActionsList, entries);
}

function openQuickItemEditor(kind = 'command', index = -1) {
  const isPrompt = kind === 'prompt';
  const source = isPrompt ? appConfig.quickPrompts || [] : currentSettings.quickCommandSets;
  const item = index >= 0 ? source[index] : null;
  quickItemEditor = { kind, index };
  quickItemDialogTitle.textContent = t(item ? 'editQuickActionDialog' : 'addQuickActionDialog');
  quickItemTitle.value = item?.title || '';
  quickItemText.value = item?.text || '';
  quickItemText.placeholder = t('quickActionPlaceholder');
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
      writeLocal(activeProjectId, `\r\n[quick actions] ${t('statusError')}: ${error.message || String(error)}\r\n`);
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
      writeLocal(activeProjectId, `\r\n[quick actions] ${t('statusError')}: ${error.message || String(error)}\r\n`);
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

async function installAvailableUpdate() {
  try {
    const result = await api.installUpdate();
    if (result?.state) updateStatusText(result.state);
    if (!result?.ok && result?.error) updateStatusText({ status: 'error', message: result.error });
  } catch (error) {
    updateStatusText({ status: 'error', message: error.message || String(error) });
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

  if (welcome) {
    const language = currentSettings.language === 'en' ? 'en' : 'ru';
    const changes = RELEASE_CHANGES[language].map((item) => `<li>${escapeHtml(item)}</li>`).join('');

    if (language === 'en') {
      return `
        <section class="guide-hero">
          <img src="./assets/app-icon.png" alt="">
          <div>
            <h3>Welcome to Codex CLI Launcher</h3>
            <p class="guide-version-line"><strong>Version:</strong> ${escapeHtml(DISPLAY_VERSION)}</p>
            <p>Choose one of two modes in Settings. You can switch at any time.</p>
          </div>
        </section>
        <section class="guide-grid mode-grid">
          <article><strong>On this computer</strong><span>Uses the Codex CLI installed locally. Add a project, choose its folder, and start the session.</span></article>
          <article><strong>On a VDS over SSH</strong><span>Uses your OpenSSH alias and the Codex CLI installed on the server. VDS configuration and status are shown only in this mode.</span></article>
        </section>
        <section class="release-highlights">
          <h3>What changed in Developer Beta 9</h3>
          <ul>${changes}</ul>
        </section>
        <ol class="guide-steps">
          <li><strong>Select the mode in Settings.</strong><span>Choose “On this computer” or “On a VDS over SSH”.</span></li>
          <li><strong>Add a project with ＋.</strong><span>The folder picker follows the selected mode.</span></li>
          <li><strong>Start Codex.</strong><span>Make sure <code>codex</code> is installed and you have signed in on the selected computer or VDS.</span></li>
        </ol>
      `;
    }

    return `
      <section class="guide-hero">
        <img src="./assets/app-icon.png" alt="">
        <div>
          <h3>Добро пожаловать в Codex CLI Launcher</h3>
          <p class="guide-version-line"><strong>Версия:</strong> ${escapeHtml(DISPLAY_VERSION)}</p>
          <p>Выберите один из двух режимов в «Настройках». Переключаться между ними можно в любое время.</p>
        </div>
      </section>
      <section class="guide-grid mode-grid">
        <article><strong>На этом компьютере</strong><span>Использует локально установленный Codex CLI. Добавьте проект, выберите его папку и запустите сессию.</span></article>
        <article><strong>На VDS через SSH</strong><span>Использует ваш OpenSSH alias и Codex CLI на сервере. Конфигурация и статус VDS видны только в этом режиме.</span></article>
      </section>
      <section class="release-highlights">
        <h3>Что изменилось в Developer Beta 9</h3>
        <ul>${changes}</ul>
      </section>
      <ol class="guide-steps">
        <li><strong>Выберите режим в «Настройках».</strong><span>«На этом компьютере» или «На VDS через SSH».</span></li>
        <li><strong>Добавьте проект кнопкой ＋.</strong><span>Выбор папки будет соответствовать текущему режиму.</span></li>
        <li><strong>Запустите Codex.</strong><span>Убедитесь, что команда <code>codex</code> установлена и авторизована на выбранном компьютере или VDS.</span></li>
      </ol>
    `;
  }

  if (currentSettings.language === 'en') {
    return `
      <section class="guide-hero">
        <img src="./assets/app-icon.png" alt="">
        <div>
          <h3>${welcome ? 'Welcome to the developer beta' : 'Connect your VDS'}</h3>
          <p class="guide-version-line"><strong>Version:</strong> ${escapeHtml(DISPLAY_VERSION)}</p>
          <p>Run the installed Codex CLI in a local project folder or connect to a VDS through your OpenSSH alias.</p>
        </div>
      </section>
      <section class="guide-grid">
        <article><strong>Left panel</strong><span>Projects, sessions, config, customization, AGENTS.md.</span></article>
        <article><strong>Center</strong><span>Embedded terminal and session controls.</span></article>
        <article><strong>Right panel</strong><span>Server status, Markdown instructions, quick prompts, and quick commands.</span></article>
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
        <p>Запускайте установленный Codex CLI в локальной папке проекта или подключайтесь к VDS через свой OpenSSH alias.</p>
      </div>
    </section>
      <section class="guide-grid">
        <article><strong>Левая панель</strong><span>Проекты, сессии, конфиг, кастомизация, AGENTS.md.</span></article>
        <article><strong>Центр</strong><span>Встроенный терминал и кнопки управления сессией.</span></article>
        <article><strong>Правая панель</strong><span>Статус сервера, Markdown-инструкции, быстрые промпты и команды.</span></article>
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
    ? (welcome ? 'Two modes and what is new' : 'VDS connection guide')
    : (welcome ? 'Два режима и что нового' : 'Инструкция подключения к VDS');
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
  renderStatusCards();
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

  writeLocal(projectId, data, { sessionHistory: true });
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
    `\r\n[session] ${t('sessionExited')} ${exitCode ?? t('unknown')}${signal ? `, ${t('signal')} ${signal}` : ''}.\r\n`,
    { sessionHistory: true }
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
addQuickActionButton.addEventListener('click', (event) => {
  event.stopPropagation();
  openQuickItemEditor('command');
});
addProjectButton.addEventListener('click', (event) => {
  event.stopPropagation();
  openProjectDialog();
});
projectLocation.addEventListener('change', updateProjectLocationFields);
selectLocalFolderButton.addEventListener('click', selectLocalProjectFolder);
projectForm.addEventListener('submit', saveProject);
cancelProjectButton.addEventListener('click', closeProjectDialog);
cancelProjectFooterButton.addEventListener('click', closeProjectDialog);
projectDialog.addEventListener('cancel', () => {
  selectedLocalProjectPath = '';
  projectForm.reset();
});
launcherModeSelect.addEventListener('change', () => {
  setLauncherMode(launcherModeSelect.value);
});
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
checkUpdatesButton.addEventListener('click', checkForAppUpdates);
updateAppButton.addEventListener('click', installAvailableUpdate);
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
refreshAccountButton.addEventListener('click', refreshCodexAccount);
accountProfile.addEventListener('toggle', () => {
  if (!accountProfile.open) return;
  window.requestAnimationFrame(() => accountProfile.scrollIntoView({ block: 'end' }));
  if (Date.now() - codexAccountLoadedAt > 300000) refreshCodexAccount();
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
document.querySelectorAll('[data-section]').forEach((section) => {
  section.addEventListener('toggle', () => {
    const key = section.dataset.section;
    if (currentSettings.sections[key] === section.open) return;
    currentSettings = {
      ...currentSettings,
      sections: { ...currentSettings.sections, [key]: section.open }
    };
    saveSettingsSoon();
  });
});
const terminalResizeObserver = new ResizeObserver(scheduleFit);
terminalResizeObserver.observe(terminalElement);
window.addEventListener('resize', scheduleFit);
window.addEventListener('beforeunload', () => {
  terminalResizeObserver.disconnect();
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

api.onUiCommand(({ command, mode }) => {
  const actions = {
    'show-welcome': () => openSetupGuide({ welcome: true }),
    'show-version-welcome': () => openSetupGuide({ welcome: true }),
    'show-setup-guide': () => openSetupGuide(),
    'open-config': openConfigFile,
    'reload-config': reloadConfig,
    'copy-ssh-config': copySshConfigExample,
    'add-project': openProjectDialog,
    'set-launcher-mode': () => setLauncherMode(mode),
    'run-markdown': selectAndRunMarkdownInstruction,
    'edit-agents': openAgentInstructionsEditor,
    'toggle-theme': () => {
      themeSelect.value = currentSettings.theme === 'light' ? 'dark' : 'light';
      themeSelect.dispatchEvent(new Event('change'));
    },
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
  refreshCodexAccount();
  try {
    updateStatusText(await api.getUpdateStatus());
  } catch (_error) {
    updateStatusText({ status: 'idle' });
  }
  updateControls();
  renderActiveBuffer();
  if (currentSettings.launcherMode === 'vds') await renderSshSetupStatus();
  if (!currentSettings.onboardingSeen) {
    window.setTimeout(() => openSetupGuide({ welcome: true }), 180);
  }
  window.setTimeout(fitAndResize, 100);
}

initialize();
