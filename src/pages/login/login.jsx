import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './login.less'
import logo from './images/logo192.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault()  //阻止事件的默认行为

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values
                const result = await reqLogin(username, password)
                console.log('请求成功:',result)
                if (result.sucess===true) {
                    message.success('登陆成功')
                    const user = result.data
                    memoryUtils.user = user
                    storageUtils.saveUser(user)
                    this.props.history.replace('/')

                } else {
                    message.error(result.error)
                }

            } else {
                console.log('校验失败！')
            }
        });

        // const form = this.props.form
        // const values = form.getFieldsValue()
    }


    render() {

        const user = memoryUtils.user
        if(user && user.nickname) {
            return <Redirect to='/' />
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace: true, message: '请输入用户名!' },
                                    { min: 4, message: '用户名至少4位!' },
                                    { max: 12, message: '用户名最多12位!' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
                                ],
                            })(
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin