import React, { Component } from 'react'
import {
    Card,
    Button,
    Icon,
    Table,
    message,
    Modal
} from 'antd';

import LinkButton from '../../compoents/link-button';
import { reqCategorys, reqAddCategory, reqUpdateCtegory } from '../../api';
import AddupDateForm from './add-update';


export default class Category extends Component {
    state = {
        category: [],
        loading: false,
        showStatus: 0,     //0默认关闭，1打开修改，2打开关闭
    }


    getCategorys = async () => {
        //显示加载图标
        this.setState({
            loading: true
        });
        //发送异步请求
        const result = await reqCategorys();
        if (result.status === 0) {
            const categorys = result.data;
            this.setState(
                { categorys }
            )
        } else {
            message.error('信息读取失败！！！');
        }
        //显示加载图标
        this.setState({
            loading: false
        });
    }

    //确认添加/修改
    handleOk =  () => {
        //表单验证
        this.form.validateFields( async (err, values) => {
            if (!err) {
                //读取输入框的值
                const { categoryName } = values;
                console.log('我是测试的'+categoryName);
                // console.log(typeof categoryName);
                //发添加分类的请求
                const result = await reqAddCategory(categoryName);
                //关闭添加/修改框
                this.setState({showStatus: 0});
                //根据返回的结果输出对应的结果
                if(result.status === 0){
                    //重新拉去最新结果
                    this.getCategorys();
                //    console.log(categoryName);
                    // categoryName = '';
                    message.success('添加分类成功！！！');
                    // categoryName = '';
                } else {
                    message.error('添加分类失败！！！');
                }
               
            }
        });

    }


    //取消
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })


    }

    componentWillMount() {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => <LinkButton>修改</LinkButton>
            },
        ];
    }

    componentDidMount() {

        this.getCategorys();
    }


    render() {
        //取出状态数据
        const { categorys, loading, showStatus } = this.state;

        //读取更新的分类名称
        const category = this.categorys || {};

        const extra = (
            <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={categorys}
                    bordered={true}
                    loading={loading}
                    rowKey='_id'
                    pagination={{ defaultPageSize: 6, showQuickJumper: true }}
                />
                <Modal
                    title={showStatus === 1 ? '添加分类' : '修改分类'}
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* 将子组件的form传递给当前的父类组件对象上 */}
                    <AddupDateForm setForm={form => this.form = form} />
                </Modal>
            </Card>
        )
    }
}
