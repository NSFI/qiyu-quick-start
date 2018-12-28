import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import ProjectNavItem from './ProjectNavItem';

class ProjectNav extends Component {
    static propTypes = {
        projects: PropTypes.array.isRequired,
        current: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onProjectSwitch: PropTypes.func.isRequired,
        onSet: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

    }
    handleClick = (ev) => {
        // 校验target是否在组件内部
        let body = findDOMNode(this);
        if(!body.contains(ev.domEvent.target)) return;
        this.props.onChange(ev.key);
    }
    render() {
        const { projects } = this.props;
        return (
            <div className="project-nav">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.current.toString()]}
                >
                {
                    projects.map((project, index) => {
                        return (
                            <Menu.Item key={index.toString()}>
                                <ProjectNavItem 
                                    project={project} 
                                    onProjectSwitch={this.props.onProjectSwitch.bind(this, index)}
                                    onSet={this.props.onSet.bind(this, index)}
                                />
                            </Menu.Item>
                        )
                    })
                }
                </Menu>
            </div>
        )
    }
}

export default ProjectNav;