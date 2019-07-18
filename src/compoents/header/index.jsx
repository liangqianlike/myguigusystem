import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Modal, Button, message } from 'antd';

import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import menuList from '../../config/menuConfig';
import { formateDate } from '../../utils/dateUtils';
import { reqWeather } from '../../api/index';
import LinkButton from '../../compoents/link-button';

import './index.less';

// import { clearInterval } from 'timers';

class Header extends Component {
    state = { 
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',  //图片url
        weather: ''         //天气文本
    }


    logOut = () => {
        Modal.confirm({
            title: '您确认要退出听雨？',
            content: 'Some descriptions',
            onOk: () => {
            //    console.log('确认');
               //删除内存中的用户信息
               memoryUtils.user = {}; 
               //删除缓存中的信息
               storageUtils.removeUser();
               //回到登录界面
               this.props.history.replace('/login');
               //退出提示
               message.success('您已成功退出！！！');
            },
            onCancel() {
            //   console.log('取消');
            },
          });
    }
    getTitle = () => {
        let title = '';
        const path = this.props.location.pathname;
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title;
                console.log(title);
            }else if(item.children){
                const cItem = item.children.find( cItem => cItem.key === path);
                if(cItem){
                    title = cItem.title;
                }
            }
        });
        return title;
    }
    getWeather = async () => {
        //发送请求
        const { dayPictureUrl, weather } = await reqWeather('耒阳');
        //更新状态
        this.setState({
            dayPictureUrl,
            weather
        })
    }


    componentDidMount () {
        this.intervalId = setInterval(()=>{
            this.setState({
                currentTime: formateDate(Date.now())
            })
        },1000);
        this.getWeather();


    }
    componentWillMount () {
        clearInterval(this.intervalId);
    }
    render() {
        const { currentTime, dayPictureUrl, weather } = this.state;
        const user = memoryUtils.user;
        // console.log('我来调用了'+this.getTitle());
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top" >
                    <span>{`欢迎，${user.username}`}</span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {`${title}`}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header);
