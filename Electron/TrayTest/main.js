const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray;

app.isQuiting = false; // Initialize app.isQuiting

function createTray() {
    const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'apple1.png'));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: function () {
                if (mainWindow) {
                    mainWindow.show();
                } else {
                    createMainWindow(); // Create mainWindow if not already created
                }
            }
        },
        {
            label: 'Quit',
            click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray = new Tray(trayIon);
    tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
    createMainWindow(); // Ensure createMainWindow is called
    createTray();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    } else {
        mainWindow.show();
    }
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });
}
