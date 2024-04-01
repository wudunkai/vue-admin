"use strict";
const electron = require("electron");
const path = require("path");
const createWindow = () => {
  const win = new electron.BrowserWindow({
    width: 1e3,
    height: 800,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      // 是否开启隔离上下文
      nodeIntegration: true,
      // 渲染进程使用Node API
      preload: path.join(__dirname, "./preload.js")
      // 需要引用js文件
    }
  });
  if (process.env.NODE_ENV !== "development") {
    win.loadFile(path.join(__dirname, "./index.html"));
    win.webContents.openDevTools();
  } else {
    let url = "http://localhost";
    win.loadURL(url);
    win.webContents.openDevTools();
  }
  electron.ipcMain.on("window-min", function() {
    win.minimize();
  });
  electron.ipcMain.on("window-max", function() {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  electron.ipcMain.on("window-close", function() {
    win.close();
  });
};
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
