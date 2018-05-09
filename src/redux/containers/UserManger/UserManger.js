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
import CustomDialog from '../../components/CustomDialog/index.js'
import RoleDialog from '../../components/RoleDialog/index.js'

import './UserManger.css';
import * as UserManger from '../../actions/UserManger'
import {promptToast} from "static/utils.js"


class UserMangers extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.state = {
            visible: false,
            visibles:false,
            rolevisible:false,
            title:""
        };
        this.removeid = "";
        this.startDate='';
        this.endDate='';
        this.OldData = {};
        this.roleIds = "";
        this.current = 1;
    }


    componentDidMount(){
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
    }

    handleChange(current) {
        this.current = current;
        const {getInitData} = this.props;
        getInitData(current,this.startDate,this.endDate,this.name);
        // this.initState();
    }


    initState(){
        // this.removeid = "";
        // this.OldData = {};
        // this.roleIds = ""
    }


    searchData(){
        const{getInitData} = this.props;
        getInitData(1,this.startDate,this.endDate,this.name);
    }

    onchange(type,value){
        this.name = value;
    }
    onOpen(title){

        if(title == "修改"){
            if(this.removeid == ""){
                promptToast('请选择操作项！');
                return;
            }
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

    reLoad(){
        let self = this;
        const{getInitData} = this.props;
        setTimeout(
            function(){
                getInitData(self.current,self.startDate,self.endDate,self.name);
            }
        ,500)
    }

    addData(data){
        const{addData} = this.props;
        addData(data);
        this.reLoad();
    }

    updateData(newData,oldData){
        let self = this;
        const{updateData,getInitData} = this.props;
        updateData(newData,oldData);
        this.reLoad();
    }

    freezeData(userId){
        if(this.removeid == ""){
            promptToast('请选择操作项！');
            return;
        }
        let self = this;
        const{freezeData,getInitData} = this.props;

        Dialog.confirm({
            content: '是否冻结'+this.OldData.name+'帐号？',
            title: '退出',
            onOk:()=>{
                freezeData(this.removeid);
                this.reLoad();
            }
        });
        
    }

    unfreezeData(userId){
        if(this.removeid == ""){
            promptToast('请选择操作项！');
            return;
        }
        let self = this;
        const{unfreezeData,getInitData} = this.props;
        unfreezeData(this.removeid);
        this.reLoad();
    }


    removeData(userId){
        if(this.removeid == ""){
            promptToast('请选择操作项！');
            return;
        }
        const{removeData} = this.props;
        Dialog.confirm({
            content: '是否删除'+this.OldData.name+'帐号？',
            title: '退出',
            onOk:()=>{
              removeData(this.removeid);
              this.reLoad();
            }
        });
        
    }


    resetData(userId){
        if(this.removeid == ""){
            promptToast('请选择操作项！');
            return;
        }
        const{resetData} = this.props;
        resetData(this.removeid);
        this.reLoad();
    }


    setRoleid(){
        if(this.roleIds == ""){
            promptToast('请为'+this.OldData.name+'选择角色类型！');
            return;
        }
        const{setRoleId} = this.props;
        setRoleId(this.removeid,this.roleIds);
        this.reLoad();
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
        this.removeid = index[0];
        this.OldData = record[0];
    }
    render() {
        const {dataSource,isLoad,total,containerHeight} = this.props;
        const {data} = this.state;
        
        return (
            <div>
                <Row>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>用户名称：</span>
                    <Input placeholder="帐号/姓名/手机号" className="textClsName"   className='marginRight' onChange={this.onchange.bind(this,'name')}/>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>注册时间：</span>
                    <RangePicker onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }} />
                    
                </Row>
                <Row className='marginTop-larger'>
                    <Button type="primary" style={{width:'100px'}} onClick={this.searchData.bind(this)}>搜索</Button>
                    
                    {window.userType == "超级管理员" && <Button type="normal" className='top-btn' onClick={this.onOpen.bind(this,"添加")}>添加</Button>}
                    {window.userType == "超级管理员" &&<Button type="normal" className='top-btn' onClick={this.onOpen.bind(this,"修改")}>修改</Button>}
                    {window.userType == "超级管理员" &&<Button type="primary" className='top-btn' onClick={this.removeData.bind(this)}>删除</Button>}
                    {window.userType == "超级管理员" &&<Button type="normal" className='top-btn' onClick={this.resetData.bind(this)}>重置密码</Button>}
                    {window.userType == "超级管理员" &&<Button type="primary" className='top-btn' onClick={
                        ()=>{
                            if(this.removeid == ""){
                                promptToast('请选择操作项！');
                                return;
                            }
                            this.setState({rolevisible:true})
                        }}
                    >角色分配</Button>}

                    <Button type="secondary" className='top-btn' onClick={this.freezeData.bind(this)}>冻结</Button>
                    <Button type="normal" className='top-btn' onClick={this.unfreezeData.bind(this)}>解除冻结</Button>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} fixedHeader maxBodyHeight={containerHeight} rowSelection={{onChange: this.onRowClick,mode:'single'}}>
                        <Table.Column title="账号" dataIndex="account"/>
                        <Table.Column title="姓名" dataIndex="name"/>
                        <Table.Column title="性别" dataIndex="sexName"/>
                        <Table.Column title="角色" dataIndex="roleName"/>
                        <Table.Column title="部门" dataIndex="deptName"/>
                        <Table.Column title="邮箱" dataIndex="email"/>
                        <Table.Column title="电话" dataIndex="phone"/>
                        <Table.Column title="创建时间" dataIndex="createtime"/>
                        <Table.Column title="状态" dataIndex="statusName"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={1} size="large" onChange={this.handleChange.bind(this)} pageSize={20} total={total}/>
                </div>

                <CustomDialog visible={this.state.visible} index={this} title={this.state.title} oldData={this.OldData}/>
                <RoleDialog visible={this.state.rolevisible} index={this} title="角色分配" />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.UserManger.dataSource,
        isLoad:state.UserManger.isLoad,
        total:state.UserManger.total,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( UserManger , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 237;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(UserMangers))

