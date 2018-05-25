import React,{Component,PropTypes} from 'react'
import Dialog from 'qnui/lib/dialog';
import Tab from 'qnui/lib/tab';
const TabPane = Tab.TabPane;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from 'qnui/lib/table';
import * as Login from '../../actions/Login'
import {api,getNowFormatDate,FormatDateTime} from "static/utils.js"
import Button from 'qnui/lib/button';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Config from 'static/config.js'


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

class RoleDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            visible0:false,
            visible1:false,
            visible2:false
        };
    }


    componentWillMount() {
        // this.refresh();
    }
    

    onClose = () => {

        this.props.index.setState({
            visiblebank: false
        });
    }


   
    cellState = (value, index, record, context) => {
        switch (value) {
            case "A":
                return <span style={{color:'orange'}} >支付中</span>;
            case "B":
                return <span style={{color:'red'}} >支付失败</span>;
            case "C":
                return <span style={{color:'green'}} >支付完成</span>;
            case "D":
                return <span style={{color:'orange'}} >结算中</span>;
            case "E":
                return <span style={{color:'green'}} >结算成功</span>;
            case "F":
                return "预支付";
            default:
                return "";
        }
    }


    remove(index){
        
    }


    getData(result,callback){
        api({
            method:'/orders/page',
            mode:'jsonp',
            args:{
                startDate: '2018-03-01',
                endDate: getNowFormatDate(),
                orderNo: '',
                agentOrderNo: '',
                agentName: '',
                filterAppId: '',
                merchantName: '',
                mchId: '',
                orderState: "D",
                result: result,
                pageIndex:1,
                pageSize:20
                
            },
            callback:(rsp)=>{
                if(rsp.data.data == ""){
                    callback([])
                }else{
                    let value = rsp.data.data;
                    callback(value)
                }
                
            },
            errCallback:(msg)=>{
               
            }
        });
    }

    onCloseChange = ()=>{
        this.setState({visible0:false});
    }

    updateRates = ()=>{

    }

    

    cellRemove= (value, index, record, context) => {

        return  <div>
                    <span className="blue-text" onClick={this.refresh.bind(this,index)}>刷新</span>
                </div>
    }

    cellTime = (value, index, record, context) => {
        return <span>{FormatDateTime(value)}</span>;
    }

    add(){
        this.setState({visible0:true});
    }

    onVisibleChange1 = visibles => {
        this.setState({
            visible1:visibles
        });
    };

    onVisibleChange2 = visibles => {
        this.setState({
            visible2:visibles
        });
    };

    render() {
        const {visible,title} = this.props;
        const{dataSource} = this.state;


        console.log(Config)
        let BankDataMent = Config.BankData.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.bankName = item.name}}>{item.name}</Menu.Item>
        })

        let bankCardMent = Config.bankCardType.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.bankCardType = item.name}}>{item.name}</Menu.Item>
        })


        return (
            <Dialog visible={visible}
                    onOk={this.setRoleid}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose} title={title}
                    style={{width:900}}
                    className="Dialog-height"
                    footer={false}
                    >
                    <Button type="primary" style={{width:'80px',marginBottom:'20px'}} size="large" onClick={this.add.bind(this)}>添加</Button>
                    <Button type="normal" style={{width:'80px',marginBottom:'20px',marginLeft:'20px'}} size="large" onClick={this.remove.bind(this)}>删除</Button>
                    <Table dataSource={dataSource}  maxBodyHeight={600}>
                        <Table.Column title="渠道编号" dataIndex="agentOrderNo" />
                        <Table.Column title="渠道名称" dataIndex="channelAgent.name" />
                        <Table.Column title="交易时间" dataIndex="createTime"  width={100} cell={this.cellTime}/>
                        <Table.Column title="交易状态" dataIndex="orderState" cell={this.cellState}/>
                        <Table.Column title="交易结果" dataIndex="result" />
                        {<Table.Column title="操作" dataIndex="agentOrderNo" cell={this.cellRemove}/>}
                    </Table>

                <Dialog visible={this.state.visible0}
                    onOk={this.updateRates}
                    closable="esc,mask,close"
                    onCancel={this.onCloseChange}
                    onClose={this.onCloseChange} title="添加特殊银行费率">
                    <Row>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>银行名称：</span>
                        </div>

                        <Dropdown trigger={<Input placeholder="银行名称" className="textClsName"   style={{width:'180px'}} value={this.bankName}/>}
                              triggerType="click"
                              visible={this.state.visible1}
                              onVisibleChange={this.onVisibleChange1}
                              safeNode={() => this.refs.button}>
                            <Menu className="dropdown" >
                                {BankDataMent}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>银行卡类型：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="银行卡类型" className="textClsName"   style={{width:'180px'}}  value={this.bankCardType}/>}
                              triggerType="click"
                              visible={this.state.visible2}
                              onVisibleChange={this.onVisibleChange2}
                              safeNode={() => this.refs.button}>
                            <Menu >
                                {bankCardMent}
                            </Menu>
                        </Dropdown>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>新费率：</span>
                        </div>
                        <Input placeholder="新费率" className="textClsName"   style={{width:'180px'}} onChange={(e)=>{this.newNoCardProfit = e}}/>
                        <div className="flexStyle hide">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>交易类型：</span>
                        </div>
                        <Input placeholder="交易类型" className="textClsName hide"   style={{width:'180px'}} />
                    </Row>
                   
                </Dialog>
            </Dialog>
        );
    }
}


function mapStateToProps(state, ownProps){
    return {
        userType:state.Login.userType,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return 
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleDialog)

