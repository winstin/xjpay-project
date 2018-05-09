import React,{Component,PropTypes} from 'react'
import Dialog from 'qnui/lib/dialog';
import Tab from 'qnui/lib/tab';
const TabPane = Tab.TabPane;

import Table from 'qnui/lib/table';

const onRowClick = function (record, index, e) {
        console.log(record, index, e);
    }

class RoleDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            value: 'orange'
        };
    }

    
    onOpen = () => {
        this.props.index.setState({
            visible0: true
        });
    };

    onClose = () => {

        this.props.index.setState({
            visible0: false
        });
    }



    setRoleid = () =>{
        this.props.index.setState({
            rolevisible: false
        });
        this.props.index.setRoleid();
    }

    cellDee = (value, index, record, context) => {
        if(value[0]){
            let len = value.length;
            return value[len-1].d0fee;
        }else{
            return "-";
        }
        
    }

    cellFee = (value, index, record, context) => {
        if(value[0]){
            let len = value.length;
            return value[len-1].fee0;
        }else{
        }
    }

    cellMode = (value, index, record, context) => {
        if(value[0]){
            let len = value.length;
            return value[len-1].mode;
        }else{
        }
    }

    render() {
        const {visible,downDetails,upDetail} = this.props;
        let upData = [];
        if(upDetail.appId != undefined){
            upData = [upDetail];
        }
        
        return (
            <Dialog visible={visible}
                    onOk={this.setRoleid}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose} title={'服务商详细信息'}
                    style={{width:900}}
                    className="Dialog-height"
                    footer={false}
                    >
                <Tab style={{height:600}}>
                    {window.userType == "管理员" &&<TabPane tab="上游信息" key="1" >
                        <Table dataSource={upData} onRowClick={onRowClick} fixedHeader maxBodyHeight={600}>
                            <Table.Column title="渠道编号" dataIndex="appId" />
                            <Table.Column title="渠道名称" dataIndex="appName" />
                            <Table.Column title="代付费" dataIndex="rates" cell={this.cellDee}/>
                            <Table.Column title="鉴权费" dataIndex="rates" cell={this.cellMode}/>
                            <Table.Column title="结算费率" dataIndex="rates" cell={this.cellFee}/>
                        </Table>
                    </TabPane>}
                    <TabPane tab="下游信息" key="2">
                        <Table dataSource={downDetails} onRowClick={onRowClick} maxBodyHeight={600}>
                            <Table.Column title="渠道编号" dataIndex="appId" />
                            <Table.Column title="渠道名称" dataIndex="appName" />
                            <Table.Column title="代付费" dataIndex="rates" cell={this.cellDee}/>
                            <Table.Column title="鉴权费" dataIndex="rates" cell={this.cellMode}/>
                            <Table.Column title="结算费率" dataIndex="rates" cell={this.cellFee}/>
                        </Table>
                    </TabPane>
                </Tab>
            </Dialog>
        );
    }
}



export default RoleDialog

