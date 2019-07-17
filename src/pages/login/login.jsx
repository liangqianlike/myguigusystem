import React, { Component } from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom';

import logo from '../../asstes/images/logo.png';
import './login.less';
import { reqLogin } from '../../api/index';
import storageUtils from '../../utils/storageUtils';

const Item = Form.Item;

class Login extends Component {
       handleSubmit = e =>{
            //阻止事件的默认行为：阻止表单的提交
            e.preventDefault();

            //取出输入的相关的数据-------------测试（查看数据有没有出来）
            //  const form = this.props.form;
            //  const values = form.getFieldsValue();
            //  const username = form.getFieldValue('username');
            //  const password = form.getFieldValue('password');
            //  console.log(values, username, password);
            //  alert('发送的ajax请求');
            this.props.form.validateFields(async (err, {username,password}) => {
                // console.log(username,password)
                if (!err) {
                    
                    const result = await reqLogin(username,password);
                    // console.log(result.data ,username,password);
                    //登录成功
                    if (result.status === 0){
                        //将data存储到浏览器中
                        const user = result.data;
                        // localStorage.setItem('user_key',JSON.stringify(user));
                        storageUtils.saveUser(user);
                        message.success('登录成功！！！');
                        //跳转到管理界面
                        this.props.history.replace('/');
                    } else {
                    //登录失败
                        message.error(result.msg);
                    }


                }
            });
        }
        validatePwd = (rule, value, callback) => {
            value = value.trim();
            if(!value){
                callback('密码必须输入！！！');
            }else if(value.length <= 4){
                callback('密码必须大于等于4位');
            }else if(value.length >= 12){
                callback('密码必须小于等于12为');
            }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                callback('密码必须是英文，数字，或下划线的组合！！！ ');
            }else {
                //进入此判断则输入合法，验证通过
                callback();   
            }
        }

    render() {
        //读取保存的user，读取，无则跳转到管理界面
        const user = storageUtils.getUser();
        if(user._id){
            //自动跳转到指定页面
            return <Redirect to="/" />
        }


        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <section className='login-content'>
                    <h1>用户登陆</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username',{
                                    // 1). 必须输入
                                    // 2). 必须大于等于4位
                                    // 3). 必须小于等于12位
                                    // 4). 必须
                                    initialValue: '',      //设置默认值
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必填！！！' },
                                        { min: 4, message: '用户名必须大于等于四位'},
                                        { max: 12, message: '密码必须小于等于12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字，或下划线的组合！！！ '}
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"/>
                                )
        
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password',{
                                    initialValue: '',      //设置默认值
                                    rules:[{
                                        validator: this.validatePwd
                                    }]
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password" placeholder="密码"/>
                                )
        
                            }
                        </Item>
                        <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                        </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrapperForm = Form.create()(Login);

export default WrapperForm;       //<Form(Login)>



  /* 
用户名/密码的合法性要求:
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须
  
  */
