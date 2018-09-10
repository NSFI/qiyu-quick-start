import React, { Component } from 'react';
import './App.scss';
import { ipcRenderer, remote } from 'electron';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

import { Modal, message } from 'antd';
import ProjectNav from './components/ProjectNav';
import ProjectPanel from './components/ProjectPanel';
import Projects from './Projects';
import util from './util/index';

const { dialog } = remote;

const serverAddressMap = {
	debug: 'http://59.111.48.68',
	test: 'http://106.2.44.35'
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentProjectIndex: 0,
			projects: Projects,
			settingModalVisible: false
		}
	}
	componentDidMount() {
		ipcRenderer.on('quit', this.onQuit);
	}
	onQuit = () => {
		this.killAll();
	}
	onBeforeUnload = (function() {
		let hasConfirm = false;
		return function(ev) {
			if(!hasConfirm) {
				ev.returnValue = false;
				Modal.confirm({
					title: '确定要退出吗？',
					onOk: () => {
						this.killAll();
						hasConfirm = true;
						// remote.getCurrentWindow().close();
					}
				})
			}
		} 
	})();
	onProjectChange = (index) => {
		this.setState({
			currentProjectIndex: index
		})
	}
	onProjectSwitch = (projectIndex, isOpen) => {
		const { projects } = this.state;
		const project = projects[projectIndex];
		const newProjects = [...projects];
		if (isOpen) {
			if(!project.basePath) {
				Modal.info({
					title: '请先设置项目路径',
					width: 200
				})
			}else {
				newProjects[projectIndex].isOpen = isOpen;
				this.setState({
					projects: newProjects
				})
				project.tasks.forEach((task, taskIndex) => {
					let cwd = path.join(project.basePath, task.rpath);
					let childProcess = child_process.exec(task.cmd, { cwd: cwd }, (err, stdout, stderr) => {
						if(err) {
							this.addLog(projectIndex, taskIndex, err.message);
						}
					});
					childProcess.stdout.on('data', (data) => {
						this.addLog(projectIndex, taskIndex, data);
					});
					childProcess.stderr.on('data', (data) => {
						this.addLog(projectIndex, taskIndex, data);
					});
					task.pid = childProcess.pid;
				})
			}
		} else {
			newProjects[projectIndex].isOpen = isOpen;
				this.setState({
					projects: newProjects
				})
			project.tasks.forEach((task, taskIndex) => {
				task && util.killProcess(task.pid);
				delete task.pid;
				this.addLog(projectIndex, taskIndex, '任务已关闭');
			})
		}
	}
	onSet = (projectId, values) => {
		const newProjects = [...this.state.projects];
		Object.entries(values).forEach(([key, value]) => {
			const project = newProjects[projectId];
			project[key] = value;
			if(key == 'envType' && value) {
				this.onEnvChange(projectId, value);
			}
		})
		this.setState({
			projects: newProjects
		})
	}
	onEnvChange(projectId, value) {
		const project = this.state.projects[projectId];
		const serverAddress = serverAddressMap[value];
		const configPath = path.join(project.basePath, project.neiPath, 'server.config.js');
		fs.readFile(configPath, 'utf8', (err, content) => {
			if (err) {
				message.error(err.message);
				return;
			}
			let result = content.replace(/http:\/\/(\d+\.){3}\d+/g, serverAddress);
			fs.writeFile(configPath, result, 'utf8');
		});
	}
	addLog(projectIndex, taskIndex, log) {
		const newProjects = [...this.state.projects];
		var logs = newProjects[projectIndex].tasks[taskIndex].logs;
		if(logs.length >= 100) {
			logs.shift();
		}
		logs.push({
			id: + new Date(),
			text: log
		});
		this.setState({
			projects: newProjects
		})
	}
	killAll() {
		this.state.projects.forEach((project) => {
			project.tasks.forEach((task) => {
				task.pid && util.killProcess(task.pid);
				delete task.pid;
			})
		})
	}
	render() {
		const { projects, currentProjectIndex } = this.state;
		const project = projects[currentProjectIndex];
		return (
			<div className="App">
				<header className="App-header">
				</header>
				<div className="App-main">
					<ProjectNav 
						projects={projects} 
						current={currentProjectIndex} 
						onChange={this.onProjectChange} 
						onProjectSwitch={this.onProjectSwitch}
						onSet={this.onSet}
					></ProjectNav>
					<ProjectPanel 
						project={project}
					></ProjectPanel>
				</div>
			</div>
		);
	}
}

export default App;
