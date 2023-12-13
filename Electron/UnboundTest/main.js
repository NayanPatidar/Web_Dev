const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path')

let mainWindow;
let tray;

function createTray(){
	const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'apple1.png'));
}
