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
            visible: false,
            visibles:false,
            visiblesex:false,
            visiblesdepartment:false,
            newData:{},
            visibles1:false,
            visibles2:false,
            visibles3:false,
            autoName:"",
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
                // console.log(response);
                successToast('修改成功！');
                this.state.file="";
                this.state.idCardFront="";
                this.state.idCardBack="";
                this.state.cardFront="";
                this.state.cardBack="";
                this.state.newData={};
                this.props.index.setState({
                    visible: false
                });
                this.props.index.updateData(dataSource.appId);
            }).catch((error)=>{
                errorToast('修改失败！');
            });
        }else{
            this.fileUpload(this.state.file).then((response)=>{

                if(response.data.message!="" && response.data.message!="添加成功"){
                    errorToast(response.data.message);
                }else{
                    successToast('添加成功！');
                    this.state.newData={};
                    this.props.index.setState({
                        visible: false
                    });

                    this.props.index.reLoad();
                }
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
            parentAppId: newData.parentAppId == undefined ? oldData[0].parentAppId : newData.parentAppId,
            staffIdCard: newData.staffIdCard == undefined ? oldData[0].staffIdCard : newData.staffIdCard,
            appId: oldData[0].appId
        };
        // console.log(updateData)
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
        formData.append("parentAppId", updateData.parentAppId);
        formData.append("status", "0");
        formData.append("appId", updateData.appId);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config);
        
    }

    fileUpload(file){
        this.props.index.setState({
            visible: false
        });
        const url = webUrl+'/agents/add';
        const formData = new FormData();

        if(this.state.newData.name == "" || this.state.newData.name == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.idtype == "" || this.state.newData.idtype == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.linkmantel == "" || this.state.newData.linkmantel == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.linkman == "" || this.state.newData.linkman == undefined){
            promptToast("请填写完整信息！");
            return;
        }

        if(this.state.newData.address == "" || this.state.newData.address == undefined){
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

        if(this.accounttype == "" || this.accounttype == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.accountprovince == "" || this.accountprovince == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.accountcity == "" || this.state.newData.accountcity == undefined){
            promptToast("请填写完整信息！");return;
        }

        if(this.state.newData.appname == "" || this.state.newData.appname == undefined){
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
        formData.append("name", this.state.newData.name);
        formData.append("signdate", this.signdate);
        formData.append("expiredate", this.expiredate);
        formData.append("principal", this.state.newData.principal);
        formData.append("idtype", this.state.newData.idtype);
        formData.append("accounttype", this.state.newData.accounttype);
        formData.append("accountprovince", this.state.newData.accountprovince);
        formData.append("id", '');
        formData.append("phone", this.state.newData.phone);
        formData.append("province", this.state.newData.province);
        formData.append("city", this.state.newData.city);
        formData.append("address", this.state.newData.address);
        formData.append("accountname", this.state.newData.accountname);
        formData.append("account", this.state.newData.account);
        formData.append("bank", this.state.newData.bank);
        formData.append("accountcity", this.state.newData.accountcity);
        formData.append("accountaddress", this.state.newData.accountaddress);
        formData.append("linkman", this.state.newData.linkman);
        formData.append("linkmantel", this.state.newData.linkmantel);
        formData.append("appname", this.state.newData.appname);
        formData.append("website", this.state.newData.website);
        formData.append("staffIdCard", this.state.newData.staffIdCard);
        formData.append("staffName", this.state.newData.staffName);
        formData.append("status", "0");

        let parentId =  this.state.newData.parentId;
        if((parentId == undefined || parentId == "") && window.userType =="管理员"){
            parentId = "xj000001";
        }
        formData.append("parentAppId",parentId);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }


    autoSearch(appId=''){
        let self = this;
        api({
            method:'/agents/page',
            mode:'jsonp',
            isloading:false,
            args:{
                appId:appId.trim(),
            },
            callback:(e)=>{
                if(e.data){
                    if(e.data.data){
                        self.setState({autoName:e.data.data[0].name})
                    }else{
                        self.setState({autoName:'未匹配到服务商'})
                    }
                }else{
                    self.setState({autoName:'未匹配到服务商'})
                }
            },
            errCallback:(msg)=>{
                self.setState({autoName:'未匹配到服务商'})
            }
        });
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
                                dataSource.accountprovince = item.value;
                                dataSource.accountProvince = item.value
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
                        dataSource.accountaddress = item.value;
                        dataSource.accountAddress = item.value
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
                        dataSource.accounttype = item.value;
                        dataSource.accountType = item.value
                    }
                }
            }>{item.name}</Menu.Item>
        })
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
                               <Input placeholder="APP名称" className='classWidth'  defaultValue={dataSource.parentAppId}  onChange={(e)=>{
                                    this.state.newData.parentAppId = e;
                                    this.autoSearch(e)
                                }} />
                               <div className="flexStyle hide">
                                   <span></span>
                                   <span style={{fontSize:'14px',marginTop:'7px'}}>{this.state.autoName}</span>
                               </div>
                               <div className="classWidth ">
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>{this.state.autoName}</span>
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
                            <Feedback title="每次上传图片总大小务必小于1M" type="prompt"/>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>身份证正面：</span>
                                </div>
                                <div className="classWidth ">
                                    {  (dataSource.idCardFront != '' && dataSource.idCardFront != undefined)?
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
                                    {  (dataSource.idCardBack != '' && dataSource.idCardBack != undefined)?
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
                                    {  (dataSource.cardFront != '' && dataSource.cardFront != undefined)?
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
                                    { (dataSource.cardBack != '' && dataSource.cardBack != undefined)?
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
                                    {  (dataSource.license != '' && dataSource.license != undefined)?
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
                                
                                <Input placeholder="公司名称"   onChange={(e)=>{this.state.newData.name = e}} className='classWidth'  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                                </div>
                                <Input  placeholder="执照编号" className='classWidth'  onChange={(e)=>{this.state.newData.accountcity = e}}/>
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                                </div>
                                <Dropdown trigger={<Input  placeholder="渠道类型" className='classWidth' value={this.accountprovince}  />}
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
                                <Input placeholder="身份证号" className='classWidth' onChange={(e)=>{this.state.newData.staffIdCard = e}}  />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                                </div>
                                <Input placeholder="法人姓名" className='classWidth'  onChange={(e)=>{this.state.newData.principal = e}}  />
                                
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                                </div>
                                <Input placeholder="法人电话" className='classWidth'  onChange={(e)=>{this.state.newData.phone = e}}  />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                                </div>
                                <Input  placeholder="所在省份" className='classWidth'  onChange={(e)=>{this.state.newData.province = e}} />
                                
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                                </div>
                                <Input  placeholder="所在城市" className='classWidth' onChange={(e)=>{this.state.newData.city = e}}  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                                </div>
                                <Input  placeholder="详细地址" className='classWidth' onChange={(e)=>{this.state.newData.address = e}}  />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                                </div>
                                <Input  placeholder="法人邮箱" className='classWidth'  onChange={(e)=>{this.state.newData.linkman = e}} />

                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                                </div>
                                <Input  placeholder="商务邮箱" className='classWidth'  onChange={(e)=>{this.state.newData.linkmantel = e}}  />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                                </div>
                                <Input  placeholder="财务邮箱" className='classWidth'  onChange={(e)=>{this.state.newData.idtype = e}}  />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                                </div>
                                <Input placeholder="APP名称" className='classWidth'   onChange={(e)=>{this.state.newData.appname = e}}  />
                                
                            </Row>

                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                                </div>
                                <Input placeholder="官网地址" className='classWidth'  onChange={(e)=>{this.state.newData.website = e}} />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>业务联系：</span>
                                </div>
                                <Input placeholder="业务联系" className='classWidth'  onChange={(e)=>{this.state.newData.staffName = e}}   />
                            </Row>

                            { window.userType=="管理员" ?

                                <Row className="marginTop">
                                    <div className="flexStyle">
                                        <span></span>
                                        <span style={{fontSize:'14px',marginTop:'7px'}}>appId：</span>
                                    </div>
                                    <Input placeholder="APP名称" className='classWidth' onChange={(e)=>{this.state.newData.parentId = e}}  />
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
                                <Dropdown trigger={<Input  placeholder="账户类型" className='classWidth'    value={this.accounttype} />}
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
                                <Input placeholder="收款户名" className='classWidth'  onChange={(e)=>{this.state.newData.accountname = e}}/>
                            </Row>
                            <Row className="marginTop">
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                                </div>
                                <Input  placeholder="开户行" className='classWidth' onChange={(e)=>{this.state.newData.bank = e}} />
                                <div className="flexStyle">
                                    <span></span>
                                    <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                                </div>
                                <Input  placeholder="收款账户" className='classWidth' onChange={(e)=>{this.state.newData.account = e}}   />
                            </Row>

                            <span style={{fontSize:'24px',lineHeight:'60px'}}>图片信息</span>
                            <Feedback title="每次上传图片总大小务必小于1M" type="prompt"/>
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

