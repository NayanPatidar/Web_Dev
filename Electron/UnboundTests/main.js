const { log } = require('console');
const { app, BrowserWindow, Menu , Tray } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        resizable: false
    });
    Menu.setApplicationMenu(null);
    mainWindow.loadFile(path.join(__dirname, "./src/GUI/index.html"));

    mainWindow.on( 'close' ,(e) => {
        e.preventDefault();
        mainWindow.hide();
        console.log("Not closing");

    });
}

app.whenReady().then(() => {
    createMainWindow();
    tray = new Tray(path.join(__dirname, 'Icon.png'));

    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
});


