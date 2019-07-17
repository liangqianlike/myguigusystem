import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Layout } from 'antd';

import Header from '../../compoents/header';
import LeftNav from '../../compoents/left-nav';
import storageUtils from '../../utils/storageUtils';

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
    render() {
      //读取保存的user，有则读取，无则显示登录界面
      // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
      const user = storageUtils.getUser();
      if(!user._id){
        //用于事件函数中进行路由跳转
        // this.props.history.replace('/loogin');
        //自动跳转到指定页面
        return <Redirect to="/login" />
      }
        return (
        <Layout style={{height: '100%'}}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header /> 
              <Content>Content</Content>
            <Footer>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
          </Layout>
        </Layout>
        )
    }
}
