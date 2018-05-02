import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';

import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ajax} from "../../actions/AY_API"

const FormItem = Form.Item;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        
    }

    handleSubmit() {
        console.log(this.field.getValues());
        ajax("/login",this.field.getValues(),"Post",function(e){
            console.log("GoodsListTable：", e);
        });
        location.href='/UserManger'

    }

    render() {
        const init = this.field.init;
        const formItemLayout = {
            labelCol: {
                fixedSpan: 10
            },
            wrapperCol: {
                span: 14
            }
        };

        return (
            <div className="changePassword">
                <div style={{width:'50%'}}>
                    <div className="space-bottom">
                        <span className='tips-title'>修改密码</span>
                    </div>
                    <Form direction="ver" field={this.field} >
                        <FormItem label="原密码：" required {...formItemLayout}>
                            <Input htmlType="password" {...init('password')} placeholder="请输入原密码"/>
                        </FormItem>
                        <FormItem label="新密码：" required {...formItemLayout}>
                            <Input htmlType="password" {...init('password')} placeholder="请输入新密码"/>
                        </FormItem>
                        <FormItem label="新密码验证：" required {...formItemLayout}>
                            <Input htmlType="password" {...init('password')} placeholder="请输入新密码验证"/>
                        </FormItem>
                        <FormItem label=" " {...formItemLayout} >
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Demo
