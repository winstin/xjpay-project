import React,{Component,PropTypes} from 'react'
import Button from 'qnui/lib/button';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import Config from 'static/config.js'






class CustomDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibles:false,
            newData:{}
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

    addData = () =>{
        this.props.index.setState({
            visible: false
        });
        this.props.index.onAdd();
    }


    changeInfo = () =>{
        this.props.index.setState({
            visible: false
        });
        this.props.index.onchange(this.props.oldData,this.state.newData);
    }


    toggleVisible = () => {
        this.props.index.setState({
            visibles: !this.state.visibles
        });
    };

    onVisibleChange1 = (visibles,type,e) => {
        this.setState({
            visibles1:visibles
        })
    };

    onVisibleChange2 = (visibles,type,e) => {
        this.setState({
            // visibles1:visibles,
            visibles2:visibles
        })
    };

    onchange(){
        
    }

    deptid(value){
       switch(value){
            case 24:
                return "总公司"
            case 25:
                return "开发部"
            case 26:
                return "运营部"
            case 27:
                return "战略部"
            case 28:
                return "服务商"

        }
    }

    pid(value){
        switch(value){
            case 0:
                return "-";
                break;
            case 1:
                return "超级管理员";
                break;
            case 5:
                return "临时管理员";
                break;
            case 7:
                return "管理员";
                break;
            case 6:
                return "渠道服务商";
                break;
            default:
                return "-";
                break;
        }
    }

    render() {
        const {visible,title,oldData} = this.props;
        let department = Config.Department.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.props.index.deptid = item.name}}>{item.name}</Menu.Item>
        })

        let superment = Config.RolePlayer.map((item,index)=>{
            return <Menu.Item onClick={()=>{this.props.index.pName = item.name;this.props.index.pid = item.id;}}>{item.name}</Menu.Item>
        })


         let department0 = Config.Department.map((item,index)=>{
            return <Menu.Item onClick={()=>{oldData.deptid = item.value}}>{item.name}</Menu.Item>
        })

        let superment0 = Config.RolePlayer.map((item,index)=>{
            return <Menu.Item onClick={()=>{oldData.pid = item.id;}}>{item.name}</Menu.Item>
        })


        if(title == "修改"){       
            return (
                <Dialog visible={visible}
                        onOk={this.changeInfo}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                    <Row>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>角色名称：</span>
                        </div>

                        <Input placeholder="角色名称" className='classWidth' defaultValue = {oldData.name} onChange={(e)=>{this.state.newData.name = e}}/>

                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>别名：</span>
                        </div>
                        <Input placeholder="别名"    className='classWidth' defaultValue = {oldData.tips} onChange={(e)=>{this.state.newData.tips = e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>上级名称：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="上级名称"    className='classWidth' value={this.pid(oldData.pid)}/>}
                                  triggerType="click"
                                  visible={this.state.visibles1}
                                  onVisibleChange={this.onVisibleChange1}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {superment0}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>排序：</span>
                        </div>
                        <Input placeholder="排序"    className='classWidth' defaultValue={oldData.num} onChange={(e)=>{this.state.newData.num = e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>部门名称：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="部门名称"    className='classWidth' value={this.deptid(oldData.deptid)}/>}
                                  triggerType="click"
                                  visible={this.state.visibles2}
                                  onVisibleChange={this.onVisibleChange2}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {department0}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle hide">
                        </div>
                        <Input placeholder="部门名称" className='classWidth hide' />
                    </Row>
                   
                </Dialog>
            );
        }else{
            return (
                <Dialog visible={visible}
                        onOk={this.addData}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title={title}>
                    <Row>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>角色名称：</span>
                        </div>

                        <Input placeholder="角色名称"    className='classWidth' onChange={(e)=>{this.props.index.name=e}}/>

                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>别名：</span>
                        </div>
                        <Input placeholder="别名"    className='classWidth' onChange={(e)=>{this.props.index.tips=e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>上级名称：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="上级名称"    className='classWidth' value={this.props.index.pName}/>}
                                  triggerType="click"
                                  visible={this.state.visibles1}
                                  onVisibleChange={this.onVisibleChange1}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {superment}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>排序：</span>
                        </div>
                        <Input placeholder="排序"    className='classWidth'onChange={(e)=>{this.props.index.num=e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>部门名称：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="部门名称"    className='classWidth' value={this.props.index.deptid}/>}
                                  triggerType="click"
                                  visible={this.state.visibles2}
                                  onVisibleChange={this.onVisibleChange2}
                                  safeNode={() => this.refs.button}
                                  >
                            <Menu>
                                {department}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle hide">
                        </div>
                        <Input placeholder="部门名称" className='classWidth hide' />
                    </Row>
                </Dialog>
            );
        }
    }
}



export default CustomDialog

