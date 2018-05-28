const {app, dialog} = require('electron');
const fs = require('fs');
const path = require('path');

function showMessage(browserWindow) {
    dialog.showMessageBox(browserWindow, {
        type: 'info',
        message: 'Do you want to leave this app?',
        buttons: ['Yes', 'No'],
        defaultId: 0,
    }, (clickedIndex) => {
        clickedIndex === 0 ? app.quit() : null
    })

}

function showSaveDialog(browserWindow) {
    dialog.showSaveDialog(browserWindow, {
        defaultPath: path.join(app.getPath('downloads'), 'memory-info.txt')
    }, (filename) => {
        if (filename) {
            console.log(filename)
            const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
            fs.writeFile(filename, memInfo, 'utf8', (err) => {
                if (err) {
                    dialog.showErrorBox('Save failed.', err.message);
                }
            })
        }
    })
}

function showOpenDialog(browserWindow) {
    dialog.showOpenDialog(browserWindow, {
            defaultPath: app.getPath('downloads'),
            filters: [
                {name: 'Text Files', extensions: ['txt']}
            ]
        }, (filePaths => {
            if (filePaths) {
                console.log(filePaths, fs.readFileSync(filePaths[0], 'utf8'))
            }
        })
    )
}

module.exports = {showMessage, showSaveDialog, showOpenDialog};