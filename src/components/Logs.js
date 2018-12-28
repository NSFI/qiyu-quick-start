import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from 'antd';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import '../../node_modules/xterm/dist/xterm.css';

Terminal.applyAddon(fit);

class Logs extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        taskIndex: PropTypes.string.isRequired,
        logs: PropTypes.array
    }

    static defaultProps = {
        logs: []
    }

    constructor(props) {
        super(props);
        this.nlog = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', _.debounce(this.onResize, 200));
        this.term = new Terminal({
            rendererType: 'dom'
        });
        this.term.open(ReactDOM.findDOMNode(this.nlog.current));
        this.term.fit();
        const { logs } = this.props;
        this.refresh(logs);
    }
    
    componentWillReceiveProps(nextProps) {
        const { projectId:nextProjectId, taskIndex:nextTaskIndex, logs:nextLogs } = nextProps;
        const { projectId, taskIndex, logs } = this.props;
        if(nextProjectId != projectId || nextTaskIndex != taskIndex) {
            this.refresh(nextLogs);
        }else if(nextLogs.length !== logs.length && nextLogs.length) {
            this.add(nextLogs[nextLogs.length-1])
        }
    }

    onResize = () => {
        this.term && this.term.fit();
        this.refresh(this.props.logs);
    }
    
    refresh(logs) {
        this.term.clear();
        logs.forEach((log) => {
            var text = log.text.replace(/\n/g, '\r\n');
            this.term.writeln(text);
        })
    }

    add(log) {
        var text = log.text.replace(/\n/g, '\r\n');
        this.term.writeln(text);
        this.term.scrollToBottom();
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.logs.length ?
                    <div className="m-empty">
                        <Icon type="smile" theme="twoTone" />
                    </div>
                    :null
                }
                <div className="logs" ref={this.nlog}>
                </div>
            </React.Fragment>
        )
    }
}

export default Logs;