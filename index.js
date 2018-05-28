const {app , BrowserWindow ,ipcMain, globalShortcut} = require('electron');
const path = require('path');
const {setMenu} = require('./helpers/menu-item');
const windows = [];

function createBrowserWindow(browserWindowOpts){
    let win = new BrowserWindow(Object.assign({
        width: 400,
        height: 400
    },browserWindowOpts));

    windows.push(win);
    win.loadURL(path.join('file://',__dirname,'index1.html'));
     win.on('close',() => {
         windows.splice(windows.indexOf(win) , 1);
     })
}


app.on('ready' ,() => {
    mainWindow = new BrowserWindow({
        show:false
    });
    mainWindow.loadURL(path.join('file://',__dirname,'index.html'))
    mainWindow.on('ready-to-show' ,() => {
        mainWindow.show();
    });

    setMenu(mainWindow);

    globalShortcut.register('Ctrl+Shift+I', () => {
        mainWindow.webContents.openDevTools();
    });

    ipcMain.on('create-window',(event , props) => createBrowserWindow(props))
});