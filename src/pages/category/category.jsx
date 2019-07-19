import React, { Component } from 'react'
import {
    Card,
    Button,
    Icon,
    Table,
    message
} from 'antd';

import LinkButton from '../../compoents/link-button';
import { reqCategorys } from '../../api';



export default class Category extends Component {
    state = {
        category: [],
        loading: false
    }

    getCategorys = async () => {
        //发送异步请求

        //显示加载图标
        this.setState({
            loading: true
        });
        const result = await reqCategorys();
        if (result.status === 0) {
            const categorys = result.data;
            this.setState(
                {categorys}
            )
        } else {
            message.error('信息读取失败！！！');
        }
        //显示加载图标
        this.setState({
            loading: false
        });
    }
    componentWillMount(){
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
        const { categorys, loading } = this.state;
        const extra = (
            <Button type="primary">
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
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
            </Card>
        )
    }
}
