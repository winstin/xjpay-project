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

import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Field from 'qnui/lib/field';

import {api} from "static/utils.js"
import {ajax} from "../../actions/AY_API";

import testImg from 'static/login.png';
import bcakgroundImg from 'static/loginbackgrond.jpg';


const FormItem = Form.Item;

class App extends Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state={
          isLogin:false,
          password:'',
          username:''
        }
    }


    handleSubmit() {
        // console.log(this.field.getValues());
        // ajax("/login",{username:this.state.username,password:this.state.password},"Post",function(e){
        //     console.log("GoodsListTable：", e);
        // });
        // ajax("/rest/auth",{userName:this.state.username,passWord:this.state.password},"POST",function(e){
        //     console.log("GoodsListTable：", e);
        // });

        api({
            method:'/rest/auth',
            mode:'json',
            args:{userName:this.state.username,passWord:this.state.password},
            callback:(rsp)=>{
               
            },
            errCallback:(msg)=>{
                // MsgToast('error','初始化获取数据失败！',2000);
            }
        });
        this.setState({isLogin:true})
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
        const {isLogin,username,password} = this.state;
        const formItemLayout = {
            labelCol: {
                fixedSpan: 10
            },
            wrapperCol: {
                span: 14
            }
        };
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
                              link="/dist"
                              text="商户管理"
                          >
                              <Navigation>
                                    <Myitem
                                        itemId="Trade"
                                        kind = "navigation_max"
                                        link="/index"
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
                                    {/*<Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/Cancel"
                                        text="自定义打印"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/refund/todo"
                                        text="快递模板"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/refund/search"
                                        text="发货模板"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/refund/storage"
                                        text="商品简称"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/Box"
                                        text="打印设置"
                                        ></Myitem>
                                    <Myitem
                                        itemId="Item"
                                        kind = "navigation_max"
                                        link="/stockControl"
                                        text="打印日志"
                                        ></Myitem>*/}
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
                          {/*<Navigation>
                                <Myitem
                                    itemId="EvaMan"
                                    kind = "navigation_max"
                                    link="/ratemanager"
                                    text="评价管理"
                                    ></Myitem>
                                <Myitem
                                    itemId="EvaMan"
                                    kind = "navigation_max"
                                    link="/batcheva"
                                    text="批量评价"
                                    ></Myitem>
                            </Navigation>*/}
                          </Myitem>
                          {/*<Myitem
                              kind = "navigation_max"
                              itemId="SmsCare"
                              icon="dollar"
                              link="/Message"
                              text="短信关怀"
                          >
                          </Myitem>
                          <Myitem
                              kind = "navigation_max"
                              itemId="MultiShop"
                              icon="dollar"
                              link="/multishop"
                              text="多店铺管理"
                          >
                          </Myitem>*/}
                          {<Myitem
                              kind = "navigation_max"
                              itemId="Setting"
                              icon="personal-center"
                              link="/Personal"
                              text="个人资料"
                          >
                          </Myitem>}
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
