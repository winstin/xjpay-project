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


    cellRender = (value, index, record, context) => {
        if(value == 1){
            return '银联快捷';
        }else{
            return value;
        }
    }

    cellUpstream = (value, index, record, context) => {
        if(value == 'KFT_SERVICE'){
            return 'Q3';
        }else if(value == 'HF_SERVICE'){
            return 'Q1';
        }else if(value == 'CONGYU_SERVICE'){
            return 'Q2';
        }else if(value == 'HJ_SERVICE'){
            return 'Q4';
        }

    }

    cellPointType = (value, index, record, context) => {
        if(value == 0){
            return '商旅类';
        }else if(value == 2){
            return '一般类';
        }else if(value == 1){
            return '无积分';
        }else if(value == 3){
            return '新无卡';
        }else{
            return '-';
        }
    }


    cellType = (value, index, record, context) => {
        // if(value == 0){
            return 'D0';
        /*}else{
            return 'T1';
        }*/
    }


    cellMode0 = (value, index, record, context) => {
        if (value) {
            let text = (value/100).toFixed(2);
            if(text == "NaN"){
                return value
            }else{
                return text+"元";
            }
            
        }
        
    }

    cellFee0 = (value, index, record, context) => {
        return value;
    }


    renderPane(feeDataSource,downDetails){
        if(window.userType == "管理员"){
            return <Tab style={{height:600,overflow: 'auto'}}>
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
                    <TabPane tab="服务商费率" key="1" >
                        <Table dataSource={feeDataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={600}>
                            <Table.Column title="服务商编号" dataIndex="appId"/>
                            <Table.Column title="创建时间" dataIndex="create_time"/>
                            <Table.Column title="服务商名称" dataIndex="agentName"/>
                            <Table.Column title="业务类型" dataIndex="code" cell={this.cellRender}/>
                            <Table.Column title="上游渠道" dataIndex="upstream" cell={this.cellUpstream}/>
                            <Table.Column title="交易类型" dataIndex="points_type" cell={this.cellPointType}/>
                            <Table.Column title="结算类型" dataIndex="type" cell={this.cellType}/>
                            <Table.Column title="鉴权费" dataIndex="mode" cell={this.cellMode0}/>
                            <Table.Column title="结算费率(‰)" dataIndex="fee0" cell={this.cellFee0}/>
                            <Table.Column title="代付费" dataIndex="d0fee" cell={this.cellMode0}/>
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
        const {visible,downDetails,upDetail,feeDataSource} = this.props;
        let upData = [];
        if(upDetail  && upDetail.appId != undefined){
            upData = [upDetail];
        }

        // console.log(feeDataSource)

        // console.log(downDetails);  
        let downDetailsData = [];
        for(let a in downDetails){
            downDetails[a].Num = "1";
            downDetailsData.push(downDetails[a]);
            if(downDetails[a].downDetails){
                let downDetails_a = downDetails[a].downDetails;
                if(downDetails_a.length>=1){
                    for(let b in downDetails_a){
                        downDetails_a[b].Num = "2";
                        downDetails_a[b].up_appId = downDetails[a].appId;
                        downDetailsData.push(downDetails_a[b]);
                        if(downDetails_a[b].downDetails){
                            let downDetails_b = downDetails_a[b].downDetails;
                            if(downDetails_b.length>=1){
                                for(let c in downDetails_b){
                                    downDetails_b[c].Num = "3";
                                    downDetails_b[c].up_appId = downDetails_a[b].appId;
                                    downDetailsData.push(downDetails_b[c]);
                                    if(downDetails_b[c].downDetails){
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
                }
            }
        }  

        // console.log(feeDataSource);


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
                {this.renderPane(feeDataSource,downDetailsData)}
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

