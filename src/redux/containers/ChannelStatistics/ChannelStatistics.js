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
import Menu from 'qnui/lib/menu';
import Dropdown from 'qnui/lib/dropdown';
const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    }
const upstreamMent = [{
    name:'全部',
    value:''
},{
    name:'Q1',
    value:'HF_SERVICE'
},{
    name:'Q2',
    value:'CONGYU_SERVICE'
},{
    name:'Q3',
    value:'KFT_SERVICE'
},{
    name:'Q4',
    value:'HJ_SERVICE'
}]

class GunsIndex extends Component {
  constructor(props) {
        super(props);
        this.state = {
            visibles:false,
            visible:false,
        };
        this.startDate = getNowFormatDate();
        this.endDate = getNowFormatDate();
        this.agentName = '';
        this.filterAppId = '';
        this.current = 1;
        this.upstream="";
    }

  onSearch(value) {
      this.current = 1;
      const {getInitData} = (this.props);
      getInitData(1,this.startDate,this.endDate,this.agentName,this.filterAppId,this.upstream);
  }

  onExport(){
      const {exportData} = (this.props);
      exportData(this.startDate,this.endDate,this.agentName,this.filterAppId,this.upstream); 
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

  onVisibleChange = (visibles,type,e) => {
      this.setState({
          visibles:visibles
      })
  };

  render() {
        const {containerHeight,dataSource,total,sum_agent_profit,countMerchantNum,countOrderNum,totalMoney,totalProfit} = (this.props);
        let PayStatement = upstreamMent.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.upstream = item.value;this.upstreamName = item.name}}>{item.name}</Menu.Item>
        })
        return (
            <div >
                <Headers title="渠道分润统计"/>
                <Row className="paddingTop">
                    <div className="display-flex">
                        <span className='top-sumtext-bold'>订单金额:</span>
                        {<span className="text-center new-border" >{totalMoney}</span>}

                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext'>交易笔数:</span>
                        <span className="text-center new-border">{countOrderNum}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext'>手续费金额:</span>
                        <span className="text-center new-border">{totalProfit}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext '>代付费金额:</span>
                        <span className="text-center new-border">{countMerchantNum}</span>
                    </div>
                </Row>
                <div className='paddingTop paddingLeft-12'></div>
                <Row className="paddingTop">
                    <div className="display-flex">
                        <span className='top-sumtext-bold'>应结分润:</span>
                        {<span className="text-center new-border" >{sum_agent_profit}</span>}

                    </div>
                    <div className="display-flex">
                        
                    </div>
                    <div className="display-flex">
                        
                    </div>
                    <div className="display-flex">
                       
                    </div>
                </Row>
                
                <Row className="marginTop-20">
                    <div className="display-flex">
                        <span className='top-sumtext-bold'>查询条件:</span>
                        <Input placeholder="所属渠道" size="large"  style={{width:'120px'}} onChange={(e)=>{this.agentName = e}}/>
                        <Input placeholder="渠道编号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                        <Dropdown trigger={<Input placeholder="上游渠道" size="large"  style={{width:'120px',marginLeft:'12px'}} value={this.upstreamName}/>}
                                  triggerType="click"
                                  visible={this.state.visibles}
                                  onVisibleChange={this.onVisibleChange}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {PayStatement}
                            </Menu>
                        </Dropdown>
                    </div>
                    <div className="display-flex">

                    </div>
                    <div className="display-flex">
                        
                    </div>
                    <div className="display-flex">
                       
                    </div>
                </Row>
                {/*<div className="marginTop-20 paddingLeft-12">
                    <span className='top-sumtext-bold'>查询条件：</span>
                    <Input placeholder="所属渠道" size="large"  style={{width:'120px'}} onChange={(e)=>{this.agentName = e}}/>
                    <Input placeholder="渠道编号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                </div>*/}

                <Row className="marginTop-20" >
                    <span className='top-sumtext-bold'>时间选择：</span>
                    <RangePicker size="large" onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }}/>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="secondary" style={{width:'80px',marginLeft:'10px'}} size="large" onClick={this.onExport.bind(this)}>导出</Button>
                    <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.reSetData.bind(this)}>重置</Button>
                </Row>

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

