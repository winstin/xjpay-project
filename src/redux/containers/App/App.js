/**
*APP组件，整个应用顶级路由
这是整个APP的顶层路由页面，所有的路由都会加载这个页面组件，然后根据路由来匹配this.props.children子页面路由
**/

import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Myitem from '../../components/Myitem'
import Navigation,{Item, Group} from 'qnui/lib/navigation';
import Icon from 'qnui/lib/icon';
import './app.css'
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';
import {api,ajax,compareTime,isEmpty} from "static/utils.js"
import Dialog from 'qnui/lib/dialog';
import testImg from 'static/login.png';
import bcakgroundImg from 'static/loginbackgrond.jpg';
import * as Login from '../../actions/Login'

import Menu from 'qnui/lib/menu';  

let backcolor = '#3189DC';

// let backcolor = '#404040';
function clearAllCookie() {  
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
    if(keys) {  
        for(var i = keys.length; i--;)  
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
    }  
}  
let onMouseEnter = (id, item, nav) => {
    console.log('onMouseEnter')  
}

let onMouseLeave = (id, item, nav) => {
    console.log('onMouseLeave')
}
// let context = '';
class App extends Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state={
          isLogin:true,
          password:'',
          username:'',
          msg:'',
          context:[],
          appname:"星洁科技",
          isFirst:false
        }
    }


    componentDidMount(){
        let self = this; 
        let now = new Date();
        let loginTime = localStorage.getItem("loginTime");//登录超时参数
        window.userType = localStorage.getItem("userType");//用户身份
        window.userNick = localStorage.getItem("appId");
        let userInfo = localStorage.getItem("userInfo");//用户信息

        let isFirst = localStorage.getItem("isFirst");//用户信息
        if (!isEmpty(loginTime)) {
          let res = compareTime(loginTime,now);
          if(res.minutes >= 30){
              localStorage.setItem("loginTime","");
              localStorage.setItem("appId","");
              localStorage.setItem("userType","");
              localStorage.setItem("userInfo","");
              self.setState({msg:'登录超时!'});
          }else{
              let context = [];
              try{
                let temp =localStorage.getItem("menus");
                if(!isEmpty(temp)){
                    context = JSON.parse(temp);
                }
              }catch(e){
                context = [];
              }

              try{
                userInfo = JSON.parse(userInfo);
              }catch(e){

              }

              if(userInfo!=undefined && userInfo!=null){
                  if(isFirst == "true"){
                    context = [];
                    // localStorage.setItem("isFirst",'false');
                  }
                  self.setState({
                    isLogin:true,
                    context:context,
                    appname:userInfo.name
                  });
              }else{
                  if(isFirst == "true"){
                    context = [];
                    // localStorage.setItem("isFirst",'false');
                  }
                  self.setState({
                    isLogin:true,
                    context:context,
                    appname:"星洁科技"
                  });
              }
              
          }
        }else{
          self.setState({isLogin:false})
        }

    }

    handleSubmit() {
        let self = this;
        const{Login} = this.props;
        Login(this.state.username,this.state.password,(e)=>{
            if(e == 'fail'){
              self.setState({msg:'账号密码错误！'});
            }else if(e == 'success'){
              api({
                  method:'/menus/roleMenu',
                  mode:'jsonp',
                  args:{},
                  callback:(rsp)=>{
                      window.location.href="/dist/";
                      window.userType = localStorage.getItem("userType");
                      localStorage.setItem("menus",JSON.stringify(rsp.data));
                      self.setState({context:rsp.data,isLogin:true,msg:''});
                  },
                  errCallback:(msg)=>{
                    
                  }
              });
              localStorage.setItem("isFirst",'false');
            }else{
              window.location.href="/dist/reSetPassword";
              localStorage.setItem("isFirst",'true');
            }
        })
    }

    loginOut(){
        let self = this;
        Dialog.confirm({
            content: '是否退出当前帐号？',
            title: '退出',
            onOk:()=>{
              clearAllCookie();
              localStorage.setItem("loginTime","");
              localStorage.setItem("appId","");
              localStorage.setItem("userType","");
              localStorage.setItem("userInfo","");
              self.setState({isLogin:false});
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

    //自动生成菜单
    checkInfo(value){
        switch(value){
            case"商户管理":
              return {icon:'account',link:'/dist/GunsIndex'}
              break;
            case"交易流水查询":
              return {icon:'store',link:'/dist/BatchPage'}
              break;
            case"商户手续费统计":
              return {icon:'box',link:'/dist/CommodityStatistics'}
              break;
            case"渠道分润统计":
              return {icon:'box',link:'/dist/ChannelStatistics'}
              break;
            case"收益管理":
              return {icon:'account',link:'/dist/GetManger'}
              break;
            case"服务商管理":
              return {icon:'table',link:'/dist/ServiceManger'}
              break;
            case"服务商费率":
              return {icon:'training',link:'/dist/ServiceRate'}
              break;
            case"用户管理":
              return {icon:'account',link:'/dist/UserManger'}
              break;

            case"交易管理":
              return {icon:'store',link:''}
              break;
            case"结算管理":
              return {icon:'box',link:''}
              break;
            case"系统管理":
              return {icon:'account',link:''}
              break;


            case"角色管理":
              return {icon:'account',link:'/dist/RoleManger'}
              break;
            case"菜单管理":
              return {icon:'account',link:'/dist/OrderManger'}
              break;
             default:
              return  {icon:'minus',link:''}

        }
    }

    render(){
        const init = this.field.init;
        const {isLogin,username,password,msg,context,appname} = this.state;
        let self = this;
        let jsx = '';
        if(context){
          jsx = context.map((item,index)=>{
              if(item.children.length>=1){
                let card = item.children.map((content,i)=>{
                  return <Myitem
                            itemId={item.id}
                            kind = "navigation_max"
                            icon=""
                            link={self.checkInfo(content.name).link}
                            text={content.name}
                        ></Myitem>
                })

                if (window.userType == "管理员" && item.name == "系统管理") {
                      return
                }else{
                  return  <Myitem
                              itemId={item.id}
                              kind = "navigation_max"
                              icon={self.checkInfo(item.name).icon}
                              link=''
                              text={item.name}
                          >
                          <Navigation>
                            {card}
                          </Navigation>
                          </Myitem>
                }
              }else{
                return  <Myitem
                            itemId={item.id}
                            kind = "navigation_max"
                            icon={self.checkInfo(item.name).icon}
                            link={self.checkInfo(item.name).link}
                            text={item.name}
                        ></Myitem>
              }
          })
        }



        if(!isLogin){
          return(
            <div style={{width:'100%',height:'100%',background:'#fff'}}>
              {<Navigation
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  type="filling"
                  activeDirection="bottom"
                  className = "nav-style"
                  >
                  <li className="navigation-logo-zone" style={{marginLeft:"15%"}}>
                    <div className="middle-center">
                      <img src={testImg} className="loginImg1"/>
                      <span className="index-title">星洁科技</span>
                    </div>
                  </li>
                  <li className="navigation-toolbar" style={{marginRight:"15%"}}>
                    <ul>
                      <li>
                        <Icon type="electronics" />
                        <span className='index-info'>首页</span>
                      </li>
                      <li>
                        <Icon type="link" />
                        <span className='index-info'>登录</span>
                      </li>
                      <li>
                        <Icon type="text" />
                        <span className='index-info'>帮助</span>
                      </li>
                      <li>
                        <Icon type="set" />
                        <span className='index-info'>设置</span>
                      </li>
                    </ul>
                  </li>
              </Navigation>}
              <div id="login">
                  {/*<img src={bcakgroundImg} className="loginBcakground"/>*/}
                  <div className="block" className="login-width">
                      <div className="guns-title">
                          <span >后台管理</span>
                      </div>
                      {/*<img src={testImg} className="loginImg"/>*/}
                      <div className="marginTop"></div>
                      <div className="block">
                        <Input htmlType="username" 
                        placeholder="请输入账号" 
                        value={username} 
                        onChange={this.onchange.bind(this,'username')}
                        style={{width:'250px'}}
                        />
                      </div>
                      <div className="marginTop"></div>
                      <div className="block">
                        <Input htmlType="password" placeholder="请输入密码" 
                        value={password} 
                        onChange={this.onchange.bind(this,'password')}
                        style={{width:'250px'}}/>
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
                        <Button type="primary" style={{width:'250px'}} onClick={this.handleSubmit.bind(this)}>登录</Button>
                      </div>
                  </div>
              </div>
              <div className="container-white">
              </div>
              <div id="footer">
                  <div className="bottom-10">关于我们 服务协议 运营中心 辟谣中心 星洁科技 联系邮箱 侵权投诉</div>
                  <div className="bottom-10">
                      <span>苏ICP备16064746号</span><span>&nbsp;|&nbsp;</span>
                      <span>星洁科技</span><span>&nbsp;|&nbsp;</span>
                      <span>江苏星洁科技有限公司</span>
                  </div>
                  <div>Powered by XjPay Winstin.</div>
              </div>
            </div>
          )
        }else{
          return(
              <div id="container">
                  <div id="navigation" style={{backgroundColor:backcolor}} className="navigation_max">

                      <Navigation
                      style={{height:'100%',borderWidth:1, borderStyle:"solid ", borderColor:backcolor}}
                      type="tree"
                      activeDirection="right"
                      >
                          <div className="qn-navigation-vertical" style={{background:backcolor}}>
                            <Icon type ="account" />
                            <span className="span-height">{appname}</span>
                          </div>
                          {jsx}
                          <Myitem
                              kind = "navigation_max"
                              itemId="Settings"
                              icon="survey"
                              link="/dist/reSetPassword"
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
                          {/*<Myitem
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
                              icon=""
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
                          </Myitem>*/}
                      </Navigation>
                  </div>
                  <div id="module_data" >
                      <div id="initSet" style={{minHeight:"100%",height:"100%",overflow:'auto'}}>
                          {this.props.children}
                      </div>
                  </div>
              </div>
          )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(App)

