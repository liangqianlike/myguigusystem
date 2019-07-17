import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
// import 

import logo from '../../asstes/images/logo.png';
import './index.less';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

class Leftnav extends Component {

    getMenuNodes1 = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                );
            } else {
                //判断当前的item的key是否是我需要的openKey
                //获取当前的请求路由
                const cItem = item.children.find(cItem => cItem.key === path);
                if(cItem){
                    this.openkey = item.key;
                }
                
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes1(item.children)}
                    </SubMenu>
                );
            }
            return pre;
        }, []);

    }

    // getMenuNodes = (menuList) => {
    //     return menuList.map((item) => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         } 
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                         <span>
    //                             <Icon type={item.icon} />
    //                             <span>{item.title}</span>
    //                         </span>
    //                     }
    //                 >
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             );

    //     });

    // }

    render() {
        const menuNodes = this.getMenuNodes1(menuList);
        //得到当前请求的路由路径
        const selectKey = this.props.location.pathname;
        console.log(menuNodes);
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo" />
                    <h2>雨声管理</h2>
                </Link>
                <Menu
                    defaultSelectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openkey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        menuNodes
                    }
                    {/* <Menu.Item key="/home">
                        <Icon type="home" />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>Navigation One</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}



export default withRouter(Leftnav);