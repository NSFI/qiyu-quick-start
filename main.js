// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow, dialog } = require('electron');
const fs = require('fs');
const url = require('url');
const path = require('path');
const child_process = require('child_process');
const pkg = require('./package.json') // 引用package.json 

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
// project

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onReady);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

/* app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
}) */

function onReady() {
	createWindow();
	initEvent();
}

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 600, height: 600 })

	//判断是否是开发模式 
	if (pkg.DEV) {
		mainWindow.loadURL("http://localhost:3000/")
	} else {
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, './build/index.html'),
			protocol: 'file:',
			slashes: true
		}))
	}

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()


	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	})
}

function initEvent() {
	ipcMain.on('selectPath', (event, arg) => {
		dialog.showOpenDialog({
			properties: ['openDirectory']
		}, (files) => {
			if(!files) return;
			event.sender.send('selectPath', {
				id: arg.id,
				path: files[0]
			})
		})
	})
}

