import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Icon } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const SettingModal = Form.create()(
    class extends Component {
        componentDidMount() {
            const { form, project } = this.props;
            ipcRenderer.on('selectPath', (event, { id, path }) => {
                if(id != project.id) return;
                form.setFieldsValue({
                    basePath: path
                })
                window.localStorage.setItem('project-path-' + id, path)
            });
        }
        selectPath = (ev) => {
            const { project } = this.props;
            ipcRenderer.send('selectPath', {
                id: project.id
            });
        }
        render() {
            const { visible, onCancel, onOk, form, project } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="设置"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onOk}
                >
                    <Form layout="vertical">
                        <FormItem label="项目路径">
                            {getFieldDecorator('basePath', {
                                rules: [{ required: true, message: 'Please input or select the path!' }],
                                initialValue: project.basePath
                            })(
                                <Input 
                                    addonAfter={<Icon type="folder" onClick={this.selectPath} />}
                                />
                            )}
                        </FormItem>
                        
                        <FormItem label="环境类型">
                            {getFieldDecorator('envType', {
        
                            })(
                                <RadioGroup>
                                    <Radio value="debug">debug</Radio>
                                    <Radio value="test">test</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

export default SettingModal;