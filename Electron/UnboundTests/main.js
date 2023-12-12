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

    mainWindow.on('close', function(event) {
        event.preventDefault();
        mainWindow.hide();
    });

    tray = new Tray('Icon.png');

}

app.whenReady().then(() => {
    createMainWindow();
    // createTray();
});

function createTray() {
