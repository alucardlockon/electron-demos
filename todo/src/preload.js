const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  shouldUseDarkColors: () => ipcRenderer.invoke('dark-mode:shouldUseDarkColors')
})

contextBridge.exposeInMainWorld('notification', {
  setAll: (tasks) => ipcRenderer.invoke('notification:setAll', tasks),
})