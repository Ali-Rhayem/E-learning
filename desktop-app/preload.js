const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    uploadFile: (filePath) => ipcRenderer.invoke('upload-file', filePath),
});
