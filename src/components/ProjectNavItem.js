import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Switch } from 'antd';
import SettingModal from './SettingModal';

class ProjectNavItem extends Component {
    static propTypes = {
        project: PropTypes.object.isRequired,
        onProjectSwitch: PropTypes.func.isRequired,
        onSet: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            settingModalVisible: false
        }
    }
    componentDidMount() {
        
    } 
    onProjectSwitch = (ev) => {
        ev.stopPropagation();
        this.props.onProjectSwitch(ev);
    }
    set = (ev) => {
        ev.stopPropagation();
        this.setState({
            settingModalVisible: true
        })
    }
    onSetOk = (ev) => {
        const form = this.settingFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.onSet(values);
            this.setState({
                settingModalVisible: false
            });
        });
    }
    onSetCancel = () => {
        this.setState({
            settingModalVisible: false
        })
    }
    render() {
        const { project } = this.props;
        return (
            <div className="project-nav-item">
                <label>{project.name}</label>
                <Switch size="small" checked={project.isOpen} onChange={this.onProjectSwitch} />
                <Icon type="setting" onClick={this.set}/>
                <SettingModal
                    wrappedComponentRef={(formRef) => {
                        this.settingFormRef = formRef;
                    }}
                    visible={this.state.settingModalVisible}
                    project={project}
                    onOk={this.onSetOk}
                    onCancel={this.onSetCancel}>
                </SettingModal>
            </div>
        )
    }
}

export default ProjectNavItem;