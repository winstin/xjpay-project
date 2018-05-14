import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ServiceRate from '../../actions/ServiceRate'
// import {getInitData} from '../../actions/ServiceRate';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import Tools  from 'static/utils.js'
import Headers from '../../components/Header/index.js'
import {api,ajax,compareTime,isEmpty} from "static/utils.js"

const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    },
    getData = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push({
                title: {name: `2000`},
                id: 100306660940 + i,
                time: 2000 + i
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a>Remove({record.id})</a>;
    };
const rowSelection = {
        onChange: onRowClick,
        getProps: (record) => {
            return {
                disabled: record.id === 23324
            };
        }
    };

const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);
class PersonalCenter extends Component {
  constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            visible:false,
            visibles:false,
            userInfo:{}
        };

    }

    onSearch(value) {
        console.log(value);
    }

    loadTradeList(){
        let self = this;
        let list = [];
        const {getTradeList} = this.props;
        getTradeList();
    }


    componentWillMount() {

    }

    componentDidMount(){
        this.getUserInfo();
    }


    getUserInfo(){
        let userInfo = localStorage.getItem("userInfo");//用户信息
        userInfo = JSON.parse(userInfo);
        api({
            method:'/agents/detail',
            mode:'json',
            args:{
                // url:'/'+userInfo.id
            },
            callback:(rsp)=>{
                console.log(rsp);
                let dataSource = JSON.parse(JSON.stringify(this.state.dataSource));
                let agentData = rsp.data.agentrates;
                if(agentData.length>0){
                    localStorage.setItem("userFee0",JSON.stringify(agentData));
                    dataSource = agentData
                }
                
                this.setState({
                    userInfo:rsp.data.agent,
                    dataSource:dataSource
                })
            },
            errCallback:(msg)=>{

            }
        });
    }

    onOpen = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    toggleVisible = () => {
        this.setState({
            visibles: !this.state.visibles
        });
    };

    onVisibleChange = visibles => {
        this.setState({
            visibles
        });
    };



    cellRender = (value, index, record, context) => {
        if(value == 1){
            return '银联快捷';
        }else{
            return value;
        }
    }

    cellUpstream = (value, index, record, context) => {
        if(value == 'KFT_SERVICE'){
            return 'Q3';
        }else if(value == 'HF_SERVICE'){
            return 'Q1';
        }else if(value == 'CONGYU_SERVICE'){
            return 'Q2';
        }

    }

    cellPointType = (value, index, record, context) => {
       if(value == 0){
            return '商旅类';
        }else if(value == 2){
            return '一般类';
        }
    }

    checkInfo(value){
        if(value == 1){
            return '对公';
        }else{
            return '对私';
        }
    }

    cellIsOpen(){
        return "已开通"
    }

    render() {
        const {containerHeight} = (this.props);

        const {userInfo} = (this.state);


        if(window.userType != "管理员"){
                return (
                    <div className="PersonalCenter">
                        <Headers title="首页"/>
                        <div className="space-bottom paddingTop">
                            <span className='tips-title'>基础信息</span>
                        </div>
                        <Row className="marginTop text-center">
                            <div className="flexStyles" >
                                <span></span>
                                <span className="personal-text">公司名称：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.name}</div>
                            {/*<Input disabled value={userInfo.name} className="input-width"   />*/}
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.accountcity}</div>
                        </Row>
                        <Row className="marginTop text-center border-bottom">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">签约时间：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.signdate}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.expiredate}</div>
                        </Row>
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">法人姓名：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.principal}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.phone}</div>
                        </Row>
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">所在省份：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.province}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.city}</div>
                        </Row>
                        <Row className="marginTop text-center border-bottom">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">详细地址：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.address}</div>
                            <div className="flexStyles hide">
                            </div>
                            <Input className='input-width hide' />
                        </Row>
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">法人邮箱：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.linkman}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>商务邮箱：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.linkmantel}</div>
                        </Row>

                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">财务邮箱：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.idtype}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>APP名称：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.appname}</div>
                        </Row>

                        <Row className="marginTop text-center border-bottom">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">官网地址：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.website}</div>
                            <div className="flexStyles hide">
                            </div>
                            <Input className='input-width hide' />
                        </Row>


                        <div className="space-bottom">
                            <span className='tips-title'>结算信息</span>
                        </div>
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">账户类型：</span>
                            </div>
                            
                            <div className="input-width-l"> {this.checkInfo(userInfo.accounttype)}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.accountname}</div>
                        </Row>
                        <Row className="marginTop text-center border-bottom">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">开户行：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.bank}</div>
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                            </div>
                            <div className="input-width-l"> {userInfo.account}</div>
                        </Row>


                        <div className="space-bottom">
                            <span className='tips-title'>业务类型</span>
                        </div>
                        <Table dataSource={this.state.dataSource} onRowClick={onRowClick}  hasBorder={true} fixedHeader className="text-left height-20">
                            <Table.Column title={<b>业务名称</b>} dataIndex="code" cell={this.cellRender}/>
                            <Table.Column title={<b>渠道名称</b>} dataIndex="upstream" cell={this.cellUpstream}/>
                            <Table.Column title={<b>交易类型</b>} dataIndex="pointType" cell={this.cellPointType}/>
                            <Table.Column title={<b>结算费率</b>} dataIndex="fee0" />
                            <Table.Column title={<b>代付费</b>} dataIndex="d0fee" />
                            <Table.Column title={<b>鉴权费</b>} dataIndex="mode" />
                            <Table.Column title={<b>是否开通</b>} dataIndex="type" cell={this.cellIsOpen}/>
                        </Table>


                        <div className="space-bottom marginTop">
                            <span className='tips-title'>渠道管理</span>
                        </div>
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">管理后台地址：</span>
                            </div>

                            <span className="personal-text" className="input-width">https://web.xjpay.cc</span>
                            <div className="flexStyles hide">
                            </div>
                            <Input className='input-width hide' />
                        </Row>
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text">请求地址：</span>
                            </div>
                            <span className="personal-text" className="input-width">https://api.xjpay.cc</span>
                            <div className="flexStyles hide">
                            </div>
                            <Input className='input-width hide' />
                        </Row>
                        <Row className="marginTop text-center border-bottom">
                            <div className="flexStyles">
                                <span></span>
                                <span className="personal-text" >密钥：</span>
                            </div>
                            <span  className="input-width" style={{fontSize:'14px',marginTop:'4px'}}>{userInfo.appSecret}</span>
                            <div className="flexStyles hide">
                            </div>
                            <Input className='input-width hide' />
                        </Row>

                        
                        <Row className="marginTop text-center">
                            <div className="flexStyles">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>公司邮箱：</span>
                            </div>
                            <span style={{fontSize:'14px',marginTop:'7px'}} className="input-width">{userInfo.linkman}</span>
                            <div className="flexStyles hide">
                            </div>
                            <Input className='input-width hide' />
                        </Row>
                    </div>
                );
        }else{
            return (
                    <div className="PersonalCenter">
                        <Headers title="首页"/>
                         <div className="space-bottom paddingTop marginTop-20">
                            <span className='tips-title'>欢迎使用Guns管理系统</span>
                        </div>
                    </div>
                );
        }
    }
    reduceContent() {
        this.setState({
            dataSource: getData(10)
        });
    }
}

function mapStateToProps(state, ownProps){
    return {
        data:state.ServiceRate.isupdate
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 230;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(PersonalCenter))
