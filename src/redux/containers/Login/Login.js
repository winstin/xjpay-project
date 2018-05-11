import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';

import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ajax} from "../../actions/AY_API"
import * as Login from '../../actions/Login'
import testImg from 'static/login.png';
import bcakgroundImg from 'static/loginbackgrond.jpg';

const FormItem = Form.Item;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state={
          isLogin:false,
          password:'',
          username:'',
          msg:'',
          context:[]
        }
    }

    handleSubmit() {
        let self = this;
        const{Login} = this.props;
        Login(this.state.username,this.state.password,(e)=>{
            if(e == 'fail'){
              self.setState({msg:'账号密码错误！'});
            }else{
              self.setState({isLogin:true,msg:''});
            }
        })
    }

    onchange(type,value){
        if(type=='username'){
            this.setState({username:value})
        }else{
            this.setState({password:value})
        }
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

        const {isLogin,username,password,msg,context} = this.state;
        return (
            <div id="login">
              <img src={bcakgroundImg} className="loginBcakground"/>
              <div className="block">
                  <div className="guns-title">
                      星洁科技后台管理
                  </div>
                  <img src={testImg} className="loginImg"/>
                  <div className="marginTop"></div>
                  <div className="block">
                    <Input htmlType="username" placeholder="请输入账号" value={username} onChange={this.onchange.bind(this,'username')}/>
                  </div>
                  <div className="marginTop"></div>
                  <div className="block">
                    <Input htmlType="password" placeholder="请输入密码" value={password} onChange={this.onchange.bind(this,'password')}/>
                  </div>
                  <div className="marginTop"></div>
                  {msg!="" && <div className="block label marginBottom">
                    <span className='warining'>{msg}</span>
                  </div>}
                  {/*<div className="block label">
                    <Checkbox id="apple" value="apple" >记住我</Checkbox>
                  </div>*/}
                  <div className="marginTop"></div>
                  <div className="block">
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                  </div>
              </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps){
    return  {
        userType:state.Login.userType,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( Login , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
