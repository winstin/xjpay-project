import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';

import RoleMangerDialog from '../../components/RoleMangerDialog/index.js'

import * as RoleManger from '../../actions/RoleManger.js'
import {promptToast} from "static/utils.js"


class RoleMangers extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.addname = "";
        this.tips = "";
        this.num = "";
        this.deptid = "";
        this.pName = "";
        this.pid = "";
        this.state = {
            visible: false,
            visibles:false,
            title:""
        };
        this.oldData = {}
    }


    componentDidMount(){
        const {getInitData} = this.props;
        getInitData();
    }


    searchData(){
        const{getInitData} = this.props;
        getInitData(1,this.name);
    }

    onchange(type,value){
        this.name = value;
    }
    onOpen(title){
        if(this.id == ""){
            promptToast('请选择操作项！');
            return
        }

        this.setState({
            visible: true,
            title:title
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

    onRowClick = (index,record)=>{
        this.id = index[0];
        this.oldData = record[0]
    }





    Remove = ()=>{
        if(this.id == ''){
            promptToast('请选择操作项！');
            return;
        }
        const{removeData,getInitData} = this.props;
        Dialog.confirm({
            content: '是否删除当前选项？',
            title: '删除',
            onOk:()=>{
                removeData(this.id);
                setTimeout(function(){
                    getInitData();
                },500)
            }
        });
    }


    onAdd(){
        const{addData,getInitData} = this.props;
        addData(this.name,this.pid,this.deptid,this.num,this.tips);
        setTimeout(function(){
            getInitData();
        },500)
    }

    onchange(oldData,newData){
        const{changeData,getInitData} = this.props;
        changeData(oldData,newData);
        setTimeout(function(){
            getInitData();
        },500)
    }

    cellRender = (value, index, record, context) => {
        switch(value){
            case 24:
                return "总公司";
                break;
            case 25:
                return "开发部";
                break;
            case 26:
                return "运营部";
                break;
            case 27:
                return "战略部";
                break;

        }
    }

    cellPid = (value, index, record, context) => {
        switch(value){
            case 0:
                return "-";
                break;
            case 1:
                return "超级管理员";
                break;
            case 5:
                return "临时管理员";
                break;
            case 7:
                return "管理员";
                break;
            case 6:
                return "渠道服务商";
                break;
            default:
                return "-";
                break;

        }
    }
    render() {
        const {dataSource,isLoad,total,containerHeight} = this.props;
        const {data} = this.state;
        
        return (
            <div>
                <Row>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>角色名称：</span>
                     <Row>
                        <Input placeholder="角色名称" className="textClsName"   style={{width:'120px'}} onChange={this.onchange.bind(this,'name')}/>
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.searchData.bind(this)}>搜索</Button>
                    </Row>
                </Row>
                <div className="marginTop-larger">
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen.bind(this,'添加')}>添加</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen.bind(this,'修改')}>修改</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.Remove} >删除</Button>
                    {/*<Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>权限配置</Button>*/}
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} rowSelection={{onChange: this.onRowClick,mode:'single'}} fixedHeader maxBodyHeight={containerHeight} >
                        <Table.Column title="名称" dataIndex="name"/>
                        <Table.Column title="上级角色" dataIndex="pid" cell={this.cellPid}/>
                        <Table.Column title="所在部门" dataIndex="deptid" cell={this.cellRender}/>
                        <Table.Column title="别名" dataIndex="tips"/>
                        {/*<Table.Column title="业务类型" dataIndex="time"/>
                        <Table.Column title="上游渠道" dataIndex="time"/>
                        <Table.Column title="交易类型" dataIndex="time"/>
                        <Table.Column title="结算类型" dataIndex="time"/>
                        <Table.Column title="鉴权费" dataIndex="d0fee"/>
                        <Table.Column title="结算费率" dataIndex="fee0"/>
                        <Table.Column title="代付费" dataIndex="time"/>*/}
                    </Table>
                </div>
                {/*<div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={1} size="large" onChange={this.handleChange.bind(this)} pageSize={} total={total}/>
                </div>*/}
                <RoleMangerDialog visible={this.state.visible} index={this} title={this.state.title} oldData = {this.oldData}/>
                
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.RoleManger.dataSource,
        isLoad:state.RoleManger.isLoad,
        total:state.RoleManger.total,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( RoleManger , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 237;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(RoleMangers))

