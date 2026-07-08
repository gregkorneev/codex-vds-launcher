const { clipboard, contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('codexVdsLauncher', {
  loadConfig: () => ipcRenderer.invoke('app:config'),
  openConfigFile: () => ipcRenderer.invoke('config:openFile'),
  reloadConfig: () => ipcRenderer.invoke('config:reload'),
  getSshConfigExample: () => ipcRenderer.invoke('config:sshExample'),
  saveQuickPrompts: (quickPrompts) => ipcRenderer.invoke('config:saveQuickPrompts', quickPrompts),
  getSshSetupStatus: () => ipcRenderer.invoke('ssh:setupStatus'),
  runDiagnostic: (checkId, projectId) => ipcRenderer.invoke('diagnostic:run', checkId, projectId),
  terminalStart: (projectId) => ipcRenderer.invoke('terminal:start', projectId),
  terminalWrite: (sessionId, data) => ipcRenderer.invoke('terminal:write', sessionId, data),
  terminalResize: (sessionId, cols, rows) => ipcRenderer.invoke('terminal:resize', sessionId, cols, rows),
  terminalStop: (sessionId) => ipcRenderer.invoke('terminal:stop', sessionId),
  terminalClear: (sessionId) => ipcRenderer.invoke('terminal:clear', sessionId),
  terminalOpenExternal: (projectId) => ipcRenderer.invoke('terminal:openExternal', projectId),
  readClipboardText: () => clipboard.readText(),
  writeClipboardText: (text) => clipboard.writeText(String(text || '')),
  loadHistory: () => ipcRenderer.invoke('history:load'),
  saveHistory: (history) => ipcRenderer.invoke('history:save', history),
  clearHistory: () => ipcRenderer.invoke('history:clear'),
  loadSettings: () => ipcRenderer.invoke('settings:load'),
  saveSettings: (settings) => ipcRenderer.invoke('settings:save', settings),
  defaultAgentInstructions: () => ipcRenderer.invoke('settings:defaultAgentInstructions'),
  selectMarkdownInstructionFile: () => ipcRenderer.invoke('markdown:selectInstructionFile'),
  readMarkdownInstructionFile: (filePath) => ipcRenderer.invoke('markdown:readInstructionFile', filePath),
  getUpdateStatus: () => ipcRenderer.invoke('updates:status'),
  checkForUpdates: () => ipcRenderer.invoke('updates:check'),
  getPathForFile: (file) => webUtils.getPathForFile(file),
  onTerminalData: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('terminal:data', listener);
    return () => ipcRenderer.removeListener('terminal:data', listener);
  },
  onTerminalExit: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('terminal:exit', listener);
    return () => ipcRenderer.removeListener('terminal:exit', listener);
  },
  onHistoryCleared: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('history:cleared', listener);
    return () => ipcRenderer.removeListener('history:cleared', listener);
  },
  onConfigChanged: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('config:changed', listener);
    return () => ipcRenderer.removeListener('config:changed', listener);
  },
  onUiCommand: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('ui:command', listener);
    return () => ipcRenderer.removeListener('ui:command', listener);
  },
  onUpdateStatus: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('updates:status', listener);
    return () => ipcRenderer.removeListener('updates:status', listener);
  }
});
