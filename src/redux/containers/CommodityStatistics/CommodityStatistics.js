import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as CommodityStatistics from '../../actions/CommodityStatistics'
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import {getNowFormatDate} from "static/utils.js"
import Headers from '../../components/Header/index.js'



class GunsIndex extends Component {
    constructor(props) {
        super(props);
        this.startDate=getNowFormatDate();
        this.endDate=getNowFormatDate();
        this.merchantName='';
        this.mchId='';
        this.filterAppId='';
        this.agentName='';
        this.current =1;

    }

    onSearch(value) {
        this.current =1;
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate,this.agentName,this.merchantName,this.filterAppId,this.mchId);
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
    
    handleChange(current) {
        this.current =current;
        const {getInitData} = this.props;
        getInitData(current);
    }

    render() {
        const {containerHeight,dataSource,total} = (this.props);
        return (
            <div >
                <Headers title="商户手续费统计"/>
                {/*<div className="display-flex-100 paddingLeft-12 paddingTop">
                    <div className="display-flex">
                        <span className='top-width'>总交易金额:</span>
                        <span className="text-width"></span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易笔数:</span>
                        <span className="text-width"></span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易手续费分成:</span>
                        <span className="text-width"></span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总D0手续费:</span>
                        <span className="text-width"></span>
                    </div>
                </div>
                <div className="paddingTop paddingLeft-12"></div>
                <div className="display-flex-100 paddingLeft-12">
                    <div className="display-flex">
                        <span className='top-width'>总应结分润:</span>
                        <span className="text-width"></span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总收益:</span>
                        <span className="text-width"></span>
                    </div>
                    <div className="display-flex">
                    </div>
                    <div className="display-flex">
                    </div>
                </div>*/}
                <div className="marginTop-20 paddingLeft-12">
                    <span className='top-sumtext-bold'>查询条件：</span>
                    <Input placeholder="商户名称" size="large"   style={{width:'120px'}} onChange={(e)=>{this.merchantName = e}}/>
                    <Input placeholder="商户编号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.mchId = e}}/>
                    <Input placeholder="所属渠道" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.agentName = e}}/>
                    <Input placeholder="渠道编号" size="large"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                </div>
                <div className="marginTop-20 paddingLeft-12">
                    <span className='top-sumtext-bold'>时间选择：</span>
                    <RangePicker size="large" onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }}
                    />
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                    <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.reSetData.bind(this)}>重置</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title="商户编号" dataIndex="mchId"/>
                        <Table.Column title="商户名称" dataIndex="name"/>
                        <Table.Column title="所属渠道" dataIndex="agentName"/>
                        <Table.Column title="交易总笔数" dataIndex="sumOrderNum"/>
                        <Table.Column title="交易总金额" dataIndex="sumTotalFee"/>
                        <Table.Column title="交易手续费" dataIndex="sumTotalProfit"/>
                        <Table.Column title="D0代付手续费" dataIndex="sumD0fee"/>
                    </Table>
                </div>
                <div className='footer-css'>
                    <span className='footer-span'>总记录&nbsp;{total}&nbsp;条</span>
                    <Pagination current={this.current} size="large" total={total} pageSize={20} onChange={this.handleChange.bind(this)} />
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.CommodityStatistics.dataSource|| [],
        total:state.CommodityStatistics.total
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( CommodityStatistics , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 290;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GunsIndex))
