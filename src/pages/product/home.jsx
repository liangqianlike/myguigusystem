import React, { Component } from 'react';
import {
    Card,
    Select,
    Button,
    Input,
    Icon,
    Table
} from 'antd';

import LinkButton from '../../compoents/link-button';
import {reqProducts} from '../../api/index';

const Option = Select.Option;

export default class Product extends Component {
    state = {
        loading:false,
        products: [],    //商品列表
        total: 0     //商品的总数量
    }
    initColumns = () => {
        this.columns = [
            {
                title: '商品列表',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 100,
                render: (status) => {
                    let btnText = '下架';
                    let text = '在售';
                    if(status === 2){
                        btnText = '上架';
                        text = '已下架';
                    }
                    return (
                        <span>
                            <button>{btnText}</button><br/>
                            <span>{text}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            }
        ]
    }
    getProducts = async(pageNum)=> {
        const result = await reqProducts(pageNum, 2);
        if(result.status === 0){
            const {total, list} = result.data;
            this.setState({
                total,
                products: list
            });
        }
    }
    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        //获取第一页的显示
        this.getProducts(1);
    }
    render() {
        //取出状态值
        const { loading, products, total } = this.state;
        const title = (
            <span>
                <Select style={{ width: 160 }} value="1">
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按描述搜索</Option>
                </Select>
                <Input type="text" style={{width:200,margin: '0 10px'}} placeholder="请输入关键字" />
                <Button type="primary">
                    <Icon type="plus" />
                    搜索
                </Button>
            </span>
        )
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加商品
            </Button>
        )
        return (
            <Card title={ title } extra={ extra }>
                <Table 
                    columns={this.columns}
                    dataSource={products}
                    bordered={true}
                    loading={loading}
                    rowKey='_id'
                    pagination={{ total, defaultPageSize: 2, showQuickJumper: true, onChange: this.getProducts }}

                />

            </Card>
        )
    }
}
