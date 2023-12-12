const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
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
}

app.whenReady().then(() => {
    createMainWindow();
})

