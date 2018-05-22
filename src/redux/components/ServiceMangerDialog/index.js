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
import {api,isEmpty,promptToast,successToast,errorToast} from "static/utils.js"
import Form from 'qnui/lib/form';
import Field from 'qnui/lib/field';
import axios, { post } from 'axios';
import config from 'static/config.js'
import Feedback from 'qnui/lib/feedback';
import noneImg from 'static/none.png';

const webUrl = config.webUrl;
const Appconfig = config.Appconfig.cdn;



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
            visibles3:false,
        };
         this.field = new Field(this);
    }

    componentDidMount(){

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

        console.log(this.state.newData)
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
        this.props.index.addData(this.state.newData);
        // this.state.newData={};
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

    onFormSubmit(type,e){
        e.preventDefault() // Stop form submit
        if(type=="change"){
            const{dataSource} = this.props;
            this.updateData([dataSource],this.state.newData).then((response)=>{
                successToast('修改成功！');
                this.props.index.setState({
                    visible: false
                });
                this.props.index.updateData(dataSource.appId);
            }).catch((error)=>{
                errorToast('修改失败！');
            });
        }else{
            this.fileUpload(this.state.file).then((response)=>{
                successToast('添加成功！');
                this.props.index.setState({
                    visible: false
                });

                this.props.index.reLoad();
            }).catch((error)=>{
                errorToast('添加失败！');
            })
        }
       
    }


    updateData(oldData,newData){
        const url = webUrl+'/agents/update';
        const formData = new FormData();
        let updateData = {
            id: newData.id == undefined ? oldData[0].id : newData.id,
            name: newData.name == undefined ? oldData[0].name : newData.name,
            signdate: newData.signdate == undefined ? oldData[0].signdate : newData.signdate,
            expiredate: newData.expiredate == undefined ? oldData[0].expiredate : newData.expiredate,
            principal: newData.principal == undefined ? oldData[0].principal : newData.principal,
            phone: newData.phone == undefined ? oldData[0].phone : newData.phone,
            province: newData.province == undefined ? oldData[0].province : newData.province,
            city:newData.city == undefined ? oldData[0].city : newData.city,
            address: newData.address == undefined ? oldData[0].address : newData.address,
            accountname: newData.accountname == undefined ? oldData[0].accountname : newData.accountname,
            account: newData.account == undefined ? oldData[0].account : newData.account,
            bank: newData.bank == undefined ? oldData[0].bank : newData.bank,
            accounttype: newData.accounttype == undefined ? oldData[0].accounttype : newData.accounttype,
            accountprovince: newData.accountprovince == undefined ? oldData[0].accountprovince : newData.accountprovince,
            accountcity: newData.accountcity == undefined ? oldData[0].accountcity : newData.accountcity,
            accountaddress: newData.accountaddress == undefined ? oldData[0].accountaddress : newData.accountaddress,
            idtype: newData.idtype == undefined ? oldData[0].idtype : newData.idtype,
            linkman: newData.linkman == undefined ? oldData[0].linkman : newData.linkman,
            linkmantel: newData.linkmantel == undefined ? oldData[0].linkmantel : newData.linkmantel,
            appname: newData.appname == undefined ? oldData[0].appname : newData.appname,
            website: newData.website == undefined ? oldData[0].website : newData.website,
            staffName: newData.staffName == undefined ? oldData[0].staffName : newData.staffName,
            license: newData.license == undefined ? oldData[0].license : newData.license,
            parentId: newData.parentId == undefined ? oldData[0].parentId : newData.parentId,
            staffIdCard: newData.staffIdCard == undefined ? oldData[0].staffIdCard : newData.staffIdCard,
        };

        if(this.state.file!=""&&this.state.file!=undefined){
            formData.append('licenseFile',this.state.file);
        }

        if(this.state.idCardFront!=""&&this.state.idCardFront!=undefined){
            formData.append('idCardFrontFile',this.state.idCardFront);
        }

        if(this.state.idCardBack!=""&&this.state.idCardBack!=undefined){
            formData.append('idCardBackFile',this.state.idCardBack);
        }

        if(this.state.cardFront!=""&&this.state.cardFront!=undefined){
            formData.append('cardFrontFile',this.state.cardFront);
        }

        if(this.state.cardBack!=""&&this.state.cardBack!=undefined){
            formData.append('cardBackFile',this.state.cardBack);
        }
        
        // formData.append('idCardFrontFile',this.state.idCardFront);
        // formData.append('idCardBackFile',this.state.idCardBack);
        // formData.append('cardFrontFile',this.state.cardFront);
        // formData.append('cardBackFile',this.state.cardBack);


        formData.append("name", updateData.name);
        formData.append("signdate", updateData.signdate);

        formData.append("expiredate", updateData.expiredate);
        formData.append("principal", updateData.principal);

        formData.append("idtype", updateData.idtype);
        formData.append("accounttype", updateData.accounttype);

        formData.append("accountprovince", updateData.accountprovince);

        formData.append("id", updateData.id);

        formData.append("phone", updateData.phone);

        formData.append("province", updateData.province);

        formData.append("city", updateData.city);
        formData.append("address", updateData.address);
        formData.append("accountname", updateData.accountname);
        formData.append("account", updateData.account);
        formData.append("bank", updateData.bank);
        formData.append("accountcity", updateData.accountcity);

        formData.append("accountaddress", updateData.accountaddress);
        formData.append("linkman", updateData.linkman);
        formData.append("linkmantel", updateData.linkmantel);
        formData.append("appname", updateData.appname);
        formData.append("website", updateData.website);
        formData.append("staffIdCard", updateData.staffIdCard);
        formData.append("staffName", updateData.staffName);
        formData.append("parentId", updateData.parentId);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

    fileUpload(file){
        this.props.index.setState({
            visible: false
        });
        const url = webUrl+'/agents/add';
        const formData = new FormData();

        if(this.field.getValues().name == "" || this.field.getValues().name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.field.getValues().idtype == "" || this.field.getValues().idtype == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.field.getValues().linkmantel == "" || this.field.getValues().linkmantel == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.field.getValues().linkman == "" || this.field.getValues().linkman == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.field.getValues().address == "" || this.field.getValues().address == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.field.getValues().principal == "" || this.field.getValues().principal == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().province == "" || this.field.getValues().province == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().city == "" || this.field.getValues().city == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().accountname == "" || this.field.getValues().accountname == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().account == "" || this.field.getValues().account == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().bank == "" || this.field.getValues().bank == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.accounttype == "" || this.accounttype == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.accountprovince == "" || this.accountprovince == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().accountcity == "" || this.field.getValues().accountcity == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.field.getValues().appname == "" || this.field.getValues().appname == undefined){
            promptToast("请填写完整信息！");return;
        }


        if(this.state.file!=""&&this.state.file!=undefined){
            formData.append('licenseFile',this.state.file);
        }

        if(this.state.idCardFront!=""&&this.state.idCardFront!=undefined){
            formData.append('idCardFrontFile',this.state.idCardFront);
        }

        if(this.state.idCardBack!=""&&this.state.idCardBack!=undefined){
            formData.append('idCardBackFile',this.state.idCardBack);
        }

        if(this.state.cardFront!=""&&this.state.cardFront!=undefined){
            formData.append('cardFrontFile',this.state.cardFront);
        }

        if(this.state.cardBack!=""&&this.state.cardBack!=undefined){
            formData.append('cardBackFile',this.state.cardBack);
        }
        

        formData.append("name", this.field.getValues().name);
        formData.append("signdate", this.signdate);

        formData.append("expiredate", this.expiredate);
        formData.append("principal", this.field.getValues().principal);

        formData.append("idtype", this.field.getValues().idtype);
        formData.append("accounttype", this.state.newData.accounttype);

        formData.append("accountprovince", this.state.newData.accountprovince);

        formData.append("id", '');

        formData.append("phone", this.field.getValues().phone);

        formData.append("province", this.field.getValues().province);

        formData.append("city", this.field.getValues().city);
        formData.append("address", this.field.getValues().address);
        formData.append("accountname", this.field.getValues().accountname);
        formData.append("account", this.field.getValues().account);
        formData.append("bank", this.field.getValues().bank);
        formData.append("accountcity", this.field.getValues().accountcity);

        formData.append("accountaddress", this.state.newData.accountaddress);
        formData.append("linkman", this.field.getValues().linkman);
        formData.append("linkmantel", this.field.getValues().linkmantel);
        formData.append("appname", this.field.getValues().appname);
        formData.append("website", this.field.getValues().website);
        formData.append("staffIdCard", this.field.getValues().staffIdCard);
        formData.append("staffName", this.field.getValues().staffName);
        formData.append("parentId", this.field.getValues().parentId);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }
    render() {
        let {dataSource,visible,title} = this.props;
        const init = this.field.init;
        let province = accountprovince.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.state.newData.accountprovince = item.value;
                            this.accountprovince=item.name
                            if(dataSource){
                                dataSource.accountprovince = item.value
                            }
                           
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
                    if(dataSource){
                        dataSource.accountaddress = item.value
                    }
                }
            }>{item.name}</Menu.Item>
        })
        let type = accounttype.map((item,index)=>{
            return <Menu.Item onClick={
                ()=>{
                    this.state.newData.accounttype = item.value;
                    this.accounttype=item.name
                    if(dataSource){
                        dataSource.accounttype = item.value
                    }
                }
            }>{item.name}</Menu.Item>
        })
        console.log(dataSource)
        if(title == '修改'){
            return (
                <Dialog visible={visible}
                        onOk={this.onFormSubmit.bind(this,'change')}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                        <form direction="ver" field={this.field} onSubmit={this.onFormSubmit.bind(this,'change')}>
                            <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                                </div>
                                
                                <Input placeholder="公司名称" className='classWidth'     defaultValue={dataSource.name} onChange={(e)=>{this.state.newData.name = e}}/>
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                                </div>
                                <Input defaultValue={dataSource.accountcity} placeholder="执照编号" className='classWidth'    onChange={(e)=>{this.state.newData.accountcity = e}} />
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                                </div>
                                <Dropdown trigger={<Input  placeholder="渠道类型" className='classWidth'   value={dataSource.accountprovince ==1 ? "平台服务商" :"渠道服务商"}  />}
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
                                <Dropdown trigger={<Input  placeholder="渠道级别" className='classWidth'   value={dataSource.accountaddress == 1 ?'企业代理':'个人代理'}/>}
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
                                {/*<Input defaultValue={dataSource.signdate} htmlType='date' placeholder="签约时间" className='classWidth'    onChange={(e)=>{this.state.newData.signdate = e}} />*/}
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                                </div>
                                <DatePicker defaultValue={dataSource.expiredate} className="time-width" onChange={(val, str) => {this.state.newData.expiredate = str}} />
                                {/*<Input defaultValue={dataSource.expiredate} htmlType='date' placeholder="到期时间" className='classWidth'    onChange={(e)=>{this.state.newData.expiredate = e}} />*/}
                            </Row>
                            <Row className="marginTop">
                                 <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>身份证号：</span>
                                </div>
                                <Input placeholder="身份证号" defaultValue={dataSource.staffIdCard} className='classWidth'    onChange={(e)=>{this.state.newData.staffIdCard = e}} />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                                </div>
                                <Input defaultValue={dataSource.principal} placeholder="法人姓名" className='classWidth'   onChange={(e)=>{this.state.newData.principal = e}}  />
                                
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                                </div>
                                <Input defaultValue={dataSource.phone} placeholder="法人姓名" className='classWidth'   onChange={(e)=>{this.state.newData.phone = e}}  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                                </div>
                                <Input defaultValue={dataSource.province} placeholder="所在省份" className='classWidth'   onChange={(e)=>{this.state.newData.province = e}}  />
                                
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                                </div>
                                <Input defaultValue={dataSource.city} placeholder="所在城市" className='classWidth'    onChange={(e)=>{this.state.newData.city = e}} />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                                </div>
                                <Input defaultValue={dataSource.address} placeholder="详细地址" className='classWidth'   onChange={(e)=>{this.state.newData.address = e}}  />
                               
                            </Row>

                            <Row className="marginTop">
                                 <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                                </div>
                                <Input defaultValue={dataSource.linkman} placeholder="法人邮箱" className='classWidth'      onChange={(e)=>{this.state.newData.linkman = e}}/>
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                                </div>
                                <Input defaultValue={dataSource.linkmantel} placeholder="商务邮箱" className='classWidth'    onChange={(e)=>{this.state.newData.linkmantel = e}} />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                                </div>
                                <Input defaultValue={dataSource.idtype} placeholder="财务邮箱" className='classWidth'     onChange={(e)=>{this.state.newData.idtype = e}}/>
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                                </div>
                                <Input defaultValue={dataSource.appname} placeholder="APP名称" className='classWidth'    onChange={(e)=>{this.state.newData.appname = e}} />
                                
                            </Row>


                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                                </div>
                                <Input defaultValue={dataSource.website} placeholder="官网地址" className='classWidth'    onChange={(e)=>{this.state.newData.website = e}} />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>业务联系：</span>
                                </div>
                                <Input placeholder="业务联系" defaultValue={dataSource.staffName} className='classWidth'    onChange={(e)=>{this.state.newData.staffName = e}} />
                               
                            </Row>

                            { window.userType=="管理员" ? <Row className="marginTop">
                               <div className="flexStyle">
                                   <span></span>
                                   <span style={{fontSize:'14px',marginTop:'7px'}}>appId：</span>
                               </div>
                               <Input placeholder="APP名称" className='classWidth'  defaultValue={dataSource.parentId}  onChange={(e)=>{this.state.newData.parentId = e}} />
                               <div className="flexStyle hide">
                                   <span></span>
                                   <span style={{fontSize:'14px',marginTop:'7px'}}>营业执照：</span>
                               </div>
                               <div className="classWidth hide">
                                  
                               </div>
                           </Row> : ""}

                            <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                            <Row>
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                                </div>
                                
                                <Dropdown trigger={<Input  placeholder="账户类型" className='classWidth'    value={dataSource.accounttype==1?'对公':'对私'} />}
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
                                <Input defaultValue={dataSource.accountname} placeholder="收款户名" className='classWidth'     onChange={(e)=>{this.state.newData.accountname = e}}/>
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                                </div>
                                <Input defaultValue={dataSource.bank} placeholder="开户行" className='classWidth'    onChange={(e)=>{this.state.newData.bank = e}} />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                                </div>
                                <Input defaultValue={dataSource.account} placeholder="收款账户" className='classWidth'    onChange={(e)=>{this.state.newData.account = e}} />
                            </Row>

                            <span style={{fontSize:'24px',lineHeight:'60px'}}>图片信息</span>
                            <Feedback title="上传图片小于1M" type="prompt"/>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>身份证正面：</span>
                                </div>
                                <div className="classWidth ">
                                    {  dataSource.idCardFront != ''?
                                            <a href={Appconfig+dataSource.idCardFront} target="view_window">
                                                <img src={Appconfig+dataSource.idCardFront} className="imgSize"/>
                                            </a>
                                            : <img src={noneImg} className="imgSize"/>
                                    }
                                    <Input  htmlType='file'  id="idCardFront"  onChange={(e)=>{
                                        this.setState({idCardFront:document.getElementById("idCardFront").files[0]})
                                    }} />
                                </div>

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>身份证反面：</span>
                                </div>
                                <div className="classWidth ">
                                    {  dataSource.idCardBack != ''?
                                            <a href={Appconfig+dataSource.idCardBack} target="view_window"><img src={Appconfig+dataSource.idCardBack} className="imgSize"/></a>
                                            : <img src={noneImg} className="imgSize"/>
                                    }
                                    <Input  htmlType='file'  id="idCardBack"  onChange={(e)=>{
                                        this.setState({idCardBack:document.getElementById("idCardBack").files[0]})
                                    }} />
                                </div>
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>结算卡正面：</span>
                                </div>
                                <div className="classWidth ">
                                    {  dataSource.cardFront != ''?
                                            <a href={Appconfig+dataSource.cardFront} target="view_window"><img src={Appconfig+dataSource.cardFront} className="imgSize"/></a>
                                            : <img src={noneImg} className="imgSize"/>
                                    }
                                    <Input  htmlType='file'  id="cardFront"  onChange={(e)=>{
                                        this.setState({cardFront:document.getElementById("cardFront").files[0]})
                                    }} />
                                </div>
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>结算卡反面：</span>
                                </div>
                                <div className="classWidth ">
                                    {  dataSource.cardBack != ''?
                                            <a href={Appconfig+dataSource.cardBack} target="view_window"><img src={Appconfig+dataSource.cardBack} className="imgSize"/></a>
                                            : <img src={noneImg} className="imgSize"/>
                                    }                                    
                                    <Input  htmlType='file'  id="cardBack"  onChange={(e)=>{
                                        this.setState({cardBack:document.getElementById("cardBack").files[0]})
                                    }} />
                                </div>
                            </Row>

                             <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>营业执照：</span>
                                </div>
                                <div className="classWidth ">
                                    {  dataSource.license != ''?
                                            <a href={Appconfig+dataSource.license} target="view_window"><img src={Appconfig+dataSource.license} className="imgSize"/></a>
                                            : <img src={noneImg} className="imgSize"/>
                                    }      
                                    <Input  htmlType='file'  id="file"  onChange={(e)=>{
                                        this.setState({file:document.getElementById("file").files[0]})
                                    }} />
                                </div>

                                <div className="flexStyle hide">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>appId：</span>
                                </div>
                                <Input placeholder="APP名称" className='classWidth hide'  />
                                
                            </Row>
                        </form>
                </Dialog>
            );
        }else{
             return (
                <Dialog visible={visible}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onOk={this.onFormSubmit.bind(this,'add')}
                        onClose={this.onClose} title={title}>
                       
                        <form direction="ver" field={this.field} onSubmit={this.onFormSubmit.bind(this,'add')}>
                            <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                                </div>
                                
                                <Input placeholder="公司名称" {...init('name')} className='classWidth'  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                                </div>
                                <Input  placeholder="执照编号" className='classWidth'   {...init('accountcity')}  />
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                                </div>
                                <Dropdown trigger={<Input  placeholder="渠道类型" className='classWidth'   {...init('accountprovince')} value={this.accountprovince}  />}
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
                                <Dropdown trigger={<Input  placeholder="渠道级别" className='classWidth'  {...init('accountaddress')}    value={this.accountaddress}/>}
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
                                <DatePicker className="time-width"   onChange={(val, str) => {this.signdate = str}}/>
                                {/*<Input  placeholder="签约时间" className='classWidth'   htmlType='date'  onChange={(e)=>{this.signdate = e}}/>*/}
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                                </div>
                                <DatePicker className="time-width"  onChange={(val, str) => {this.expiredate = str}}/>
                                {/*<Input  placeholder="到期时间" className='classWidth'   htmlType='date' onChange={(e)=>{this.state.newData.expiredate = e}}  />*/}
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>身份证号：</span>
                                </div>
                                <Input placeholder="身份证号" className='classWidth'   {...init('staffIdCard')}  />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                                </div>
                                <Input placeholder="法人姓名" className='classWidth'   {...init('principal')}   />
                                
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                                </div>
                                <Input placeholder="法人电话" className='classWidth'   {...init('phone')}  />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                                </div>
                                <Input  placeholder="所在省份" className='classWidth'   {...init('province')} />
                                
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                                </div>
                                <Input  placeholder="所在城市" className='classWidth'  {...init('city')}   />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                                </div>
                                <Input  placeholder="详细地址" className='classWidth'  {...init('address')}  />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                                </div>
                                <Input  placeholder="法人邮箱" className='classWidth'   {...init('linkman')} />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                                </div>
                                <Input  placeholder="商务邮箱" className='classWidth'   {...init('linkmantel')}  />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                                </div>
                                <Input  placeholder="财务邮箱" className='classWidth'   {...init('idtype')}  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                                </div>
                                <Input placeholder="APP名称" className='classWidth'    {...init('appname')}  />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                                </div>
                                <Input placeholder="官网地址" className='classWidth'    {...init('website')}  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>业务联系：</span>
                                </div>
                                <Input placeholder="业务联系" className='classWidth'  {...init('staffName')}   />
                            </Row>

                            { window.userType=="管理员" ?

                                <Row className="marginTop">
                                    <div className="flexStyle">
                                        <span></span>
                                        <span style={{fontSize:'14px',marginTop:'7px'}}>appId：</span>
                                    </div>
                                    <Input placeholder="APP名称" className='classWidth'    {...init('parentId')}  />
                                    <div className="flexStyle hide">
                                        <span></span>
                                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>营业执照：</span>
                                    </div>
                                    
                                   <Input placeholder="营业执照" className='classWidth hide'   />
                                </Row>:''
                            }


                            <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                            <Row>
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                                </div>
                                <Dropdown trigger={<Input  placeholder="账户类型" className='classWidth'    {...init('accounttype')}  value={this.accounttype} />}
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
                                <Input placeholder="收款户名" className='classWidth'    {...init('accountname')}/>
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                                </div>
                                <Input  placeholder="开户行" className='classWidth'    {...init('bank')}  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                                </div>
                                <Input  placeholder="收款账户" className='classWidth'   {...init('account')}   />
                            </Row>

                            <span style={{fontSize:'24px',lineHeight:'60px'}}>图片信息</span>
                            <Feedback title="上传图片小于1M" type="prompt"/>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>身份证正面：</span>
                                </div>
                                <Input  className='classWidth'  htmlType='file'  id="idCardFront"  onChange={(e)=>{
                                    this.setState({idCardFront:document.getElementById("idCardFront").files[0]})
                                }} />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>身份证反面：</span>
                                </div>
                                
                               <Input  className='classWidth'  htmlType='file'  id="idCardBack"  onChange={(e)=>{
                                    this.setState({idCardBack:document.getElementById("idCardBack").files[0]})
                                }} />
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>结算卡正面：</span>
                                </div>
                                <Input  className='classWidth'  htmlType='file'  id="cardFront"  onChange={(e)=>{
                                    this.setState({cardFront:document.getElementById("cardFront").files[0]})
                                }} />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>结算卡反面：</span>
                                </div>
                                
                               <Input  className='classWidth'  htmlType='file'  id="cardBack"  onChange={(e)=>{
                                    this.setState({cardBack:document.getElementById("cardBack").files[0]})
                                }} />
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>营业执照：</span>
                                </div>
                                
                                <Input placeholder="营业执照" className='classWidth'  htmlType='file' {...init('file')} id="Photo"  onChange={(e)=>{
                                    this.setState({file:document.getElementById("Photo").files[0]})
                                }} />

                                <div className="flexStyle hide">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>营业执照：</span>
                                </div>
                                
                               <Input placeholder="营业执照" className='classWidth hide'   />
                            </Row>

                        </form>
                </Dialog>
            );
        }
    }
}



export default CustomDialog

