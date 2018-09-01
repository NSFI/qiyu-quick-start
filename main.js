// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow, dialog, Menu, Tray } = require('electron');
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
	/* mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	}) */

	//系统托盘右键菜单
	var trayMenuTemplate = [
		{
			label: '设置',
			click: function () { } //打开相应页面
		},
		{
			label: '帮助',
			click: function () { }
		},
		{
			label: '关于',
			click: function () { }
		},
		{
			label: '退出',
			click: function () {
				app.quit();
			}
		}
	];


	

	const appTray = new Tray(path.join(__dirname, 'app.ico'));//app.ico是app目录下的ico文件

	//图标的上下文菜单
	const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

    //设置此托盘图标的悬停提示内容
	appTray.setToolTip('我的托盘图标');
	//设置此图标的上下文菜单
	appTray.setContextMenu(contextMenu);
	//单击右下角小图标显示应用
	appTray.on('click', function () {
		mainWindow.show();
	})

	mainWindow.on('close', (e) => {
		//回收BrowserWindow对象
		if (mainWindow.isMinimized()) {
			mainWindow = null;
		} else {
			e.preventDefault();
			mainWindow.minimize();
		}
	});

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

