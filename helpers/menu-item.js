const {app, Menu} = require('electron');
const isWindows = process.platform === 'win32';
const {showMessage,showSaveDialog, showOpenDialog} = require('./dialogs');

module.exports = {
    setMenu
};


function setMenu(mainWindow) {
    const template = [
        {
            label: isWindows ? 'File' : app.getName(),
            submenu: [
                {
                    label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
                    acceleration: isWindows ? 'Alt +F4' : 'CmdOrCtrl+Q',
                    click(){
                        showMessage(mainWindow);
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {role: 'undo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'selectall'}
            ]
        },
        {
            label:'Save/Open',
            submenu: [
                {
                    label: 'Save',
                    acceleration: isWindows ? 'Ctrl+S' : 'CmdOrCtrl+S',
                    click(){
                        showSaveDialog(mainWindow)
                    }
                },
                {
                    label: 'Open',
                    acceleration: isWindows ? 'Ctrl+O' : 'CmdOrCtrl+O',
                    click(){
                        showOpenDialog(mainWindow)
                    }
                }
            ]
        },
        {
            label: 'Dev Tool',
            click(){
                mainWindow.webContents.openDevTools();
            }
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

