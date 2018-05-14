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
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';

import Config from 'static/config.js'
import '../components.scss';
import {api,isEmpty,promptToast} from "static/utils.js"


const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    },
    getData = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push({
                title: {name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`},
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

const accountprovince=[
    {
        name:'平台服务商',
        value:1
    },{
        name:'渠道服务商',
        value:2
    }
]

const accountaddress=[
    {
        name:'企业代理',
        value:1
    },{
        name:'个人代理',
        value:2
    }
]

const accounttype=[
    {
        name:'对公',
        value:1
    },{
        name:'对私',
        value:2
    }
]
    




class CustomDialog extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.state = {
            data: getData(30),
            visible: false,
            visibles:false,
            visiblesex:false,
            visiblesdepartment:false,
            newData:{},
            visibles1:false,
            visibles2:false,
            visibles3:false
        };
    }

    
    onOpen = () => {
        this.props.index.setState({
            visible: true
        });
    };

    onClose = () => {

        this.props.index.setState({
            visible: false
        });
    }

    onChangeInfo = () =>{
        this.props.index.setState({
            visible: false
        });
        this.props.index.updateData(this.state.newData);
        this.state.newData={};
    }

    // id: 1
    // name: 江苏星洁科技有限公司
    // signdate: 2013-11-08
    // expiredate: 2033-11-08
    // principal: 陈晓峰
    // phone: 13365203333
    // province: 江苏省
    // city: 泰州
    // address: 泰州市海陵区青年南路37号402
    // accountname: 江苏星洁科技有限公司
    // account: 3210200091010000074188 
    // bank: 江苏泰州农村商业银行鲍徐支行
    // accounttype: 1
    // accountprovince: 1
    // accountcity: 91321291081599974H
    // accountaddress: 1
    // idtype: 
    // linkman: 792282@qq.com
    // linkmantel: 792282@qq.com
    // appname: 星洁科技
    // website: 
    
    addData = () => {
        this.props.index.setState({
            visible: false
        });

        if(this.state.newData.name == "" || this.state.newData.name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.idtype == "" || this.state.newData.name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.linkmantel == "" || this.state.newData.name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.linkman == "" || this.state.newData.name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.address == "" || this.state.newData.name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.principal == "" || this.state.newData.principal == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.province == "" || this.state.newData.province == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.city == "" || this.state.newData.city == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.accountname == "" || this.state.newData.accountname == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.account == "" || this.state.newData.account == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.bank == "" || this.state.newData.bank == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.accounttype == "" || this.state.newData.accounttype == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.accountprovince == "" || this.state.newData.accountprovince == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.accountcity == "" || this.state.newData.accountcity == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.appname == "" || this.state.newData.appname == undefined){
            promptToast("请填写完整信息！");return;
        }

        this.props.index.addData(this.state.newData);
        this.state.newData={};
    }

    toggleVisible = () => {
        this.setState({visiblesex:false})
    };

    onVisibleChange1 = visibles => {
        this.setState({
            visibles1:visibles
        })
    };
    onVisibleChange2 = visibles => {
        this.setState({
            visibles2:visibles
        })
    };
    onVisibleChange3 = visibles => {
        this.setState({
            visibles3:visibles
        })
    };

    onchange(){
        this.setState({visiblesex:false})
    }

    render() {
        const {dataSource,visible,title} = this.props;
        let province = accountprovince.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.state.newData.accountprovince = item.value;
                            this.accountprovince=item.name
                            dataSource.accountprovince = item.value
                            }}
                            >{item.name
                        }
                    </Menu.Item>
        })
        let address = accountaddress.map((item,index)=>{
            return <Menu.Item onClick={
                ()=>{
                    this.state.newData.accountaddress = item.value;
                    this.accountaddress=item.name
                    dataSource.accountaddress = item.value
                }
            }>{item.name}</Menu.Item>
        })
        let type = accounttype.map((item,index)=>{
            return <Menu.Item onClick={
                ()=>{
                    this.state.newData.accounttype = item.value;
                    this.accounttype=item.name
                    dataSource.accounttype = item.value
                }
            }>{item.name}</Menu.Item>
        })
        if(title == '修改'){
            return (
                <Dialog visible={visible}
                        onOk={this.onChangeInfo}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                        <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                            </div>
                            
                            <Input placeholder="公司名称" className='classWidth'    defaultValue={dataSource.name} onChange={(e)=>{this.state.newData.name = e}}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                            </div>
                            <Input defaultValue={dataSource.accountcity} placeholder="执照编号" className='classWidth'   onChange={(e)=>{this.state.newData.accountcity = e}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                            </div>
                            <Dropdown trigger={<Input  placeholder="渠道类型" className='classWidth'  value={dataSource.accountprovince ==1 ? "平台服务商" :"渠道服务商"}  />}
                                      triggerType="click"
                                      visible={this.state.visibles1}
                                      onVisibleChange={this.onVisibleChange1}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {province}
                                </Menu>
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>渠道级别：</span>
                            </div>
                            <Dropdown trigger={<Input  placeholder="渠道级别" className='classWidth'  value={dataSource.accountaddress == 1 ?'企业代理':'个人代理'}/>}
                                      triggerType="click"
                                      visible={this.state.visibles2}
                                      onVisibleChange={this.onVisibleChange2}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {address}
                                </Menu>
                            </Dropdown>
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>签约时间：</span>
                            </div>
                            <DatePicker defaultValue={dataSource.signdate} className="time-width" onChange={(val, str) => {this.state.newData.signdate = str}} />
                            {/*<Input defaultValue={dataSource.signdate} htmlType='date' placeholder="签约时间" className='classWidth'   onChange={(e)=>{this.state.newData.signdate = e}} />*/}
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                            </div>
                            <DatePicker defaultValue={dataSource.expiredate} className="time-width" onChange={(val, str) => {this.state.newData.expiredate = str}} />
                            {/*<Input defaultValue={dataSource.expiredate} htmlType='date' placeholder="到期时间" className='classWidth'   onChange={(e)=>{this.state.newData.expiredate = e}} />*/}
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                            </div>
                            <Input defaultValue={dataSource.principal} placeholder="法人姓名" className='classWidth'  onChange={(e)=>{this.state.newData.principal = e}}  />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                            </div>
                            <Input defaultValue={dataSource.phone} placeholder="法人姓名" className='classWidth'  onChange={(e)=>{this.state.newData.phone = e}}  />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                            </div>
                            <Input defaultValue={dataSource.province} placeholder="所在省份" className='classWidth'  onChange={(e)=>{this.state.newData.province = e}}  />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                            </div>
                            <Input defaultValue={dataSource.city} placeholder="所在城市" className='classWidth'   onChange={(e)=>{this.state.newData.city = e}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                            </div>
                            <Input defaultValue={dataSource.address} placeholder="详细地址" className='classWidth'  onChange={(e)=>{this.state.newData.address = e}}  />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                            </div>
                            <Input defaultValue={dataSource.linkman} placeholder="法人邮箱" className='classWidth'     onChange={(e)=>{this.state.newData.linkman = e}}/>
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                            </div>
                            <Input defaultValue={dataSource.linkmantel} placeholder="商务邮箱" className='classWidth'   onChange={(e)=>{this.state.newData.linkmantel = e}} />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                            </div>
                            <Input defaultValue={dataSource.idtype} placeholder="财务邮箱" className='classWidth'    onChange={(e)=>{this.state.newData.idtype = e}}/>
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                            </div>
                            <Input defaultValue={dataSource.appname} placeholder="APP名称" className='classWidth'   onChange={(e)=>{this.state.newData.appname = e}} />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                            </div>
                            <Input defaultValue={dataSource.website} placeholder="官网地址" className='classWidth'   onChange={(e)=>{this.state.newData.website = e}} />
                        </Row>

                        <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                        <Row>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                            </div>
                            
                            <Dropdown trigger={<Input  placeholder="账户类型" className='classWidth'   value={dataSource.accounttype==1?'对公':'对私'} />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange3}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {type}
                                </Menu>
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                            </div>
                            <Input defaultValue={dataSource.accountname} placeholder="收款户名" className='classWidth'    onChange={(e)=>{this.state.newData.accountname = e}}/>
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                            </div>
                            <Input defaultValue={dataSource.bank} placeholder="开户行" className='classWidth'   onChange={(e)=>{this.state.newData.bank = e}} />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                            </div>
                            <Input defaultValue={dataSource.account} placeholder="收款账户" className='classWidth'   onChange={(e)=>{this.state.newData.account = e}} />
                        </Row>

                </Dialog>
            );
        }else{
             return (
                <Dialog visible={visible}
                        onOk={this.addData}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                        <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                            </div>
                            
                            <Input placeholder="公司名称" className='classWidth' onChange={(e)=>{this.state.newData.name = e}}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                            </div>
                            <Input  placeholder="执照编号" className='classWidth'    onChange={(e)=>{this.state.newData.accountcity = e}}/>
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                            </div>
                            <Dropdown trigger={<Input  placeholder="渠道类型" className='classWidth'  value={this.accountprovince}  />}
                                      triggerType="click"
                                      visible={this.state.visibles1}
                                      onVisibleChange={this.onVisibleChange1}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {province}
                                </Menu>
                            </Dropdown>
                            
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>渠道级别：</span>
                            </div>
                            <Dropdown trigger={<Input  placeholder="渠道级别" className='classWidth'   value={this.accountaddress}/>}
                                      triggerType="click"
                                      visible={this.state.visibles2}
                                      onVisibleChange={this.onVisibleChange2}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {address}
                                </Menu>
                            </Dropdown>
                            
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>签约时间：</span>
                            </div>
                            <DatePicker className="time-width" onChange={(val, str) => {this.state.newData.signdate = str}} />
                            {/*<Input  placeholder="签约时间" className='classWidth'  htmlType='date'  onChange={(e)=>{this.state.newData.signdate = e}}/>*/}
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                            </div>
                            <DatePicker className="time-width" onChange={(val, str) => {this.state.newData.expiredate = str}} />
                            {/*<Input  placeholder="到期时间" className='classWidth'  htmlType='date' onChange={(e)=>{this.state.newData.expiredate = e}}  />*/}
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                            </div>
                            <Input placeholder="法人姓名" className='classWidth'   onChange={(e)=>{this.state.newData.principal = e}}  />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                            </div>
                            <Input placeholder="法人电话" className='classWidth'   onChange={(e)=>{this.state.newData.phone = e}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                            </div>
                            <Input  placeholder="所在省份" className='classWidth'    onChange={(e)=>{this.state.newData.province = e}} />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                            </div>
                            <Input  placeholder="所在城市" className='classWidth'   onChange={(e)=>{this.state.newData.city = e}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                            </div>
                            <Input  placeholder="详细地址" className='classWidth'    onChange={(e)=>{this.state.newData.address = e}}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                            </div>
                            <Input  placeholder="法人邮箱" className='classWidth'   onChange={(e)=>{this.state.newData.linkman = e}} />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                            </div>
                            <Input  placeholder="商务邮箱" className='classWidth'    onChange={(e)=>{this.state.newData.linkmantel = e}}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                            </div>
                            <Input  placeholder="财务邮箱" className='classWidth'    onChange={(e)=>{this.state.newData.idtype = e}}/>
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                            </div>
                            <Input placeholder="APP名称" className='classWidth'   onChange={(e)=>{this.state.newData.appname = e}} />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                            </div>
                            <Input placeholder="官网地址" className='classWidth'   onChange={(e)=>{this.state.newData.website = e}} />
                        </Row>

                        <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                        <Row>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                            </div>
                            <Dropdown trigger={<Input  placeholder="账户类型" className='classWidth'   value={this.accounttype} />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange3}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {type}
                                </Menu>
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                            </div>
                            <Input placeholder="收款户名" className='classWidth'    onChange={(e)=>{this.state.newData.accountname = e}}/>
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                            </div>
                            <Input  placeholder="开户行" className='classWidth'    onChange={(e)=>{this.state.newData.bank = e}} />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                            </div>
                            <Input  placeholder="收款账户" className='classWidth'   onChange={(e)=>{this.state.newData.account = e}} />
                        </Row>

                </Dialog>
            );
        }
    }
}



export default CustomDialog

