import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Field from 'qnui/lib/field';

import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {api,isEmpty,successToast,errorToast} from "static/utils.js"


const FormItem = Form.Item;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        
    }

    handleSubmit() {
        api({
            method:'/users/changePwd',
            mode:'jsonp',
            args:this.field.getValues(),
            callback:(rsp)=>{
                if(rsp.code == ""){
                    successToast('修改成功！');
                }else{
                    errorToast(rsp.message);
                }
               
            },
            errCallback:(msg)=>{
                errorToast('修改失败！');
            }
        });
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

        const formItemLayout0 = {
            labelCol: {
                fixedSpan: 10
            },
            wrapperCol: {
                span: 10
            }
        };

        return (
            <div className="changePassword">
                <div style={{width:'50%'}}>
                    {/*<div className="space-bottom">
                        <span className='tips-title'>修改密码</span>
                    </div>*/}
                    <Form direction="ver" field={this.field} >
                        <FormItem label="原密码：" required {...formItemLayout}>
                            <Input htmlType="password" {...init('oldPwd')} placeholder="请输入原密码"/>
                        </FormItem>
                        <FormItem label="新密码：" required {...formItemLayout}>
                            <Input htmlType="password" {...init('newPwd')} placeholder="请输入新密码"/>
                        </FormItem>
                        <FormItem label="新密码验证：" required {...formItemLayout}>
                            <Input htmlType="password" {...init('rePwd')} placeholder="请输入新密码验证"/>
                        </FormItem>
                        <FormItem label=" " {...formItemLayout0} >
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Demo
