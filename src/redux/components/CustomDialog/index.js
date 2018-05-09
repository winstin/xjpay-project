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

import Config from 'static/config.js'
import '../components.scss';
import {promptToast} from "static/utils.js"




class CustomDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1:false,
            visible2:false,
            visible3:false,
            newData:{

            }
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
        this.state.newData={};
    }

    addData(){

        if(this.state.newData.password == "" || this.state.newData.password.trim()!= this.state.newData.rePassword.trim()){
            promptToast('请确认两次输入密码！');
            return;
        }
        if(this.state.newData.sex == undefined){
            this.state.newData.sex = 1;
        }
        this.props.index.addData(this.state.newData);
        this.state.newData={};
        this.props.index.setState({
            visible: false
        });

    }

    updateData(){

        this.props.index.updateData(this.state.newData,this.props.oldData);
        this.state.newData={};
        this.props.index.setState({
            visible: false
        });
    }


    toggleVisible = () => {
        this.setState({visiblesex:false})
    };

    onVisibleChange1 = visibles => {
        this.setState({
            visible1:visibles
        })
    };

    onVisibleChange2 = visibles => {
        this.setState({
            visible2:visibles
        })
    };

    onVisibleChange3 = visibles => {
        this.setState({
            visible3:visibles
        })
    };

    onchange(){
        this.setState({visiblesex:false})
    }

    render() {
        const {visible,title,oldData} = this.props;
        const {data} = this.state;
        const department = Config.Department.map((item,index)=>{
            return <Menu.Item onClick={()=>{
                this.state.newData.deptName = item.name;
                this.state.newData.deptid = item.value;
                console.log(this.state.newData)
             }}>{item.name}</Menu.Item>
        })

        const sexCard = (
            <Menu>
                <Menu.Item  onClick={()=>{this.state.newData.sex = 1}}>男</Menu.Item>
                <Menu.Item  onClick={()=>{this.state.newData.sex = 2}}>女</Menu.Item>
            </Menu>
        );

        const department0 = Config.Department.map((item,index)=>{
            return <Menu.Item onClick={()=>{oldData.deptName = item.name; oldData.deptid = item.value}}>{item.name}</Menu.Item>
        })

        const sexCard0 = (
            <Menu>
                <Menu.Item  onClick={()=>{oldData.sex = 1}}>男</Menu.Item>
                <Menu.Item  onClick={()=>{oldData.sex = 2}}>女</Menu.Item>
            </Menu>
        );

        if(title == "修改"){
            return (
                    <Dialog visible={visible}
                            onOk={this.updateData.bind(this)}
                            closable="esc,mask,close"
                            onCancel={this.onClose}
                            onClose={this.onClose} title={title}>
                        <Row>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>账户：</span>
                            </div>
                            
                            <Input placeholder="账户"   className='classWidth' defaultValue={oldData.account} onChange={(e)=>{this.state.newData.account = e}}/>
                               
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>姓名：</span>
                            </div>
                            <Input placeholder="姓名"   className='classWidth' defaultValue={oldData.name} onChange={(e)=>{this.state.newData.name = e}}/>
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>性别：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="性别"   className='classWidth' value={oldData.sex == 1?"男":"女"}/>}
                                      triggerType="click"
                                      visible={this.state.visible1}
                                      onVisibleChange={this.onVisibleChange1}
                                      safeNode={() => this.refs.button}>
                                {sexCard0}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>出生日期：</span>
                            </div>
                            <DatePicker defaultValue={oldData.birthday} onChange={(val, str) => {console.log(str);this.state.newData.birthday = str}} className="customDialogWidth"/>
                        </Row>
                        {/*<Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>密码：</span>
                            </div>
                            <Input placeholder="密码" htmlType="password"  className='classWidth' onChange={(e)=>{this.state.newData.password = e}}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>确认密码：</span>
                            </div>
                            <Input placeholder="确认密码"  htmlType="password" className='classWidth' onChange={(e)=>{this.state.newData.rePassword = e}}/>
                        </Row>*/}
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>角色：</span>
                            </div>
                            <Input placeholder="角色"   className='classWidth'  disabled value={oldData.roleName}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>部门：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="部门"   className='classWidth' value={oldData.deptName}/>}
                                      triggerType="click"
                                      visible={this.state.visible3}
                                      onVisibleChange={this.onVisibleChange3}
                                      safeNode={() => this.refs.button}>
                                    <Menu>
                                        {department0}
                                    </Menu>
                                </Dropdown>
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>邮箱：</span>
                            </div>
                            <Input placeholder="邮箱"  className='classWidth' defaultValue={oldData.email} onChange={(e)=>{this.state.newData.email = e}}/>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>电话：</span>
                            </div>
                            <Input placeholder="电话："   className='classWidth' defaultValue={oldData.phone} onChange={(e)=>{this.state.newData.phone = e}}/>
                        </Row>
                    </Dialog>
            );
            
        }else{
            return (
                <Dialog visible={visible}
                        onOk={this.addData.bind(this)}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                    <Row>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>账户：</span>
                        </div>
                        
                        <Input placeholder="账户"   className='classWidth' onChange={(e)=>{this.state.newData.account = e}}/>
                           
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>姓名：</span>
                        </div>
                        <Input placeholder="姓名"   className='classWidth' onChange={(e)=>{this.state.newData.name = e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>性别：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="性别"   className='classWidth' value={  this.state.newData.sex != 2?"男":"女"}/>}
                                  triggerType="click"
                                  visible={this.state.visible1}
                                  onVisibleChange={this.onVisibleChange1}
                                  safeNode={() => this.refs.button}>
                            {sexCard}
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>出生日期：</span>
                        </div>
                        <DatePicker onChange={(val, str) => {console.log(str);this.state.newData.birthday = str}} className="customDialogWidth"/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>密码：</span>
                        </div>
                        <Input placeholder="密码" htmlType="password"  className='classWidth' onChange={(e)=>{this.state.newData.password = e}}/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>确认密码：</span>
                        </div>
                        <Input placeholder="确认密码"  htmlType="password" className='classWidth' onChange={(e)=>{this.state.newData.rePassword = e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>角色：</span>
                        </div>
                        <Input placeholder="角色"   className='classWidth'  disabled/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>部门：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="部门"   className='classWidth' value={this.state.newData.deptName}/>}
                                  triggerType="click"
                                  visible={this.state.visible3}
                                  onVisibleChange={this.onVisibleChange3}
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
                        <Input placeholder="邮箱"  className='classWidth' onChange={(e)=>{this.state.newData.email = e}}/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>电话：</span>
                        </div>
                        <Input placeholder="电话："   className='classWidth' onChange={(e)=>{this.state.newData.phone = e}}/>
                    </Row>
                </Dialog>
            );
        }
    }
}



export default CustomDialog

