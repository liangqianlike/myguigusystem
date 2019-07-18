import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from '../../compoents/header';
import LeftNav from '../../compoents/left-nav';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';




const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
  render() {
    //读取保存的user，有则读取，无则显示登录界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
    // const user = storageUtils.getUser();
    const user = memoryUtils.user;
    
    if (!user._id) {
      //用于事件函数中进行路由跳转
      // this.props.history.replace('/loogin');
      //自动跳转到指定页面
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{background: 'deepskyblue',margin: 20}}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: 'rgba(0,0,0,0.5)'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}