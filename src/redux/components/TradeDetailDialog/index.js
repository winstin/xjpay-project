import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox';
import { Row, Col } from 'qnui/lib/grid';
import Dialog from 'qnui/lib/dialog';
const { Group: CheckboxGroup } = Checkbox;

import Config from 'static/config.js'
import Input from 'qnui/lib/input';
import Dropdown from 'qnui/lib/dropdown';


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

    render() {
        const {visible,title} = this.props;
        
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

                    <span className="detail-width"  >订单号</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>渠道订单号   ：</span>
                    </div>

                    <span className="detail-width"  >渠道订单号  </span>
                   
                </Row>
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易时间：</span>
                    </div>

                    <span className="detail-width"  >交易时间</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>商户号：</span>
                    </div>

                    <span className="detail-width"  >商户号</span>
                </Row>
                
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>商户名称：</span>
                    </div>

                    <span className="detail-width"  >商户名称</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>所属渠道：</span>
                    </div>

                    <span className="detail-width"  >所属渠道</span>
                </Row>
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>渠道编号：</span>
                    </div>

                    <span className="detail-width"  >渠道编号</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易金额：</span>
                    </div>

                    <span className="detail-width"  >交易金额</span>
                </Row>
                
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>费率（‰)：</span>
                    </div>
                    <span className="detail-width"  >费率（‰)</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>代付费：</span>
                    </div>
                    <span className="detail-width"  >代付费</span>
                </Row>

                
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易手续费   ：</span>
                    </div>
                    <span className="detail-width"  >交易手续费  </span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易状态：</span>
                    </div>
                    <span className="detail-width"  >交易状态</span>
                </Row>
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>银行名称：</span>
                    </div>
                    <span className="detail-width"  >银行名称</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易结果：</span>
                    </div>
                    <span className="detail-width"  >交易结果</span>
                </Row>
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>上游渠道：</span>
                    </div>
                    <span className="detail-width"  >上游渠道</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易卡号：</span>
                    </div>
                    <span className="detail-width"  >交易卡号</span>
                </Row>
                
               
                <Row className="marginTop-20">
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>交易类型：</span>
                    </div>
                    <span className="detail-width"  >交易类型</span>
                    <div className="flex-end">
                        <span></span>
                        <span style={{fontSize:'14px'}}>结算卡号：</span>
                    </div>
                    <span className="detail-width"  >结算卡号</span>
                </Row>

              
            </Dialog>
        );
    }
}



export default TradeDetailDialog

