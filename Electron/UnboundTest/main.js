const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } = require('electron');
const { findSourceMap } = require('module');
const path = require('path')

let mainWindow;
let tray;

let isQuitting = false;
function createMainWindow(){
	mainWindow = new BrowserWindow({
		width: 800,
		height: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
			contextIsolation: false,

        },
		resizable: false,
	});
	Menu.setApplicationMenu(null);


	mainWindow.loadFile(path.join(__dirname, 'src/GUI/index.html'));
	mainWindow.webContents.openDevTools();

	mainWindow.on('minimize', function(event) {
		event.preventDefault();
		mainWindow.hide();
	});

	mainWindow.on('close', function (event) {
		if(!app.isQuitting) {
			event.preventDefault();
			mainWindow.hide();
		}
	});
}

function createTray(){
	const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'apple1.png'));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show App',
			click: function () {
				if (mainWindow){
				mainWindow.show();
				} else {
					createMainWindow();
				}
			}
		},
		{
			label: 'Quit',
			click: function () {
				if (mainWindow){
					app.isQuitting = true;
					app.quit();
				} else {
					createMainWindow();
				}
			}
		}
	])
	tray = new Tray(trayIcon);
	tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
	createMainWindow();
	createTray();
})


app.on('activate', function () {
	if (mainWindow == null) {
		createMainWindow();
	} else {
		mainWindow.show();
	}
})

ipcMain.on('minimize-window', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('close-window', () => {
    if (mainWindow) {
		mainWindow.hide();
    }
});

