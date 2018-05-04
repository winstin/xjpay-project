import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ServiceRate from '../../actions/ServiceRate'
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';

import Config from '../../../config/config.js'
import '../components.scss';


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
const rowSelection = {
        onChange: onRowClick,
        getProps: (record) => {
            return {
                disabled: record.id === 23324
            };
        }
    };
    
const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);

let department = Config.Department.map((item,index)=>{
    return <Menu.Item>{item.name}</Menu.Item>
})

const sexCard = (
    <Menu>
        <Menu.Item>男</Menu.Item>
        <Menu.Item>女</Menu.Item>
    </Menu>
);
class CustomDialog extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.state = {
            data: getData(30),
            visible: false,
            visibles:false,
            visiblesex:false,
            visiblesdepartment:false
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

    toggleVisible = () => {
        this.setState({visiblesex:false})
    };

    onVisibleChange = visibles => {
        this.setState({
            // visiblesex:visibles,
            visiblesdepartment:visibles
        })
    };

    onchange(){
        this.setState({visiblesex:false})
    }

    render() {
        const {dataSource,visible,title} = this.props;

        if(title == '修改'){
            return (
                <Dialog visible={visible}
                        onOk={this.onClose}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                        <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                            </div>
                            
                            <Input placeholder="公司名称" className='classWidth'    value={dataSource.name}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                            </div>
                            <Input value={dataSource.accountcity} placeholder="执照编号" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                            </div>
                            <Input value={dataSource.accountprovince} placeholder="渠道类型" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>渠道级别：</span>
                            </div>
                            <Input value={dataSource.accountaddress} placeholder="渠道级别" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>签约时间：</span>
                            </div>
                            <Input value={dataSource.signdate} placeholder="签约时间" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                            </div>
                            <Input value={dataSource.expiredate} placeholder="到期时间" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                            </div>
                            <Dropdown trigger={<Input value={dataSource.name} placeholder="法人姓名" className='classWidth'    />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人姓名：</span>
                            </div>
                            <Input value={dataSource.principal} placeholder="法人姓名" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                            </div>
                            <Dropdown trigger={<Input value={dataSource.province} placeholder="所在省份" className='classWidth'    />}
                                      triggerType="click"
                                      visible={this.state.visibles2}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                            </div>
                            <Input value={dataSource.city} placeholder="所在城市" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                            </div>
                            <Dropdown trigger={<Input value={dataSource.address} placeholder="详细地址" className='classWidth'    />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                            </div>
                            <Input value={dataSource.linkman} placeholder="法人邮箱" className='classWidth'    />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                            </div>
                            <Input value={dataSource.linkmantel} placeholder="商务邮箱" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                            </div>
                            <Input value={dataSource.idtype} placeholder="财务邮箱" className='classWidth'    />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                            </div>
                            <Input value={dataSource.appname} placeholder="APP名称" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                            </div>
                            <Input value={dataSource.website} placeholder="官网地址" className='classWidth'    />
                        </Row>

                        <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                        <Row>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                            </div>
                            
                            <Input value={dataSource.accounttype} placeholder="账户类型" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                            </div>
                            <Input value={dataSource.accountname} placeholder="收款户名" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                            </div>
                            <Input value={dataSource.bank} placeholder="开户行" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                            </div>
                            <Input value={dataSource.bank} placeholder="收款账户" className='classWidth'    />
                        </Row>

                </Dialog>
            );
        }else{
             return (
                <Dialog visible={visible}
                        onOk={this.onClose}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                        <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                            </div>
                            
                            <Input placeholder="公司名称" className='classWidth' />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                            </div>
                            <Input  placeholder="执照编号" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                            </div>
                            <Input  placeholder="渠道类型" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>渠道级别：</span>
                            </div>
                            <Input  placeholder="渠道级别" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>签约时间：</span>
                            </div>
                            <Input  placeholder="签约时间" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                            </div>
                            <Input  placeholder="到期时间" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                            </div>
                            <Input placeholder="法人姓名" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人姓名：</span>
                            </div>
                            <Input placeholder="法人姓名" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                            </div>
                            <Input  placeholder="所在省份" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                            </div>
                            <Input  placeholder="所在城市" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                            </div>
                            <Input  placeholder="详细地址" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                            </div>
                            <Input  placeholder="法人邮箱" className='classWidth'    />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                            </div>
                            <Input  placeholder="商务邮箱" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                            </div>
                            <Input  placeholder="财务邮箱" className='classWidth'    />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                            </div>
                            <Input placeholder="APP名称" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                            </div>
                            <Input placeholder="官网地址" className='classWidth'    />
                        </Row>

                        <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                        <Row>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                            </div>
                            
                            <Input  placeholder="账户类型" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                            </div>
                            <Input placeholder="收款户名" className='classWidth'    />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                            </div>
                            <Input  placeholder="开户行" className='classWidth'    />
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                            </div>
                            <Input  placeholder="收款账户" className='classWidth'    />
                        </Row>

                </Dialog>
            );
        }
    }
}



export default CustomDialog

