import React,{Component,PropTypes} from 'react'
import Button from 'qnui/lib/button';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import Config from '../../../config/config.js'




let department = Config.Department.map((item,index)=>{
    return <Menu.Item>{item.name}</Menu.Item>
})

let superment = Config.RolePlayer.map((item,index)=>{
    return <Menu.Item>{item.name}</Menu.Item>
})


const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);
class CustomDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibles:false
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
        this.props.index.setState({
            visibles: !this.state.visibles
        });
    };

    onVisibleChange = visibles => {
        this.setState({
            // visibles1:visibles,
            visibles2:visibles
        })
    };

    onchange(){
        
    }

    render() {
        const {visible,title} = this.props;        
        return (
            <Dialog visible={visible}
                    onOk={this.onClose}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose} title={title}>
                <Row>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>角色名称：</span>
                    </div>

                    <Input placeholder="角色名称"    className='classWidth' onChange={this.onchange.bind(this,'id')}/>

                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>别名：</span>
                    </div>
                    <Input placeholder="别名"    className='classWidth' onChange={this.onchange.bind(this,'name')}/>
                </Row>
                <Row className="marginTop">
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>上级名称：</span>
                    </div>
                    <Dropdown trigger={<Input placeholder="上级名称"    className='classWidth' onChange={this.onchange.bind(this,'id')}/>}
                              triggerType="click"
                              visible={this.state.visibles1}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
                        <Menu>
                            {superment}
                        </Menu>
                    </Dropdown>
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>排序：</span>
                    </div>
                    <Input placeholder="排序"    className='classWidth' onChange={this.onchange.bind(this,'name')}/>
                </Row>
                <Row className="marginTop">
                    <div className="flexStyle">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>部门名称：</span>
                    </div>
                    <Dropdown trigger={<Input placeholder="部门名称"    className='classWidth' onChange={this.onchange.bind(this,'id')}/>}
                              triggerType="click"
                              visible={this.state.visibles2}
                              onVisibleChange={this.onVisibleChange}
                              safeNode={() => this.refs.button}>
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



export default CustomDialog

