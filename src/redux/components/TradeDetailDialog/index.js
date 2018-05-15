import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox';
import { Row, Col } from 'qnui/lib/grid';
import Dialog from 'qnui/lib/dialog';
const { Group: CheckboxGroup } = Checkbox;

import Config from 'static/config.js'
import Input from 'qnui/lib/input';
import Dropdown from 'qnui/lib/dropdown';
import {FormatDateTime} from "static/utils.js"

class TradeDetailDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            value: 'orange'
        };
    }

    
    onOpen = () => {
        this.props.index.setState({
            detailvisible: true
        });
    };

    onClose = () => {

        this.props.index.setState({
            detailvisible: false
        });
    }



    onChange(value) {
        console.log(value)
        this.setState({
            value: value
        });
    }

    renderCheckbox(){
        let jsx = Config.RolePlayer.map((item,index)=>{
            return  <div>
                        <Checkbox  value={item.value}>
                        {Config.RolePlayer[index].name}
                        </Checkbox>
                        <br/><br/>
                    </div>
        })
        return jsx;
    }

    getState(value){
        switch (value) {
            case "A":
                return "支付中";
            case "B":
                return "支付失败";
            case "C":
                return "支付完成";
            case "D":
                return "结算中";
            case "E":
                return "结算成功";
            case "F":
                return "预支付";
            default:
                return "";
        }
    }


    getTrade(value){
        switch (value) {
            case "HF_SERVICE":
                return "Q1";
            case "CONGYU_SERVICE":
                return "Q2";
            case "KFT_SERVICE":
                return "Q3";
        }
    }


    fmtPointsType(value) {
        if(value){
            switch (value.pointsType) {
                case "0":
                    return "商旅类";
                case "2":
                    return "一般类";
            } 
        }
        
    }

    render() {
        const {visible,title,dataSource} = this.props;
        let state = this.getState(dataSource.orderState);
        
        return (
            <Dialog visible={visible}
                    onOk={this.onClose}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose} title={title}>
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>订单号 ：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.orderNo}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>渠道订单号   ：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.agentOrderNo}</span>
                   
                </Row>

                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>渠道编号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource && dataSource.channelAgent && dataSource.channelAgent.appId}</span>

                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>所属渠道：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.channelAgent && dataSource.channelAgent.name}</span>
                </Row>
                
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>商户号：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.merchantId}</span>

                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>商户名称：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.name}</span>
                </Row>


                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易时间：</span>
                    </div>

                    <span className="detail-width"  >{FormatDateTime(dataSource.createTime)}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易金额：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.totalFee}</span>
                </Row>

                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>费率（‰)：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.fee0}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>代付费：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.d0fee}</span>
                </Row>

                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>上游渠道：</span>
                    </div>
                    <span className="detail-width"  >{this.getTrade(dataSource.upstream)}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易手续费   ：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.totalProfit}  </span>
                </Row>


                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>身份证号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.merchant && dataSource.merchant.idCard}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>手机号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.merchant && dataSource.merchant.tel}  </span>
                </Row>



                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易类型：</span>
                    </div>
                    <span className="detail-width"  >{this.fmtPointsType(dataSource.merchant)}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>结算卡号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.merchant && dataSource.merchant.cardNumber}</span>
                </Row>


                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>银行名称：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.bankName} </span>

                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易卡号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.cardNumber}</span>
                    
                </Row>



                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易结果：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.result}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易状态：</span>
                    </div>
                    <span className="detail-width"  >{state}</span>
                </Row>



                
                {/*<Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>商户名称：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.name}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>所属渠道：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.channelAgent && dataSource.channelAgent.name}</span>
                </Row>
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>渠道编号：</span>
                    </div>

                    <span className="detail-width"  >{dataSource && dataSource.channelAgent && dataSource.channelAgent.appId}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易金额：</span>
                    </div>

                    <span className="detail-width"  >{dataSource.totalFee}</span>
                </Row>
                
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>费率（‰)：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.fee0}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>代付费：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.d0fee}</span>
                </Row>

                
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易手续费   ：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.totalProfit}  </span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易状态：</span>
                    </div>
                    <span className="detail-width"  >{state}</span>
                </Row>
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>银行名称：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.bankName} </span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易结果：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.result}</span>
                </Row>
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>上游渠道：</span>
                    </div>
                    <span className="detail-width"  >{this.getTrade(dataSource.upstream)}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易卡号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.cardNumber}</span>
                </Row>
                
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易类型：</span>
                    </div>
                    <span className="detail-width"  >{this.fmtPointsType(dataSource.merchant)}</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>结算卡号：</span>
                    </div>
                    <span className="detail-width"  >{dataSource.merchant && dataSource.merchant.cardNumber}</span>
                </Row>*/}

              
            </Dialog>
        );
    }
}



export default TradeDetailDialog

