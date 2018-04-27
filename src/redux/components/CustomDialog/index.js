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
        const {visible,title} = this.props;
        const {data} = this.state;
        
        return (
            <Dialog visible={visible}
                    onOk={this.onClose}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose} title={title}>
                <Row>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>账户：</span>
                    </div>
                    
                    <Input placeholder="账户" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'id')}/>
                       
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>姓名：</span>
                    </div>
                    <Input placeholder="姓名" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'name')}/>
                </Row>
                <Row className="marginTop">
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>性别：</span>
                    </div>
                    <Dropdown trigger={<Input placeholder="性别" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'id')}/>}
                              triggerType="click"
                              visible={this.state.visiblesex}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
                        {sexCard}
                    </Dropdown>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>出生日期：</span>
                    </div>
                    <DatePicker onChange={(val, str) => console.log(val, str)} className="customDialogWidth"/>
                </Row>
                <Row className="marginTop">
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>密码：</span>
                    </div>
                    <Input placeholder="密码" className="textClsName" htmlType="password"  className='classWidth' onChange={this.onchange.bind(this,'id')}/>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>确认密码：</span>
                    </div>
                    <Input placeholder="确认密码" className="textClsName"  htmlType="password" className='classWidth' onChange={this.onchange.bind(this,'name')}/>
                </Row>
                <Row className="marginTop">
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>角色：</span>
                    </div>
                    <Dropdown trigger={<Input placeholder="角色" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'id')}/>}
                              triggerType="click"
                              visible={this.state.visibles3}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
                        {menu}
                    </Dropdown>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>部门：</span>
                    </div>
                    <Dropdown trigger={<Input placeholder="部门" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'id')}/>}
                              triggerType="click"
                              visible={this.state.visiblesdepartment}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
                            <Menu>
                                {department}
                            </Menu>
                        </Dropdown>
                </Row>

                <Row className="marginTop">
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>邮箱：</span>
                    </div>
                    <Input placeholder="邮箱" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'id')}/>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>电话：</span>
                    </div>
                    <Input placeholder="电话：" className="textClsName"   className='classWidth' onChange={this.onchange.bind(this,'name')}/>
                </Row>
            </Dialog>
        );
    }
}



export default CustomDialog

