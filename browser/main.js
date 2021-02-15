const {app, BrowserWindow} = require('electron')
const path = require('path')

const url = require('url')

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../dist/index.html'),
        protocol: 'file:',
        slashes: true
    })

    mainWindow.loadURL(startUrl)
    //mainWindow.webContents.openDevTools()

    mainWindow.on('close', function() {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
