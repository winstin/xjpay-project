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

import RoleMangerDialog from '../../components/RoleMangerDialog/index.js'



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
class RoleManger extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.state = {
            data: getData(30),
            visible: false,
            visibles:false
        };
    }


    componentDidMount(){
        const {getInitData} = this.props;
        getInitData();
    }

    handleChange(current) {
        console.log(this.props);
        const {getData} = this.props;
        getData(current);
    }


    searchData(){
        const{SearchData} = this.props;
        SearchData(this.id,this.name);
    }

    onchange(type,value){
        // alert(type+'==='+value);
        if(type == "id"){
            this.id = value;
        }else{
            this.name = value;
        }

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
        
        return (
            <div>
                <Row>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>角色名称：</span>
                     <Row>
                        <Input placeholder="角色名称" className="textClsName"   style={{width:'120px'}} onChange={this.onchange.bind(this,'id')}/>
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.searchData.bind(this)}>搜索</Button>
                    </Row>
                </Row>
                <div className="marginTop-larger">
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>添加</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>修改</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>删除</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>权限配置</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={data} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight} rowSelection={rowSelection}>
                        <Table.Column title="名称" dataIndex="id"/>
                        <Table.Column title="上级角色" dataIndex="createTime"/>
                        <Table.Column title="所在部门" dataIndex="appid"/>
                        <Table.Column title="别名" dataIndex="agentName"/>
                        {/*<Table.Column title="业务类型" dataIndex="time"/>
                        <Table.Column title="上游渠道" dataIndex="time"/>
                        <Table.Column title="交易类型" dataIndex="time"/>
                        <Table.Column title="结算类型" dataIndex="time"/>
                        <Table.Column title="鉴权费" dataIndex="d0fee"/>
                        <Table.Column title="结算费率" dataIndex="fee0"/>
                        <Table.Column title="代付费" dataIndex="time"/>*/}
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={1} size="large" onChange={this.handleChange.bind(this)} pageSize={15} total={total}/>
                </div>
                <RoleMangerDialog visible={this.state.visible} index={this} title="角色分配"/>
                
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ServiceRate.dataSource,
        isLoad:state.ServiceRate.isLoad,
        total:state.ServiceRate.total,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 237;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(RoleManger))

