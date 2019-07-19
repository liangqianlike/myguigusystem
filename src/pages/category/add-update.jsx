import React, { Component } from 'react';
import {
    Form,
    Button,
    Input,
    message
} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
class AdduUpdate extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired
    }
    componentWillMount() {
        this.props.setForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '分类名称必须输入'}
                            ]
                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AdduUpdate);