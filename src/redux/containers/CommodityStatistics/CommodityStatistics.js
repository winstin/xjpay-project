import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as CommodityStatistics from '../../actions/CommodityStatistics'
// import {getInitData} from '../../actions/CommodityStatistics';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';


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
            dataSource: getData(30)
        };

        this.startDate='';
        this.endDate='';
        this.merchantName='';
        this.mchId='';
        this.filterAppId='';
        this.agentName='';

    }

    onSearch(value) {
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate,this.agentName,this.merchantName,this.filterAppId,this.mchId);
    }

   
    componentWillMount() {
        // console.log('Component WILL MOUNT!');
    }

    componentDidMount(){
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
    }

    handleChange(current) {
        console.log(this.props);
        const {getInitData} = this.props;
        getInitData(current);
    }

    render() {
        const {containerHeight,dataSource,total} = (this.props);
        console.log(dataSource)
        return (
            <div>
                <Row>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="商户名称" className="textClsName"   style={{width:'120px'}} onChange={(e)=>{this.merchantName = e}}/>
                        <Input placeholder="商户编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.mchId = e}}/>
                        <Input placeholder="所属渠道" className="textClsName"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.agentName = e}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                        <RangePicker onChange={(a, b) => {
                            this.startDate = b[0];
                            this.endDate = b[1];
                        }}
                        /><Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onSearch.bind(this)}>搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title="商户编号" dataIndex="mchId"/>
                        <Table.Column title="商户名称" dataIndex="name"/>
                        <Table.Column title="所属渠道" dataIndex="agentName"/>
                        <Table.Column title="交易总笔数" dataIndex="sumOrderNum"/>
                        <Table.Column title="交易总金额" dataIndex="sumTotalFee"/>
                        <Table.Column title="交易手续费" dataIndex="sumTotalProfit"/>
                        <Table.Column title="D0代付手续费" dataIndex="sumD0fee"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={1} size="large" total={total} pageSize={20} onChange={this.handleChange.bind(this)} />
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.CommodityStatistics.dataSource,
        total:state.CommodityStatistics.total
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( CommodityStatistics , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 190;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GunsIndex))
