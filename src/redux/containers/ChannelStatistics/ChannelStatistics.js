import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ChannelStatistics from '../../actions/ChannelStatistics'
// import {getInitData} from '../../actions/ChannelStatistics';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import {FormatDateTime,getNowFormatDate} from "static/utils.js"
import Headers from '../../components/Header/index.js'

const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    }


class GunsIndex extends Component {
  constructor(props) {
        super(props);
        this.startDate = getNowFormatDate();
        this.endDate = getNowFormatDate();
        this.agentName = '';
        this.filterAppId = '';
        this.current = 1;
    }

  onSearch(value) {
      this.current = 1;
      const {getInitData} = (this.props);
      getInitData(1,this.startDate,this.endDate,this.agentName,this.filterAppId);
  }


  componentWillMount() {
      // console.log('Component WILL MOUNT!');
  }

  componentDidMount(){
      const {getInitData,emptyData} = (this.props);
      emptyData();
      getInitData();
  }

  reSetData(){
      this.current =1;
      const {getInitData} = (this.props);
      getInitData();
  }

  handleChange(current) {
    this.current = current;
    const {getInitData} = this.props;
    getInitData(current);
  }


  cellTime = (value, index, record, context) => {
        return FormatDateTime(value);
  }

  render() {
        const {containerHeight,dataSource,total,sum_agent_profit,countMerchantNum,countOrderNum,totalMoney,totalProfit} = (this.props);
        return (
            <div >
                <Headers title="渠道分润统计"/>
                <div className="display-flex-100 paddingLeft-12 paddingTop">
                    <div className="display-flex">
                        <span className='top-width'>总交易金额:</span>
                        <span className="text-width">{totalMoney}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易笔数:</span>
                        <span className="text-width">{countOrderNum}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易手续费分成:</span>
                        <span className="text-width">{totalProfit}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总D0手续费:</span>
                        <span className="text-width">{countMerchantNum}</span>
                    </div>
                </div>
                <div className='paddingTop paddingLeft-12'></div>
                <div className="display-flex-100 paddingLeft-12">
                    <div className="display-flex">
                        <span className='top-width'>总应结分润:</span>
                        <span className="text-width">{sum_agent_profit}</span>
                    </div>
                    <div className="display-flex">
                       
                    </div>
                    <div className="display-flex">
                       
                    </div>
                    <div className="display-flex">
                       
                    </div>
                </div>
                <div className="marginTop-20 paddingLeft-12">
                    <span className='top-sumtext-bold'>查询条件：</span>
                    <Input placeholder="所属渠道" size="large"  style={{width:'120px'}} onChange={(e)=>{this.agentName = e}}/>
                    <Input placeholder="渠道编号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                   {/* <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                    <RangePicker onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }}/>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onSearch.bind(this)}>搜索</Button>*/}
                </div>

                <div className="marginTop-20 paddingLeft-12">
                    <span className='top-sumtext-bold'>时间选择：</span>
                    <RangePicker size="large" onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }}/>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.reSetData.bind(this)}>重置</Button>
                </div>

                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title="交易日期" dataIndex="sumDate" />
                        <Table.Column title="渠道ID" dataIndex="appId"/>
                        <Table.Column title="渠道名称" dataIndex="name"/>
                        <Table.Column title="交易金额" dataIndex="sumTotalFee"/>
                        <Table.Column title="交易笔数" dataIndex="sumOrderNum"/>
                        <Table.Column title="交易手续费分成" dataIndex="sumTotalProfit"/>
                        <Table.Column title="D0手续费" dataIndex="sumD0fee"/>
                        <Table.Column title="应结分润" dataIndex="sumAgentProfit"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination current={this.current} size="large" total={total} pageSize={20} onChange={this.handleChange.bind(this)} />

                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ChannelStatistics.dataSource || [],
        total:state.ChannelStatistics.total,
        countMerchantNum:state.ChannelStatistics.countMerchantNum,
        countOrderNum:state.ChannelStatistics.countOrderNum,
        totalMoney:state.ChannelStatistics.totalMoney,
        totalProfit:state.ChannelStatistics.totalProfit,
        sum_agent_profit:state.ChannelStatistics.sum_agent_profit
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ChannelStatistics , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 370;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GunsIndex))

