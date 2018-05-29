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
import Menu from 'qnui/lib/menu';
import Config from 'static/config.js'
import Dropdown from 'qnui/lib/dropdown';
import {getNowFormatDate,copyValue,FormatDateTime,isEmpty,promptToast,successToast} from "static/utils.js"
import Headers from '../../components/Header/index.js'
import BzDialog from '../../components/BzDialog/index.js'
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

class BatchPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
            detailvisible:false,
            orderdata:{},
            visibles:false,
            visibless:false,
            visible:false,
            bzData:[],
            moreSearch:false
        };
        this.startDate=getNowFormatDate();
        this.endDate=getNowFormatDate();
        this.merchantName='';
        this.mchId='';
        this.orderNo='';
        this.agentName='';
        this.filterAppId='';
        this.orderState='';
        this.result='';
        this.agentOrderNo='';
        this.orderSta='';
        this.current =1;
        this.upstream='';
        this.cutHeight = 0;
    }

    onSearch(value) {
        this.current =1;
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate,this.orderNo,this.agentOrderNo,this.agentName,this.filterAppId,this.merchantName,this.mchId,this.orderState,this.result,this.upstream);
    }


    onSearch(value) {
        this.current =1;
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate,this.orderNo,this.agentOrderNo,this.agentName,this.filterAppId,this.merchantName,this.mchId,this.orderState,this.result,this.upstream);
    }

    onExport(){
        const {exportData} = (this.props);
        exportData(1,this.startDate,this.endDate,this.orderNo,this.agentOrderNo,this.agentName,this.filterAppId,this.merchantName,this.mchId,this.orderState,this.result,this.upstream); 
    }


    componentWillMount() {

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
    
    onRowClick(record, index, e) {
        this.setState({detailvisible:true,orderdata:record})
    }
 
    cellRender = (value, index, record, context) => {
        return <span onClick={this.onRowClick.bind(this,record)}>{(value/100).toFixed(2)}</span>;
    }


    cellTime = (value, index, record, context) => {
        return <span onClick={this.onRowClick.bind(this,record)}>{FormatDateTime(value)}</span>;
    }


    cellState = (value, index, record, context) => {
        switch (value) {
            case "A":
                return <span style={{color:'orange'}} onClick={this.onRowClick.bind(this,record)}>支付中</span>;
            case "B":
                return <span style={{color:'red'}} onClick={this.onRowClick.bind(this,record)}>支付失败</span>;
            case "C":
                return <span style={{color:'green'}} onClick={this.onRowClick.bind(this,record)}>支付完成</span>;
            case "D":
                return <span style={{color:'orange'}} onClick={this.onRowClick.bind(this,record)}>结算中</span>;
            case "E":
                return <span style={{color:'green'}} onClick={this.onRowClick.bind(this,record)}>结算成功</span>;
            case "F":
                return "预支付";
            default:
                return "";
        }
    }

    cellClick = (value, index, record, context) => {
        return <span onClick={this.onRowClick.bind(this,record)}>{value}</span>;
    }

    cellMoney = (value, index, record, context) => {
        return <span onClick={this.onRowClick.bind(this,record)}>{(value/100).toFixed(2)}</span>;
    }

    cellBz = (value, index, record, context) => {
        return  <div>
                    <span >{value}</span><br/>
                   {/* <span className="blue-text" onClick={this.addBz.bind(this,record)}>添加备注</span>*/}
                </div>;
    }

    addBz(value){
        console.log(value);
        let bzData = {
            agentOrderNo:value.agentOrderNo,
            name:value.channelAgent.name,
            orderState:value.orderState,
            result:value.result,
        }

        let oldBz = localStorage.getItem("bzData"+window.userNick);
        if(isEmpty(oldBz)){
            oldBz = [];
            oldBz.push(bzData);
        }else{
            oldBz = JSON.parse(oldBz);
            for(let i in oldBz){
                if(oldBz[i].agentOrderNo == bzData.agentOrderNo){
                    promptToast('重复订单！');
                    return;
                }
            }
            oldBz.push(bzData);
        }   
        successToast('添加成功！');
        localStorage.setItem("bzData"+window.userNick,JSON.stringify(oldBz));
        
    }


    showBz(){
        let oldBz = localStorage.getItem("bzData"+window.userNick);
        if(isEmpty(oldBz)){
            oldBz = [];
        }else{
            oldBz = JSON.parse(oldBz);
        }


        this.setState({
            visible:true,
            bzData:oldBz
        })
    }


    handleChange(current) {
        this.current =current;
        const {getInitData} = this.props;
        getInitData(current,this.startDate,this.endDate,this.orderNo,this.agentOrderNo,this.agentName,this.filterAppId,this.merchantName,this.mchId,this.orderState,this.result,this.upstream);
    }


    onVisibleChange = (visibles,type,e) => {
        this.setState({
            visibles:visibles
        })
    };

    copyData(){
        const {dataSource} = (this.props);
        let str = "";
        for(let i in dataSource){
            str = str +dataSource[i].orderNo+"&&&&&&"+dataSource[i].agentOrderNo+"&&&&&&"+FormatDateTime(dataSource[i].createTime)+"&&&&&&"+(dataSource[i].result||"")+'\r\n\r\n';
        }
        str = str.replace(/\&/g," ");
        copyValue(str)
    }
    
    onVisibleChanges = (visibles,type,e) => {
          this.setState({
              visibless:visibles
          })
    };
    render() {
        const {containerHeight,dataSource,total,countMerchantNum,countOrderNum,totalMoney,totalProfit} = (this.props);
        let PayStatement = Config.PayState.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.orderState = item.value;this.orderSta = item.name}}>{item.name}</Menu.Item>
        })

        let upstreamMents = upstreamMent.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.upstream = item.value;this.upstreamName = item.name}}>{item.name}</Menu.Item>
        })
        return (
            <div>
                <Headers title="交易管理"/>
                <Row className="paddingTop">
                    <div className="display-flex">
                        <span className='top-sumtext-bold'>商户数:</span>
                        {<span className="text-center new-border" >{countMerchantNum}</span>}

                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext'>订单笔数:</span>
                        <span className="text-center new-border">{countOrderNum}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext'>订单金额:</span>
                        <span className="text-center new-border">{totalMoney}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext '>手续费:</span>
                        <span className="text-center new-border">{totalProfit}</span>
                    </div>
                </Row>
                
                <div className="marginTop-20">
                    <Row className="marginTop">
                        <div className="display-flex">
                            <span className='top-sumtext-bold'>订单号：</span>
                            <Input placeholder="订单号" size="large"   style={{width:'160px'}} onChange={(e)=>{this.orderNo = e}}/>
                        </div>
                        <div className="display-flex">
                            <span className='top-sumtext'>商户号：</span>
                            <Input placeholder="商户号" size="large"  style={{width:'160px'}} onChange={(e)=>{this.mchId = e}}/>
                        </div>
                        <div className="display-flex">
                            <span className='top-sumtext'>商户名称：</span>
                            <Input placeholder="商户名称" size="large"  style={{width:'160px'}} onChange={(e)=>{this.merchantName = e}}/>
                        </div>
                        <div className="display-flex">
                            <span className='top-sumtext'>订单状态：</span>
                            <Dropdown trigger={<Input placeholder="订单状态" size="large"  style={{width:'160px'}} value={this.orderSta}/>}
                                      triggerType="click"
                                      visible={this.state.visibles}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                <Menu>
                                    {PayStatement}
                                </Menu>
                            </Dropdown>
                        </div>
                    </Row>
                    <Row className="marginTop">
                        <div className="display-flex">
                            <span className='top-sumtext-bold'>渠道订单号：</span>
                            <Input placeholder="渠道订单号" size="large"  style={{width:'160px'}} onChange={(e)=>{this.agentOrderNo = e}}/>
                        </div>
                        <div className="display-flex">
                            <span className='top-sumtext'>渠道编号：</span>
                            <Input placeholder="渠道编号" size="large"  style={{width:'160px'}} onChange={(e)=>{this.filterAppId = e}}/>
                        </div>
                        <div className="display-flex">
                            <span className='top-sumtext'>渠道名称：</span>
                            <Input placeholder="渠道名称" size="large"  style={{width:'160px'}} onChange={(e)=>{this.agentName = e}}/>
                        </div>
                        <div className="display-flex">
                            <span className='top-sumtext'>交易结果：</span>
                            <Input placeholder="交易结果" size="large"  style={{width:'160px'}} onChange={(e)=>{this.result = e}}/>
                        </div>
                    </Row>

                    {this.state.moreSearch && 
                        <Row className="marginTop">
                            <div className="display-flex">
                                <span className='top-sumtext-bold'>上游渠道：</span>
                                <Dropdown trigger={<Input placeholder="上游渠道" size="large"  style={{width:'160px'}} value={this.upstreamName}/>}
                                          triggerType="click"
                                          visible={this.state.visibless}
                                          onVisibleChange={this.onVisibleChanges}
                                          safeNode={() => this.refs.button}>
                                    <Menu>
                                        {upstreamMents}
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
                    }
                    {this.state.moreSearch && 
                        <Row className="marginTop">
                            <span className='top-sumtext-bold'>时间选择：</span>
                            <RangePicker size="large" onChange={(a, b) => {
                                this.startDate = b[0];
                                this.endDate = b[1];
                            }} />
                        </Row>
                    }
                </div>
                
                <Row className="marginTop-center">
                    <Button type="primary" style={{width:'80px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="secondary" style={{width:'80px',marginLeft:'10px'}} size="large" onClick={this.onExport.bind(this)}>导出</Button>
                    <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.reSetData.bind(this)}>重置</Button>
                    <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.copyData.bind(this)}>复制</Button>
                    <Button type="secondary" style={{width:'80px',marginLeft:'10px'}} size="large" onClick={this.showBz.bind(this)}>备注</Button>

                    <span className="blue-text"  onClick={()=>{
                        if(this.state.moreSearch){
                            this.cutHeight = 0;
                        }else{
                            this.cutHeight = 80;
                        }
                        this.setState({moreSearch:!this.state.moreSearch})

                    }}>&nbsp;&nbsp;&nbsp;{!this.state.moreSearch?"高级搜索>>>":"收起<<<"}</span>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource}  fixedHeader maxBodyHeight={containerHeight-this.cutHeight}>
                        <Table.Column title="订单号" dataIndex="orderNo" width={130} cell={this.cellBz}/>
                        <Table.Column title="渠道订单号" dataIndex="agentOrderNo" width={180}/>
                        <Table.Column title="渠道编号" dataIndex="channelAgent.appId"  width={90}/>
                        <Table.Column title="所属渠道" dataIndex="channelAgent.name"  width={100}/>
                        <Table.Column title="商户号" dataIndex="merchantId"  width={90}/>
                        <Table.Column title="商户名称" dataIndex="name"  width={100}/>
                        <Table.Column title="交易时间" dataIndex="createTime"  width={100} cell={this.cellTime}/>
                        <Table.Column title="交易金额(元)" dataIndex="totalFee"  width={100} cell={this.cellMoney}/>
                        <Table.Column title="费率（‰）" dataIndex="fee0"  width={95} cell={this.cellClick}/>
                        <Table.Column title="代付费" dataIndex="d0fee"  width={70} cell={this.cellRender}/>
                        <Table.Column title="交易手续费" dataIndex="totalProfit"  width={100} cell={this.cellRender}/>
                        <Table.Column title="交易状态" dataIndex="orderState"  width={80} cell={this.cellState}/>
                        {/*<Table.Column title="银行名称" dataIndex="bankName"  width={100}/>*/}
                        <Table.Column title="交易结果" dataIndex="result"  width={80} cell={this.cellClick}/>
                        {/*<Table.Column title="上游渠道" dataIndex="time"  width={100}/>
                        <Table.Column title="交易卡号" dataIndex="time"  width={100}/>
                        <Table.Column title="交易类型" dataIndex="time"  width={100}/>
                        <Table.Column title="结算卡号" dataIndex="merchant.cardNumber"  width={100}/>*/}
                    </Table>
                </div>
                <div className='footer-css'>
                    <span className='footer-span'>总记录&nbsp;{total}&nbsp;条</span>
                    <Pagination current={this.current} size="large" total={total} pageSize={20} onChange={this.handleChange.bind(this)} />
                </div>
                <TradeDetailDialog visible={this.state.detailvisible} index={this} title="交易流水详情" dataSource={this.state.orderdata}/>

                <BzDialog visible={this.state.visible} index={this} title="备注" dataSource={this.state.bzData}/>
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
    return window.innerHeight - 380;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(BatchPage))
