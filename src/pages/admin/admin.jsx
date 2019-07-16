import React, { Component } from 'react'
import { Layout } from 'antd';

import Header from '../../compoents/header';
import LeftNav from '../../compoents/left-nav';

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
    render() {
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
