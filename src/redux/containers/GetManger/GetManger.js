import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';
import Pagination from 'qnui/lib/pagination';
import Select, {Option} from 'qnui/lib/select';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Dimensions from 'react-dimensions';
import * as GetManger from '../../actions/GetManger'

import {FormatDateTime} from "static/utils.js"

// import MySettings from './MySettings/MySettings';
// import MyBlackList from './MyBlackList/MyBlackList';
// import MyEvaLog from './MyEvaLog/MyEvaLog';


import './GetManger.css'

const change = function(value) {
    console.log(value);
};
const onRowClick = function(record, index, e){
        console.log(record, index, e);
    },
    getData = (i,j) =>{
        let result = [];
        for (let k =i; k < j; k++) {
          result.push({
              title:{
                name: `Quotation for 1PCS Nano ${3+i}.0 controller compatible`,
                },
              id:100306660940+k,
              time: 2000 + k
            })
        }
        return result;
    }
    

class GetMangers extends Component {
    constructor(props){
        super(props);
        this.state = {
            rowSelection: {
              onChange: this.onChange.bind(this),
              onSelect: function(selected, record, records){ console.log('onSelect',selected, record, records) },
              onSelectAll: function(selected, records){ console.log('onSelectAll', selected, records) },
              selectedRowKeys: []
            },
            dataSource: getData(0, 5),
            rateState: '所有'
        }
        this.startDate='';
        this.endDate='';
    }

    componentDidMount(){
        // console.log("首次渲染页面")
        // console.log(this.props)
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
    }
    onSelect(value){
        this.setState({
            rateState:value
        });
    }
    onChange(ids, records){
        let {rowSelection} = this.state;
        rowSelection.selectedRowKeys = ids;
        console.log('onChange', ids, records);
        this.setState({ rowSelection });
    }
    modifyDataSource(){
        this.setState({
          dataSource: getData(9, 14)
        })
    }

    cellTime = (value, index, record, context) => {
        return FormatDateTime(value);
    }

    onSearch() {
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate);
    }
    render(){
        const {add, value, switchState ,changeSwitchState,containerHeight,dataSource,sumTotalFee,sumOrderNum,sumD0fee,sumProfit,sumTotalProfit} = this.props;
        const TabPane = Tab.TabPane;
        return(
            <div className="paddingTop">
                <div className="display-flex-100">
                    <div className="display-flex">
                        <span className='top-width'>总交易金额:</span>
                        <span className="text-width">{sumTotalFee}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易笔数:</span>
                        <span className="text-width">{sumOrderNum}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易手续费分成:</span>
                        <span className="text-width">{sumProfit}</span>
                    </div>
                </div>
                <div className="marginTop"></div>
                <div className="display-flex-100">
                    <div className="display-flex">
                        <span className='top-width'>总D0手续费:</span>
                        <span className="text-width">{sumD0fee}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总收益:</span>
                        <span className="text-width">{sumTotalProfit}</span>
                    </div>
                    <div className="display-flex">
                        
                    </div>
                </div>


                <div className="marginTop-20">
                    <span className='top-sumtext-bold'>时间选择：</span>
                    <RangePicker size="large" onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }} />
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                </div>
                <div style={{marginTop:'20px',marginBottom:'10px'}}>
                    <Table dataSource={dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title='交易日期' dataIndex="sumDate" />
                        <Table.Column title='交易金额' dataIndex="sumTotalFee" />
                        <Table.Column title='交易笔数' dataIndex="sumOrderNum" />
                        <Table.Column title='交易手续费分成' dataIndex="sumProfit" />
                        <Table.Column title='D0手续费' dataIndex="sumD0fee"  />
                        <Table.Column title='收益' dataIndex="sumTotalProfit" />
                    </Table>
                </div>
                {/*<div style={{marginTop:'20px',float:'right'}}>
                    <Pagination pageSizeSelector={false} total={2} onChange={change}/>
                </div>*/}
                
            </div>
        );
    }
}



function mapStateToProps(state, ownProps){
    return {
        dataSource:state.GetManger.dataSource|| [],
        total:state.GetManger.total,
        sumTotalFee:state.GetManger.sumTotalFee,
        sumOrderNum:state.GetManger.sumOrderNum,
        sumProfit:state.GetManger.sumProfit,
        sumD0fee:state.GetManger.sumD0fee,
        sumTotalProfit:state.GetManger.sumTotalProfit,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( GetManger , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 290;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GetMangers))

