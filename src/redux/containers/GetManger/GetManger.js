import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';

import Button from 'qnui/lib/button';
import Pagination from 'qnui/lib/pagination';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Dimensions from 'react-dimensions';
import * as GetManger from '../../actions/GetManger'
import {FormatDateTime} from "static/utils.js"
import './GetManger.css'
import Headers from '../../components/Header/index.js'
import Menu from 'qnui/lib/menu';
import Dropdown from 'qnui/lib/dropdown';
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
            rateState: '所有',
            visibles:false,
            visible:false,
        }
        this.startDate='';
        this.endDate='';
        this.upstream='';
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

    changePageno(e){
        
        const {getInitData} = (this.props);
        getInitData(e,this.startDate,this.endDate,this.upstream);
    }


    cellTime = (value, index, record, context) => {
        return FormatDateTime(value);
    }

    onSearch() {
        const {getInitData} = (this.props);
        getInitData(1,this.startDate,this.endDate,this.upstream);
    }

    onVisibleChange = (visibles,type,e) => {
          this.setState({
              visibles:visibles
          })
    };
    render(){
        const {add, value, switchState ,changeSwitchState,containerHeight,dataSource,sumTotalFee,sumOrderNum,sumD0fee,sumProfit,sumTotalProfit,total} = this.props;
        const TabPane = Tab.TabPane;
        let PayStatement = upstreamMent.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.upstream = item.value;this.upstreamName = item.name}}>{item.name}</Menu.Item>
        })
        return(
            <div >
                <Headers title="收益管理"/>

                <Row className="paddingTop">
                    <div className="display-flex">
                        <span className='top-sumtext-bold'>总交易金额:</span>
                        {<span className="text-center new-border" >{sumTotalFee}</span>}

                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext'>总交易笔数:</span>
                        <span className="text-center new-border">{sumOrderNum}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext'>总手续费分成:</span>
                        <span className="text-center new-border">{sumTotalProfit}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-sumtext '>总D0手续费:</span>
                        <span className="text-center new-border">{sumD0fee}</span>
                    </div>
                </Row>
                {/*<div className="display-flex-100 paddingLeft-12 paddingTop">
                    <div className="display-flex">
                        <span className='top-width'>总交易金额:</span>
                        <span className="text-width new-border">{sumTotalFee}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易笔数:</span>
                        <span className="text-width new-border">{sumOrderNum}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总交易手续费分成:</span>
                        <span className="text-width new-border">{sumProfit}</span>
                    </div>
                    <div className="display-flex">
                        <span className='top-width'>总D0手续费:</span>
                        <span className="text-width new-border">{sumD0fee}</span>
                    </div>
                </div>*/}
                <div className="marginTop paddingLeft-12"></div>
                <Row className="paddingTop">
                    <div className="display-flex">
                        <span className='top-sumtext-bold'>总收益:</span>
                        {<span className="text-center new-border" >{sumProfit}</span>}
                    </div>
                    <div className="display-flex">
                        
                    </div>
                    <div className="display-flex">
                       
                    </div>
                    <div className="display-flex">
                       
                    </div>
                </Row>
                <Row className="marginTop-20">
                    <span className='top-sumtext-bold'>查询条件:</span>
                    
                    <Dropdown trigger={<Input placeholder="上游渠道" size="large"  style={{width:'160px'}} value={this.upstreamName}/>}
                              triggerType="click"
                              visible={this.state.visibles}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
                        <Menu>
                            {PayStatement}
                        </Menu>
                    </Dropdown>
                </Row>
                <Row className="marginTop-20">
                    <span className='top-sumtext-bold'>时间选择：</span>
                    <RangePicker size="large" onChange={(a, b) => {
                        this.startDate = b[0];
                        this.endDate = b[1];
                    }} />
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onSearch.bind(this)}>搜索</Button>
                </Row>
                <div style={{marginTop:'20px',marginBottom:'10px'}}>
                    <Table dataSource={dataSource} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title='交易日期' dataIndex="sumDate" />
                        <Table.Column title='交易金额' dataIndex="sumTotalFee" />
                        <Table.Column title='交易笔数' dataIndex="sumOrderNum" />
                        <Table.Column title='交易手续费分成' dataIndex="sumProfit" />
                        <Table.Column title='D0手续费' dataIndex="sumD0fee"  />
                        <Table.Column title='收益' dataIndex="sumTotalProfit" />
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination size="large" total={total} pageSize={20} onChange={this.changePageno.bind(this)} />
                </div>
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
    return window.innerHeight - 390;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GetMangers))

