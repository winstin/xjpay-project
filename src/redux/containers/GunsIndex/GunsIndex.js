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

import {FormatDateTime,promptToast,getNowFormatDate} from "static/utils.js";
import Dialog from 'qnui/lib/dialog';

import Headers from '../../components/Header/index.js'


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
            current:1,
            visible:false
        };

        this.startDate=getNowFormatDate();
        this.endDate=getNowFormatDate();
        this.merchantName='';
        this.mchId='';
        this.lockId = "";
        this.current = 1;
        this.oldData = {};
    }

    onSearch() {
        this.setState({current:1})
        const {getInitData} = (this.props);
        getInitData(1,this.merchantName,this.mchId,this.startDate,this.endDate);
    }


    componentWillMount() {

    }

    componentDidMount(){
        const {getInitData,emptyData} = (this.props);
        emptyData();
        getInitData();
    }

    /**
     * @Author   Winstin
     * @DateTime 2018-05-12
     * @param    string
     * @license  重置数据
     * @version  [version]
     * @return   {[type]}   [description]
     */
    reSetData(){
        this.setState({current:1})
        const {getInitData} = (this.props);
        getInitData();
    }


    reLoad(){
        let self = this;
        const{getInitData} = this.props;
        setTimeout(
            function(){
                getInitData(self.state.current,self.merchantName,self.mchId,self.startDate,self.endDate,false);
            }
        ,500)
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

    /**
     * @Author   Winstin
     * @DateTime 2018-05-12
     * @param    string
     * @license  锁定商户
     * @version  [version]
     * @return   {[type]}   [description]
     */
    onLock(){
        const {lockChants} = this.props;
        if(this.lockId == ""){
            promptToast("请选择冻结商户！");
            return;
        }
        lockChants(this.lockId,this.oldData.status);
        this.reLoad();

    }

    onRowClick = (index,record)=>{
        // console.log(record);
        this.lockId = record[0].mchId;
        this.oldData = record[0];
    }
    openDaiog(){
        if(this.lockId == ""){
            promptToast("请选择操作项！");
            return;
        }
        this.setState({visible:true})
    }
    onClose = ()=>{
        this.setState({visible:false})
    }

    /**
     * @Author   Winstin
     * @DateTime 2018-05-12
     * @param    string
     * @license  修改商户信息
     * @version  [version]
     * @return   {[type]}   [description]
     */
    changeInfo = ()=>{
        this.setState({visible:false});
        const{changeInfo} = this.props;
        changeInfo(this.oldData);
        this.reLoad();
    }

    cellStatus = (value, index, record, context) => {
        return <div >{value=="LOCK"?"锁定":"正常"}</div>
    }

    render() {
        const {containerHeight,dataSources,total} = (this.props);

        return (
            <div>
                <Headers title="商户管理"/>
                <div className="padding-10">
                    <div className="paddingTop paddingLeft-12">
                        <span className='top-sumtext-bold'>查询条件：</span>
                        <Input placeholder="商户名称" size="large"   style={{width:'160px'}}  onChange={(e)=>{this.merchantName = e}}/>
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
                    <div className='marginTop-20 paddingLeft-12'>
                        <span className='top-sumtext-bold'>时间选择：</span>
                        <RangePicker  size="large" onChange={(a, b) => {
                            // console.log(b[0]);
                            this.startDate = b[0];
                            this.endDate = b[1];
                        }} />
                    </div>
                    <div className='marginTop-20 paddingLeft-12'>
                        <Button type="primary" size="large" style={{width:'100px'}}  onClick={this.onSearch.bind(this)}>搜索</Button>
                        <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.openDaiog.bind(this)}>修改</Button>

                        <Button type="secondary" size="large" style={{width:'120px',marginLeft:'10px'}} onClick={this.onLock.bind(this)}>冻结/启用</Button>

                        <Button type="normal" size="large" style={{width:'100px',marginLeft:'10px'}} onClick={this.reSetData.bind(this)}>重置</Button>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <Table dataSource={dataSources} fixedHeader maxBodyHeight={containerHeight} rowSelection={{onChange: this.onRowClick,mode:'single'}}>
                            <Table.Column title="商户号" dataIndex="mchId"/>
                            <Table.Column title="商户名称" dataIndex="name"/>
                            <Table.Column title="渠道编号" dataIndex="channelAgent.appId"/>
                            <Table.Column title="渠道名称" dataIndex="agentName" />
                            <Table.Column title="建档时间" dataIndex="createTime" cell={this.cellTime} width="90"/>
                            <Table.Column title="身份证号" dataIndex="idCard"/>
                            <Table.Column title="结算卡号" dataIndex="cardNumber"/>
                            <Table.Column title="商户类型" dataIndex="mchType" cell={this.cellType} width="90"/>
                            <Table.Column title="电话" dataIndex="tel" width="120"/>
                            <Table.Column title="费率（‰）" dataIndex="fee0" width="95"/>
                            <Table.Column title="代付费" dataIndex="d0fee" cell={this.cellRender} width="70"/>
                            <Table.Column title="状态" dataIndex="status" cell={this.cellStatus} width={100}/>
                        </Table>
                    </div>
                    <div style={{marginTop:'20px',float:'right'}}>
                        <Pagination current={this.state.current} size="large" total={total} pageSize={20} onChange={this.changePageno.bind(this)} />
                    </div>
                </div>

                <Dialog visible={this.state.visible}
                        onOk={this.changeInfo}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title="修改">
                  
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>结算卡号：</span>
                        </div>
                        <Input placeholder="结算卡号"  style={{width:'180px'}} defaultValue={this.oldData.cardNumber} onChange={(e)=>{this.oldData.cardNumber=e}}/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>代付费：</span>
                        </div>

                       <Input placeholder="代付费"  style={{width:'180px'}} defaultValue={(this.oldData.d0fee/100).toFixed(2)} onChange={(e)=>{this.oldData.d0fee=e*100}}/>
                    </Row>

                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>结算费率(‰)：</span>
                        </div>
                        <Input placeholder="结算费率(‰)"  style={{width:'180px'}} defaultValue={this.oldData.fee0} onChange={(e)=>{this.oldData.fee0=e}}/>
                        <div className="flexStyle hide">
                        </div>
                        <Input placeholder="部门名称" className='hide' style={{width:'180px'}}/>
                    </Row>
                </Dialog>
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
    return window.innerHeight - 330;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GunsIndex))

