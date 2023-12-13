const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const { findSourceMap } = require('module');
const path = require('path')

let mainWindow;
let tray;

let isQuitting = false;
function createMainWindow(){
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		resizable: false
	});


	mainWindow.loadFile('src/GUI/index.html')

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