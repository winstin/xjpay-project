import React,{Component,PropTypes} from 'react'
import Dialog from 'qnui/lib/dialog';
import Tab from 'qnui/lib/tab';
const TabPane = Tab.TabPane;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from 'qnui/lib/table';
import * as Login from '../../actions/Login'
import {api,getNowFormatDate} from "static/utils.js"
import Button from 'qnui/lib/button';

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
            dataSource: []
        };
    }


    componentWillMount() {
        this.refresh();
    }
    


    onOpen = () => {
        this.props.index.setState({
            visible: true
        });
    };

    onClose = () => {

        this.props.index.setState({
            visible: false
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
        let {dataSource} = this.props;
        let updateData = [];
        for(let i in dataSource){
            if(i!=index){
                updateData.push(dataSource[i]);
            }
        }
        this.props.index.setState({bzData:updateData});
        localStorage.setItem("bzData"+window.userNick,JSON.stringify(updateData));
    }


    getData(result,callback){
        api({
            method:'/orders/page',
            mode:'jsonp',
            args:{
                startDate: getNowFormatDate(),
                endDate: getNowFormatDate(),
                orderNo: '',
                agentOrderNo: '',
                agentName: '',
                filterAppId: '',
                merchantName: '',
                mchId: '',
                orderState: '',
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

    refresh(){
        let self = this;
        let a = new Promise(function(resolve, reject){        //做一些异步操作
                self.getData('四要素鉴权失败',(e)=>{
                    resolve(e);
                })
            });


        let b = new Promise(function(resolve, reject){        //做一些异步操作
                self.getData('MA9112:转账失败-RJ11对方返回：账户状态异常',(e)=>{
                    resolve(e);
                })
            });


        let c = new Promise(function(resolve, reject){        //做一些异步操作
                self.getData('MA9112:转账失败-RJ11对方返回：收款人账号异常',(e)=>{
                    resolve(e);
                })
            });


        let d = new Promise(function(resolve, reject){        //做一些异步操作
                self.getData('身份信息不一致',(e)=>{
                    resolve(e);
                })
            });

        let e = new Promise(function(resolve, reject){        //做一些异步操作
                self.getData('无合适的路由处理当前交易',(e)=>{
                    resolve(e);
                })
            });
        Promise
        .all([a,b,c,d,e])
        .then(function(results){
            let data = [];
            for(let i in results){
                data = data.concat(results[i])
            }
            self.setState({dataSource:data})
        });
    }

    cellRemove= (value, index, record, context) => {

        return  <div>
                    <span className="blue-text" onClick={this.refresh.bind(this,index)}>刷新</span>
                </div>
    }


    render() {
        const {visible,title} = this.props;
        const{dataSource} = this.state
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

                    <Button type="secondary" style={{width:'80px',marginBottom:'20px'}} size="large" onClick={this.refresh.bind(this)}>刷新</Button>

                    <Table dataSource={dataSource}  maxBodyHeight={600}>
                        <Table.Column title="渠道编号" dataIndex="agentOrderNo" />
                        <Table.Column title="渠道名称" dataIndex="name" />
                        <Table.Column title="交易状态" dataIndex="orderState" cell={this.cellState}/>
                        <Table.Column title="交易结果" dataIndex="result" />
                        {/*<Table.Column title="操作" dataIndex="agentOrderNo" cell={this.cellRemove}/>*/}
                    </Table>
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

