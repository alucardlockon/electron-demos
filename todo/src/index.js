const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (isInit=false) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      // 默认，启用上下文隔离
      contextIsolation: true,
      // 默认，不在页面中使用node
      nodeIntegration: false,
      // 预加载脚本
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  if (isInit) {
      ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
      })

      ipcMain.handle('dark-mode:shouldUseDarkColors', () => {
        return nativeTheme.shouldUseDarkColors
      })
// 设置定时通知
  ipcMain.handle('notification:setAll', (_, tasks) => {
    // 清除原有设置通知
    jobs.forEach(job => job?.cancel())
    jobs = []
    if (tasks && tasks.length > 0) {
      tasks.forEach(task => {
        const date = new Date()
        date.setHours(task.time.split(':')[0])
        date.setMinutes(task.time.split(':')[1])
        date.setSeconds(0)
        jobs.push(schedule.scheduleJob(date, () => {
          new Notification({ title: task.title, body: '已经到时间了' }).show()
        }));
      });
    }
  })
    }

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>createWindow(true));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
