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


    renderPane(upData,downDetails){
        if(window.userType == "管理员"){
            return <Tab style={{height:600,overflow: 'auto'}}>
                    {/*<TabPane tab="上游信息" key="1" >
                        <Table dataSource={upData} onRowClick={onRowClick} fixedHeader maxBodyHeight={600}>
                            <Table.Column title="渠道编号" dataIndex="appId" />
                            <Table.Column title="渠道名称" dataIndex="appName" />
                            <Table.Column title="代付费" dataIndex="rates" cell={this.cellDee}/>
                            <Table.Column title="鉴权费" dataIndex="rates" cell={this.cellMode}/>
                            <Table.Column title="结算费率" dataIndex="rates" cell={this.cellFee}/>
                        </Table>
                    </TabPane>*/}
                    <TabPane tab="下游信息" key="2">
                        <Table dataSource={downDetails} onRowClick={onRowClick} >
                            <Table.Column title="层级" dataIndex="Num" />
                            <Table.Column title="上游渠道编号" dataIndex="up_appId" />
                            <Table.Column title="渠道编号" dataIndex="appId" />
                            <Table.Column title="渠道名称" dataIndex="appName" />
                            <Table.Column title="代付费" dataIndex="rates" cell={this.cellDee}/>
                            <Table.Column title="鉴权费" dataIndex="rates" cell={this.cellMode}/>
                            <Table.Column title="结算费率" dataIndex="rates" cell={this.cellFee}/>

                        </Table>
                    </TabPane>
                </Tab>
        }else{
            return <Tab style={{height:600}}>
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
        }
    }

    render() {
        const {visible,downDetails,upDetail} = this.props;
        let upData = [];
        if(upDetail.appId != undefined){
            upData = [upDetail];
        }

        let downDetailsData = [];
        for(let a in downDetails){
            downDetails[a].Num = "1";
            downDetailsData.push(downDetails[a]);
            let downDetails_a = downDetails[a].downDetails;
            if(downDetails_a.length>=1){
                for(let b in downDetails_a){
                    downDetails_a[b].Num = "2";
                    downDetails_a[b].up_appId = downDetails[a].appId;
                    downDetailsData.push(downDetails_a[b]);
                    let downDetails_b = downDetails_a[b].downDetails;
                    if(downDetails_b.length>=1){
                        for(let c in downDetails_b){
                            downDetails_b[c].Num = "3";
                            downDetails_b[c].up_appId = downDetails_a[b].appId;
                            downDetailsData.push(downDetails_b[c]);
                            let downDetails_c = downDetails_b[c].downDetails;
                            if(downDetails_c.length>=1){
                                for(let d in downDetails_c){
                                    downDetails_c[d].Num = "4";
                                    downDetails_c[d].up_appId = downDetails_b[c].appId;
                                    downDetailsData.push(downDetails_c[d]);
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(downDetailsData)
        
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
                {this.renderPane(upData,downDetailsData)}
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

