import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';


class projectPanel extends Component {
    static propTypes = {
        project: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTaskIndex: 0
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
        const { tasks } = this.props.project;
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
                    {tasks[currentTaskIndex].logs.map((log) => {
                        return (
                            <p key={log.id} className="log-item">{log.text}</p>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default projectPanel;