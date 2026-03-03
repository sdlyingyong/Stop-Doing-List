const { contextBridge, ipcRenderer } = require('electron');

// 暴露受保护的方法给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 文件操作
  importFile: () => ipcRenderer.invoke('import-file'),
  exportFile: (content, filename) => ipcRenderer.invoke('export-file', content, filename),
  
  // 事件监听
  onImportData: (callback) => ipcRenderer.on('import-data', callback),
  onExportData: (callback) => ipcRenderer.on('export-data', callback),
  
  // 移除监听器
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});