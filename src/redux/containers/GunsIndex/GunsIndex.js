import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as GunIndex from '../../actions/GunsIndex.js'
// import {getInitData} from '../../actions/ServiceRate';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import TimePicker from 'qnui/lib/time-picker';

import {FormatDateTime,promptToast} from "static/utils.js"

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

 

class GunsIndex extends Component {
  constructor(props) {
        super(props);

        this.state = {
            current:1
        };

        this.startDate='';
        this.endDate='';
        this.merchantName='';
        this.mchId='';
        // this.startDate='';
        // this.startDate='';
        this.lockId = "";
        this.current = 1;
    }

    onSearch() {
        this.setState({current:1})
        const {getInitData} = (this.props);
        getInitData(1,this.merchantName,this.mchId,this.startDate,this.endDate);
    }


    componentWillMount() {
      // console.log('Component WILL MOUNT!');
    }

    componentDidMount(){
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
        // $("table tr:even").css("background","#ccc");
        // var tr = document.getElementsByTagName("tr");
        // for(var i = 1; i < tr.length ; i += 6){ // 从第二行开始遍历，i初始为1，递增6
        //     tr[i].style.backgroundColor = "red";
        // }
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
        this.setState({current:e})
        const {getInitData} = (this.props);
        getInitData(e);
    }


    cellRender = (value, index, record, context) => {
        return (value/100).toFixed(2);
    }

    cellTime = (value, index, record, context) => {
        return FormatDateTime(value);
    }
    
    cellType = (value, index, record, context) => {
        switch (value) {
            case '0':
                return '有积分';
            case '1':
                return '无积分';
            case '2':
                return '标扣';

        }
    }

    onLock(){
        
        const {lockChants} = this.props;
        if(this.lockId == ""){
            promptToast("请选择冻结商户！");
            return;
        }
        lockChants(this.lockId);
        this.lockId = "";

    }

    onRowClick = (index,record)=>{
        // console.log(record);
        this.lockId = record[0].mchId;
    }

    render() {
        const {containerHeight,dataSources,total} = (this.props);

        return (
            <div>
                <div className="paddingTop">
                    <span className='top-sumtext-bold'>查询条件：</span>
                    <Input placeholder="商户名称" size="large"   style={{width:'160px'}} onChange={(e)=>{this.merchantName = e}}/>
                    <Input placeholder="商户编号" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.mchId = e}}/>
                    {/*<span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                    <RangePicker  onChange={(a, b) => {
                        // console.log(b[0]);
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }} />
                    <Button type="primary" size="large" style={{width:'100px',marginLeft:'10px'}}  onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="secondary" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.onLock.bind(this)}>冻结</Button>*/}
                </div>
                <div className='marginTop-20'>
                    <span className='top-sumtext-bold'>时间选择：</span>
                    <RangePicker  size="large" onChange={(a, b) => {
                        // console.log(b[0]);
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }} />
                    <Button type="primary" size="large" style={{width:'100px',marginLeft:'10px'}}  onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="secondary" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.onLock.bind(this)}>冻结</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSources} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight} rowSelection={{onChange: this.onRowClick,mode:'single'}}>
                        <Table.Column title="商户号" dataIndex="mchId" width="90"/>
                        <Table.Column title="商户名称" dataIndex="name" width="90"/>
                        <Table.Column title="身份证号" dataIndex="idCard"/>
                        <Table.Column title="结算卡号" dataIndex="cardNumber"/>
                        <Table.Column title="渠道名称" dataIndex="agentName" width="100"/>
                        <Table.Column title="渠道编号" dataIndex="channelAgent.appId" width="90"/>
                        <Table.Column title="建档时间" dataIndex="createTime" cell={this.cellTime} width="90"/>
                        <Table.Column title="商户类型" dataIndex="mchType" cell={this.cellType} width="90"/>
                        <Table.Column title="电话" dataIndex="tel" width="100"/>
                        <Table.Column title="费率（‰）" dataIndex="fee0" width="95"/>
                        <Table.Column title="代付费" dataIndex="d0fee" cell={this.cellRender} width="70"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination current={this.state.current} size="large" total={total} pageSize={20} onChange={this.changePageno.bind(this)} />
                </div>
            </div>
        );
    }
    
}

function mapStateToProps(state, ownProps){
    return {
        dataSources:state.GunIndex.dataSources|| [],
        total:state.GunIndex.total
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( GunIndex , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 250;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GunsIndex))

