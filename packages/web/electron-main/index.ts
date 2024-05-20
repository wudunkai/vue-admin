import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import setTray from './setTray'

// Electron没有提供app.isQuiting这样的属性，我们需要自定义一个全局变量来模拟这个属性
let isQuiting = false

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    icon: './public/logo.png',
    frame: false,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, './preload.js') // 需要引用js文件
    }
  })

  // 如果打包了，渲染index.html
  if (process.env.NODE_ENV !== 'development') {
    win.loadFile(path.join(__dirname, './index.html'))
    win.webContents.openDevTools()
  } else {
    let url = 'http://localhost' // 本地启动的vue项目路径。注意：vite版本3以上使用的端口5173；版本2用的是3000
    win.loadURL(url)
    win.webContents.openDevTools()
  }
  // 接收最小化命令
  ipcMain.on('window-min', function () {
    win.minimize()
  })
  //接收最大化命令
  ipcMain.on('window-max', function () {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })
  //接收关闭命令
  ipcMain.on('window-close', function (event) {
    if (!isQuiting) {
      event.preventDefault()
      win.hide()
    }
  })
  setTray(app, win)
}

app.whenReady().then(() => {
  createWindow() // 创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 监听before-quit事件，在退出前设置isQuiting为true
app.on('before-quit', () => {
  isQuiting = true
})

// 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  // 在所有窗口关闭后，我们可以安全地设置isQuiting为false，因为我们知道app不会再次尝试退出
  isQuiting = false
})
