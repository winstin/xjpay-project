import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ServiceManger from '../../actions/ServiceManger'
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';

import ServiceMangerDialog from '../../components/ServiceMangerDialog/index.js'

import {errorToast} from "static/utils.js"



// import {showLoading,hideLoading,isEmpty} from "static/utils.js"

const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    }
const rowSelection = {
        onChange: onRowClick,
    };

const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);
class ServiceMangers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            visibles:false,
            tip:''
        };

    }

    onSearch(value) {
        console.log(value);
    }


    componentWillMount() {

    }

    componentDidMount(){
        const {getInitData} = (this.props);
        getInitData();
    }


   onOpen(type){
        const {chooseDatas} = (this.props);

        if(chooseDatas.length == 0){
            errorToast('请选择一条记录！');
            return;
        }

        if(type == "add"){
            this.setState({
                visible: true,
                tip:'添加'
            });
        }else{
            this.setState({
                visible: true,
                tip:'修改'
            });
        }
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


    onRowClick = (index,record)=>{
        const {setData} = this.props;
        setData(index,record);
    }

    changePageno(e){
        const {getInitData} = (this.props);
        getInitData(e);
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

    render() {
        const {containerHeight,dataSource,total,chooseDatas} = (this.props);

        return (
            <div>
                <Row >
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="渠道名称" className="textClsName"  style={{width:'120px',marginLeft:'0px'}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} >搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen.bind(this,'add')}>添加</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen.bind(this,'change')}>修改</Button>
                    <Button type="secondary" style={{width:'120px',marginLeft:'10px'}} >冻结/启用</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} fixedHeader maxBodyHeight={containerHeight} rowSelection={{onChange: this.onRowClick,mode:'single'}}>
                        <Table.Column title="渠道编号" dataIndex="appId" width={100}/>
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

                {chooseDatas.length==1 && <ServiceMangerDialog  visible={this.state.visible} index={this} title={this.state.tip} dataSource={chooseDatas[0]}/>}
                
            </div>
        );
    }
    
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ServiceManger.dataSource,
        total:state.ServiceManger.total,
        chooseDatas:state.ServiceManger.chooseDatas
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
