import React, { Component } from 'react'
import {
    Card,
    Button,
    Icon,
    Table
} from 'antd';
import LinkButton from '../../compoents/link-button';

const columns = [
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

const data = [
    {
        "_id": "5c2ed631f352726338607046",
        "name": "分类001"
    },
    {
        "_id": "5c2ed647f352726338607047",
        "name": "分类2"
    },
    {
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3"
    }
];
export default class Category extends Component {
    render() {
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card extra={extra}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered={true}
                    rowKey='_id'
                    pagination={{ defaultPageSize: 2, showQuickJumper: true }}
                />,
            </Card>
        )
    }
}
