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

    app.on('before-quit', function(event) {
        event.preventDefault();
        mainWindow.hide()
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

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    } else {
        mainWindow.show();
    }
});
