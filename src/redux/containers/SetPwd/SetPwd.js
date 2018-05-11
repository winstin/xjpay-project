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
        this.state = {
            firstLogin:false
        }
    }

    componentDidMount(){
        let self = this; 
        let firstLogin = false;
        let temp =localStorage.getItem("menus");
        if(isEmpty(temp)){
            firstLogin = true
        }
      
        self.setState({firstLogin:firstLogin});
        
    }

    handleSubmit() {
        api({
            method:'/users/changePwd',
            mode:'jsonp',
            args:this.field.getValues(),
            callback:(rsp)=>{
                console.log(rsp)
                if(rsp.code == ""){
                    if(this.state.firstLogin){
                        successToast('首次修改密码成功,请退出重新登录！',2000);
                    }else{
                        successToast('修改成功！');
                    }
                }else{
                    errorToast(rsp.message);
                }
               
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message);
                }else{
                    errorToast('修改失败！');
                }
               
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
                span: 10
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
                <div className="borderStyle">
                    {this.state.firstLogin &&<div className="space-bottom-20">
                        <span className='tips-title'>首次登录修改密码</span>
                    </div>}
                    <Form direction="ver" field={this.field} >
                        <div className="block">
                            <Input htmlType="password" {...init('oldPwd')} placeholder="请输入原密码"/>
                        </div>
                        <div className="marginTop"></div>
                        <div className="block">
                       
                            <Input htmlType="password" {...init('newPwd')} placeholder="请输入新密码"/>
                        </div>
                         <div className="marginTop"></div>
                        <div className="block">
                        
                            <Input htmlType="password" {...init('rePwd')} placeholder="请输入新密码验证"/>
                        </div>
                        
                        <div className="marginTop"></div>

                        <div className="block">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                        </div>
                        
                       
                    </Form>
                </div>
            </div>
        );
    }
}

export default Demo
