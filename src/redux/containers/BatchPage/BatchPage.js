import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as BatchPageAction from '../../actions/BatchPageAction'
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import TradeDetailDialog from '../../components/TradeDetailDialog/index.js'
import {FormatDateTime} from "static/utils.js"
import Menu from 'qnui/lib/menu';
import Config from 'static/config.js'
import Dropdown from 'qnui/lib/dropdown';




class BatchPage extends Component {
  constructor(props) {
        super(props);

        this.state = {
            detailvisible:false,
            orderdata:{},
            visibles:false
        };

        this.startDate='';
        this.endDate='';
        this.merchantName='';
        this.mchId='';
        this.orderNo='';
        this.agentName='';
        this.filterAppId='';
        this.orderState='';
        this.result='';
        this.agentOrderNo='';
        this.orderSta=''

    }

    onSearch(value) {
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate,this.orderNo,this.agentOrderNo,this.agentName,this.filterAppId,this.merchantName,this.mchId,this.orderState,this.result);
    }

    onExport(){
        const {exportData} = (this.props);
        exportData(1,this.startDate,this.endDate,this.orderNo,this.agentOrderNo,this.agentName,this.filterAppId,this.merchantName,this.mchId,this.orderState,this.result); 
    }


    componentWillMount() {
    }

    componentDidMount(){
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
    }

    onRowClick(record, index, e) {
        this.setState({detailvisible:true,orderdata:record})
    }
 
    cellRender = (value, index, record, context) => {
        return (value/100).toFixed(2);
    }


    cellTime = (value, index, record, context) => {
        return FormatDateTime(value);
    }


    cellState = (value, index, record, context) => {

        switch (value) {
            case "A":
                return <span style={{color:'orange'}}>支付中</span>;
            case "B":
                return <span style={{color:'red'}}>支付失败</span>;
            case "C":
                return <span style={{color:'green'}}>支付完成</span>;
            case "D":
                return <span style={{color:'orange'}}>结算中</span>;
            case "E":
                return <span style={{color:'green'}}>结算成功</span>;
            case "F":
                return "预支付";
            default:
                return "";
        }
    }


    handleChange(current) {
        const {getInitData} = this.props;
        getInitData(current);
    }


    onVisibleChange = (visibles,type,e) => {
        this.setState({
            visibles:visibles
        })
    };
    

    render() {
        const {containerHeight,dataSource,total,countMerchantNum,countOrderNum,totalMoney,totalProfit} = (this.props);
        let PayStatement = Config.PayState.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.orderState = item.value;this.orderSta = item.name}}>{item.name}</Menu.Item>
        })
        return (
            <div>
                <Row>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总商户数:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>{countMerchantNum}</span>
                    </div>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总订单数:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>{countOrderNum}</span>
                    </div>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总金额:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>{totalMoney}</span>
                    </div>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总分润:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>{totalProfit}</span>
                    </div>
                </Row>
                
                <div className="marginTop">
                    <Row className="marginTop">
                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px'}}>订单号：</span>
                        <Input placeholder="订单号" size="large"   style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.orderNo = e}}/>

                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px',marginLeft:'12px'}}>商户名称：</span>
                        <Input placeholder="商户名称" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.merchantName = e}}/>

                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px',marginLeft:'12px'}}>商户号：</span>
                        <Input placeholder="商户号" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.mchId = e}}/>
                    
                    </Row>
                    <Row className="marginTop">
                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px'}}>渠道编号：</span>
                        <Input placeholder="渠道编号" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>

                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px',marginLeft:'12px'}}>渠道订单号：</span>
                        <Input placeholder="渠道订单号" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.agentOrderNo = e}}/>

                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px',marginLeft:'12px'}}>渠道名称：</span>
                        <Input placeholder="渠道名称" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.agentName = e}}/>
                        
                    </Row>
                    <Row className="marginTop">
                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px'}}>订单状态：</span>
                        <Dropdown trigger={<Input placeholder="订单状态" size="large"  style={{width:'160px',marginLeft:'12px'}} value={this.orderSta}/>}
                                  triggerType="click"
                                  visible={this.state.visibles}
                                  onVisibleChange={this.onVisibleChange}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {PayStatement}
                            </Menu>
                        </Dropdown>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px',marginLeft:'12px'}}>交易结果：</span>
                        <Input placeholder="交易结果" size="large"  style={{width:'160px',marginLeft:'12px'}} onChange={(e)=>{this.result = e}}/>

                        <span style={{fontSize:'14px',marginTop:'7px',width:'90px',marginLeft:'12px'}}>时间选择：</span>
                        <RangePicker size="large" style={{marginLeft:'12px'}} onChange={(a, b) => {
                            this.startDate = b[0];
                            this.endDate = b[1];
                        }} />
                    </Row>
                    {/*<Input placeholder="渠道订单号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.agentOrderNo = e}}/>
                    <Input placeholder="渠道名称" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.agentName = e}}/>
                    <Input placeholder="渠道编号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                    <Input placeholder="商户名称" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.merchantName = e}}/>
                    <Input placeholder="商户号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.mchId = e}}/>
                    <Dropdown trigger={<Input placeholder="订单状态" size="large"  style={{width:'120px',marginLeft:'12px'}} value={this.orderSta}/>}
                              triggerType="click"
                              visible={this.state.visibles}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
                        <Menu>
                            {PayStatement}
                        </Menu>
                    </Dropdown>
                    <Input placeholder="交易结果" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.result = e}}/>*/}
                </div>
                
                <Row style={{marginTop:'20px'}}>
                    <Button type="primary" style={{width:'80px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="normal" style={{width:'80px',marginLeft:'10px'}} size="large" onClick={this.onExport.bind(this)}>导出</Button>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} onRowClick={this.onRowClick.bind(this)} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title="订单号" dataIndex="orderNo" width={100}/>
                        <Table.Column title="渠道订单号" dataIndex="agentOrderNo" width={120}/>
                        <Table.Column title="商户号" dataIndex="merchantId"  width={100}/>
                        <Table.Column title="商户名称" dataIndex="name"  width={100}/>
                        <Table.Column title="交易时间" dataIndex="createTime"  width={100} cell={this.cellTime}/>
                        {/*<Table.Column title="所属渠道" dataIndex="channelAgent.name"  width={100}/>*/}
                        <Table.Column title="渠道编号" dataIndex="channelAgent.appId"  width={100}/>
                        <Table.Column title="交易金额" dataIndex="totalFee"  width={100}/>
                        <Table.Column title="费率（‰）" dataIndex="fee0"  width={120}/>
                        <Table.Column title="代付费" dataIndex="d0fee"  width={100} cell={this.cellRender}/>
                        <Table.Column title="交易手续费" dataIndex="totalProfit"  width={120} cell={this.cellRender}/>
                        <Table.Column title="交易状态" dataIndex="orderState"  width={100} cell={this.cellState}/>
                        {/*<Table.Column title="银行名称" dataIndex="bankName"  width={100}/>*/}
                        <Table.Column title="交易结果" dataIndex="result"  width={100} />
                        {/*<Table.Column title="上游渠道" dataIndex="time"  width={100}/>
                        <Table.Column title="交易卡号" dataIndex="time"  width={100}/>
                        <Table.Column title="交易类型" dataIndex="time"  width={100}/>
                        <Table.Column title="结算卡号" dataIndex="merchant.cardNumber"  width={100}/>*/}
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>

                    <Pagination defaultCurrent={1} size="large" total={total} pageSize={20} onChange={this.handleChange.bind(this)} />
                </div>
                <TradeDetailDialog visible={this.state.detailvisible} index={this} title="交易流水详情" dataSource={this.state.orderdata}/>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.BatchPage.dataSource|| [],
        total:state.BatchPage.total,
        countMerchantNum:state.BatchPage.countMerchantNum,
        countOrderNum:state.BatchPage.countOrderNum,
        totalMoney:state.BatchPage.totalMoney,
        totalProfit:state.BatchPage.totalProfit,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( BatchPageAction , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 350;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(BatchPage))
