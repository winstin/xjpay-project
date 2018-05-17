import React,{Component,PropTypes} from 'react'
import Dialog from 'qnui/lib/dialog';
import Tab from 'qnui/lib/tab';
const TabPane = Tab.TabPane;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from 'qnui/lib/table';
import * as Login from '../../actions/Login'

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
            value: 'orange'
        };
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
        console.log(index);
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

    cellRemove= (value, index, record, context) => {
        return <span className="blue-text" onClick={this.remove.bind(this,index)}>删除</span>
    }


    render() {
        const {visible,dataSource,title} = this.props;
        
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
                    <Table dataSource={dataSource}  maxBodyHeight={600}>
                        <Table.Column title="渠道编号" dataIndex="agentOrderNo" />
                        <Table.Column title="渠道名称" dataIndex="name" />
                        <Table.Column title="交易状态" dataIndex="orderState" cell={this.cellState}/>
                        <Table.Column title="交易结果" dataIndex="result" />
                        <Table.Column title="删除" dataIndex="agentOrderNo" cell={this.cellRemove}/>
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

