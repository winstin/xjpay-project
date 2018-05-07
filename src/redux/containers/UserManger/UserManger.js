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
    
const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);
class UserMangers extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.state = {
            data: getData(30),
            visible: false,
            visibles:false,
            rolevisible:false
        };
        this.startDate='';
        this.endDate=''
    }


    componentDidMount(){
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
    }

    handleChange(current) {
        console.log(this.props);
        const {getData} = this.props;
        getData(current);
    }


    searchData(){
        const{getInitData} = this.props;
        getInitData(1,this.startDate,this.endDate,this.name);
    }

    onchange(type,value){
        this.name = value;
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
    render() {
        const {dataSource,isLoad,total,containerHeight} = this.props;
        const {data} = this.state;
        
       console.log(dataSource)
        // if(!isLoad){
            console.log('服务商')
            console.log(dataSource);
            return (
                <div>
                    <Row>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>用户名称：</span>
                        <Input placeholder="帐号/姓名/手机号" className="textClsName"   className='marginRight' onChange={this.onchange.bind(this,'name')}/>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>注册时间：</span>
                        <RangePicker onChange={(a, b) => {
                            console.log(b[0]);
                            this.startDate = b[0];
                            this.endDate = b[1];
                        }} />
                        
                    </Row>
                    <Row className='marginTop-larger'>
                        <Button type="primary" style={{width:'100px'}} onClick={this.searchData.bind(this)}>搜索</Button>
                        <Button type="normal" className='top-btn' onClick={this.onOpen}>添加</Button>
                        <Button type="normal" className='top-btn' onClick={this.onOpen}>修改</Button>
                        <Button type="primary" className='top-btn' onClick={this.searchData.bind(this)}>删除</Button>
                        <Button type="normal" className='top-btn' onClick={this.onOpen}>重置密码</Button>
                        <Button type="primary" className='top-btn' onClick={this.searchData.bind(this)}>冻结</Button>
                        <Button type="normal" className='top-btn' onClick={this.onOpen}>解除冻结</Button>
                        <Button type="primary" className='top-btn' onClick={()=>{this.setState({rolevisible:true})}}>角色分配</Button>
                    </Row>
                    <div style={{marginTop:'20px'}}>
                        <Table dataSource={dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight} rowSelection={rowSelection}>
                            <Table.Column title="账号" dataIndex="account"/>
                            <Table.Column title="姓名" dataIndex="name"/>
                            <Table.Column title="性别" dataIndex="sexName"/>
                            <Table.Column title="角色" dataIndex="roleName"/>
                            <Table.Column title="部门" dataIndex="deptName"/>
                            {/*<Table.Column title="邮箱" dataIndex="time"/>
                            <Table.Column title="电话" dataIndex="time"/>*/}
                            <Table.Column title="创建时间" dataIndex="createtime"/>
                            <Table.Column title="状态" dataIndex="statusName"/>
                        </Table>
                    </div>
                    <div style={{marginTop:'20px',float:'right'}}>
                        <Pagination defaultCurrent={1} size="large" onChange={this.handleChange.bind(this)} pageSize={20} total={total}/>
                    </div>

                    <CustomDialog visible={this.state.visible} index={this} title="添加"/>
                    <RoleDialog visible={this.state.rolevisible} index={this} title="角色分配" />
                </div>
            );
        // }else{
        //     return <div style={{marginTop:'20px',float:'right'}}>111</div>
        // }
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

