/**
*APP组件，整个应用顶级路由

这是整个APP的顶层路由页面，所有的路由都会加载这个页面组件，然后根据路由来匹配this.props.children子页面路由


**/

import React,{Component, PropTypes} from 'react'
import Myitem from '../../components/Myitem'

import Navigation,{Item, Group} from 'qnui/lib/navigation';
import Icon from 'qnui/lib/icon';
import Menu from 'qnui/lib/menu';
import './app.css'

import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';

import {api,ajax,compareTime,isEmpty} from "static/utils.js"
import Dialog from 'qnui/lib/dialog';

import testImg from 'static/login.png';
import bcakgroundImg from 'static/loginbackgrond.jpg';


function clearAllCookie() {  
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
    if(keys) {  
        for(var i = keys.length; i--;)  
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
    }  
}  

class App extends Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state={
          isLogin:false,
          password:'',
          username:'',
          msg:''
        }
    }


    componentDidMount(){
        let self = this; 
        let now = new Date();
        let loginTime = localStorage.getItem("loginTime");
        if (!isEmpty(loginTime)) {
          let res = compareTime(loginTime,now);
          if(res.minutes >= 30){
              self.setState({msg:'登录超时!'})
          }else{
              self.setState({isLogin:true})
          }
        }

    }

    handleSubmit() {
        let self = this;
       
        // ajax({
        //     method:'/rest/auth',
        //     mode:'json',
        //     type:'POST',
        //     args:{userName:this.state.username,password:this.state.password},
        //     callback:(rsp)=>{
        //        // console.log(rsp);
        //        // 
        //        document.cookie = rsp.randomKey +"="+ rsp.token;
        //        self.setState({isLogin:true})
        //     },
        //     errCallback:(msg)=>{
        //         // MsgToast('error','初始化获取数据失败！',2000);
        //     }
        // });

        // api({
        //     method:'/rest/auth',
        //     mode:'json',
        //     args:{userName:this.state.username,password:this.state.password},
        //     callback:(rsp)=>{
        //         console.log(rsp);

        //         let now = new Date();
        //         console.log(now)
                
        //         localStorage.setItem("randomKey",rsp.randomKey);
        //         localStorage.setItem("token",rsp.token);
        //         localStorage.setItem("loginTime",now);

        //         clearAllCookie();
        //         document.cookie = rsp.randomKey +"="+ rsp.token;
        //         self.setState({isLogin:true})
        //     },
        //     errCallback:(msg)=>{
        //         self.setState({msg:'账号密码错误！'});
        //         clearAllCookie();
        //         console.log(msg)
        //     }
        // });


        api({
            method:'/rest/login',
            mode:'json',
            args:{username:this.state.username,password:this.state.password},
            callback:(rsp)=>{
                console.log(rsp);
                let now = new Date();
                localStorage.setItem("loginTime",now);
                self.setState({isLogin:true,msg:''});
            },
            errCallback:(msg)=>{
                self.setState({msg:'账号密码错误！'});
                // clearAllCookie();
                console.log(msg)
            }
        });
    }

    loginOut(){
        let self = this;
        Dialog.confirm({
            content: '是否退出当前帐号？',
            title: '退出',
            onOk:()=>{
              clearAllCookie();
              localStorage.setItem("loginTime",null);
              self.setState({isLogin:false})
            }
        });
    }


    onchange(type,value){
        if(type=='username'){
            this.setState({username:value})
        }else{
            this.setState({password:value})
        }
    }  
    render(){
        const init = this.field.init;
        const {isLogin,username,password,msg} = this.state;
        if(!isLogin){
          return(
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
                  <div className="block label">
                    <Checkbox id="apple" value="apple" >记住我</Checkbox>
                  </div>
                  <div className="marginTop"></div>
                  <div className="block">
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                  </div>
              </div>
            </div>
          )
        }else{
          return(
              <div id="container">
                  <div id="navigation" style={{backgroundColor:"#3189DC"}} className="navigation_max">

                      <Navigation
                      style={{height:'100%',borderWidth:1, borderStyle:"solid ", borderColor:"#3189DC"}}
                      type="tree"
                      activeDirection="right"
                      >
                          <div className="qn-navigation-vertical" style={{background:"#3189DC"}}>
                            <Icon type ="account" />
                            <span>星洁科技</span>
                          </div>
                          <Myitem
                              kind = "navigation_max"
                              itemId="Trade"
                              icon="account"
                              link="/"
                              text="商户管理"
                          >
                              <Navigation>
                                    <Myitem
                                        itemId="Trade"
                                        kind = "navigation_max"
                                        link="/"
                                        text="商户管理"
                                        ></Myitem>
                                </Navigation>
                          </Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="Item"
                              icon="store"
                              link="/SendError"
                              text="交易管理"
                          >
                              <Navigation>
                                    <Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/BatchPage"
                                        text="交易流水查询"
                                        ></Myitem>
                              </Navigation>
                          </Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="Box"
                              icon="box"
                              link="/Interceptor"
                              text="结算管理"
                          >
                              <Navigation>
                                    <Myitem
                                        itemId="Box"
                                        kind = "navigation_max"
                                        link="/CommodityStatistics"
                                        text="商品手续统计"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Box"
                                        kind = "navigation_max"
                                        link="/ChannelStatistics"
                                        text="渠道分润统计"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Box"
                                        kind = "navigation_max"
                                        link="/GetManger"
                                        text="收益管理"
                                        ></Myitem>
                              </Navigation>
                          </Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="User"
                              icon="account"
                              link="/Interceptor"
                              text="系统管理"
                          >
                              <Navigation>
                                    <Myitem
                                        itemId="User"
                                        kind = "navigation_max"
                                        link="/UserManger"
                                        text="用户管理"
                                        ></Myitem>
                                    <Myitem
                                        itemId="User"
                                        kind = "navigation_max"
                                        link="/RoleManger"
                                        text="角色管理"
                                        ></Myitem>
                                    <Myitem
                                        itemId="User"
                                        kind = "navigation_max"
                                        link="/OrderManger"
                                        text="菜单管理"
                                        ></Myitem>
                              </Navigation>
                          </Myitem>
                          <Myitem
                              itemId="AutoEva"
                              kind = "navigation_max"
                              icon="set"
                              link="/ServiceManger"
                              text="服务商管理"
                          ></Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="EvaMan"
                              icon="bags"
                              link="/ServiceRate"
                              text="服务商费率"
                          >
                          </Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="Setting"
                              icon="personal-center"
                              link="/Personal"
                              text="个人资料"
                          >
                          </Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="Settings"
                              icon="set"
                              link="/Login"
                              text="修改密码"
                          >
                          </Myitem>

                          <Myitem
                              kind = "navigation_max"
                              itemId="Settings"
                              icon="set"
                              onClick = {this.loginOut.bind(this)}
                              text="退出"
                          >
                          </Myitem>
                      </Navigation>
                  </div>
                  <div id="module_data"  style={{backgroundColor:"white"}}>
                      <div id="initSet" style={{minHeight:"100%",height:"100%",overflow:'auto',backgroundColor:"white"}}>
                          {this.props.children}
                      </div>
                  </div>
              </div>
          )
        }
    }
}



export default App


// var App = React.createClass({

    
// })
// export default App
