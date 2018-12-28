import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import Logs from './Logs';

class projectPanel extends Component {
    static propTypes = {
        project: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTaskIndex: '0'
        }
    }
    onTaskChange = (ev) => {
        this.setState({
            currentTaskIndex: ev.key
        })
    } 
    onSet = (ev) => {

    }
    render() {
        const { tasks, id:projectId } = this.props.project;
        const { currentTaskIndex } = this.state;
        return (
            <div className="project-panel">
                <div className="task-nav">
                    <Menu
                        onClick={this.onTaskChange}
                        selectedKeys={[currentTaskIndex.toString()]}
                        mode="horizontal"
                    >
                        {
                            tasks.map((task, index) => {
                                return (
                                    <Menu.Item key={index.toString()}>
                                        <label>{task.name}</label>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </div>
                <div className="log-area">
                    <Logs
                        projectId={projectId}
                        taskIndex={currentTaskIndex}
                        logs={tasks[currentTaskIndex].logs}
                    ></Logs>
                </div>
            </div>
        )
    }
}

export default projectPanel;