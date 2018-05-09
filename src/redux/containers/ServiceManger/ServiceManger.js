import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ServiceManger from '../../actions/ServiceManger'
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';

import ServiceMangerDialog from '../../components/ServiceMangerDialog/index.js'
import DetailsDialog from '../../components/DetailsDialog/index.js'

import {errorToast} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  服务商管理页面
 * @version  [version]
 * @return   {[type]}        [description]
 */
class ServiceMangers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            visibles:false,
            visible0:false,
            tip:''
        };
        this.appId="";
        this.appName="";


        this.id = "";
        this.name='';
        this.signdate='';
        this.expiredate='';
        this.principal='';
        this.phone='';
        this.province='';
        this.city='';
        this.address='';
        this.accountname='';
        this.account='';
        this.bank='';
        this.accounttype='';
        this.accountprovince='';
        this.accountcity='';
        this.accountaddress='';
        this.idtype='';
        this.linkman='';
        this.linkmantel='';
        this.appname='';
        this.website
        this.current = 1;

    }

    onSearch(appId,appName) {
        const {getInitData,SearchData} = (this.props);
        // getInitData(1,this.appId,this.appName);
        SearchData(this.appId,this.appName);
    }


    componentWillMount() {

    }

    componentDidMount(){
        const {getInitData} = (this.props);
        getInitData();
    }

    reLoad(){
        let self = this;
        const{getInitData} = this.props;
        setTimeout(
            function(){
                getInitData(self.current,self.appId,self.appName);
            }
        ,500)
    }

    /**
     * @Author   Winstin
     * @DateTime 2018-05-04
     * @param    string
     * @license  添加修改
     * @version  [version]
     * @param    {[type]}   type [description]
     * @return   {[type]}        [description]
     */
    onOpen(type){
        const {chooseDatas,updateData} = (this.props);
        if(type == "add"){
            this.setState({
                visible: true,
                tip:'添加'
            });
        }else{
            if(chooseDatas.length == 0){
                errorToast('请选择一条记录！');
                return;
            }
            this.setState({
                visible: true,
                tip:'修改'
            });
        }
    };

    onClose = () => {
        this.setState({
            visible: false,
            visible0:false
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



    onRowClick = (index,record)=>{
        const {setData} = this.props;
        setData(index,record);
    }


    /**
     * @Author   Winstin
     * @DateTime 2018-05-04
     * @param    string
     * @license  翻页
     * @version  [version]
     * @param    {[type]}   e [description]
     * @return   {[type]}     [description]
     */
    changePageno(e){
        this.current = e;
        const {getInitData} = (this.props);
        getInitData(e);
    }


    showDeatil(value){
        const {getDetailData} = (this.props);
        getDetailData(value)
        this.setState({visible0:true})
    }


    cellRender = (value, index, record, context) => {
        if(value == 1){
            return '对公';
        }else{
            return '对私';
        }
    }

    cellAccountprovince = (value, index, record, context) => {
        if(value == 1){
            return '平台服务商';
        }else{
            return '渠道服务商';
        }
    }

    cellAccountaddress = (value, index, record, context) => {
        if(value == 1){
            return '企业代理';
        }else{
            return '个人代理';
        }
    }

    cellAppId = (value, index, record, context) => {
        return <div onClick={this.showDeatil.bind(this,value)}>{value}</div>
    }

    updateData(newData){
        const {updateData,chooseDatas} = this.props;
        updateData(chooseDatas,newData);
        this.reLoad();
    }

    addData(newData){
        const {addData} = this.props;
        addData(newData);
        this.reLoad();
    }

    render() {
        const {containerHeight,dataSource,total,chooseDatas,downDetails,upDetail} = (this.props);

        return (
            <div>
                <Row >
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px'}} onChange={(e)=>{this.appId = e}}/>
                        
                        <Input placeholder="渠道名称" className="textClsName"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.appName = e}}/>
                        
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onSearch.bind(this)}>搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen.bind(this,'add')}>添加</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen.bind(this,'change')}>修改</Button>
                    <Button type="secondary" style={{width:'120px',marginLeft:'10px'}} >冻结/启用</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} fixedHeader maxBodyHeight={containerHeight} rowSelection={{onChange: this.onRowClick,mode:'single'}}>
                        <Table.Column title="渠道编号" dataIndex="appId" width={100} cell={this.cellAppId}/>
                        <Table.Column title="公司名称" dataIndex="name" width={100}/>
                        <Table.Column title="执照编号" dataIndex="accountcity" width={200}/>
                        <Table.Column title="渠道类型" dataIndex="accountprovince" cell={this.cellAccountprovince} width={100}/>
                        <Table.Column title="渠道级别" dataIndex="accountaddress" cell={this.cellAccountaddress} width={100}/>
                        <Table.Column title="签约时间" dataIndex="signdate" width={100}/>
                        <Table.Column title="到期时间" dataIndex="expiredate" width={100}/>
                        <Table.Column title="法人姓名" dataIndex="principal" width={100}/>
                        <Table.Column title="法人电话" dataIndex="phone" width={130}/>
                        <Table.Column title="所在省份" dataIndex="province" width={100}/>

                        <Table.Column title="所在城市" dataIndex="city" width={100}/>
                        <Table.Column title="详细地址" dataIndex="address" width={100}/>
                        <Table.Column title="法人邮箱" dataIndex="linkman" width={180}/>
                        <Table.Column title="商务邮箱" dataIndex="linkmantel" width={180}/>

                        <Table.Column title="财务邮箱" dataIndex="idtype" width={180}/>
                        <Table.Column title="APP名称" dataIndex="appname"  width={100}/>

                        <Table.Column title="官网地址" dataIndex="website" width={100}/>
                        <Table.Column title="账户类型" dataIndex="accounttype" cell={this.cellRender} width={100}/>
                        <Table.Column title="收款户名" dataIndex="accountname" width={100}/>
                        <Table.Column title="开户行" dataIndex="bank" width={100}/>
                        <Table.Column title="收款账户" dataIndex="account" width={200}/>

                        <Table.Column title="状态" dataIndex="time" width={100}/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={1} size="large" total={total} pageSize={20} onChange={this.changePageno.bind(this)} />
                </div>


                <DetailsDialog  visible={this.state.visible0} index={this} downDetails={downDetails} upDetail={upDetail}/>

                <ServiceMangerDialog  visible={this.state.visible} index={this} title={this.state.tip} dataSource={chooseDatas[0]}/>
                
            </div>
        );
    }
    
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ServiceManger.dataSource,
        total:state.ServiceManger.total,
        chooseDatas:state.ServiceManger.chooseDatas,
        downDetails:state.ServiceManger.downDetails,
        upDetail:state.ServiceManger.upDetail,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceManger , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 230;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(ServiceMangers))
