const {ipcRenderer} = require('electron');
const {remote} = require('electron');

const currentWindow = remote.getCurrentWindow();

document.querySelector('#new-window').addEventListener('click', () => {
   ipcRenderer.send('create-window',{
       x: 0 ,
       y: 0
   });
});

document.querySelector('#renderer-process').addEventListener('click' , () =>{
   const win = new remote.BrowserWindow({
       height:800,
       width:800
   });
    win.loadURL(path.join('file://',__dirname,'index1.html'));
});

function onBlur(){
    document.body.style = 'opacity : 0.2;';
}
function onFocus(){
    document.body.style = 'opacity : 1;';
}


currentWindow.on('blur' ,onBlur);
currentWindow.on('focus' ,onFocus);

window.addEventListener('beforeunload',() => {
    currentWindow.removeListener('blur' ,onBlur);
    currentWindow.removeListener('focus' ,onFocus);
});