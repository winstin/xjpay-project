import React,{Component,PropTypes} from 'react'
import Dialog from 'qnui/lib/dialog';
import Config from 'static/config.js'
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';


class RoleDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            value: 'orange'
        };
    }

    
    onOpen = () => {
        this.props.index.setState({
            rolevisible: true
        });
    };

    onClose = () => {

        this.props.index.setState({
            rolevisible: false
        });
    }



    onChange(value) {
        this.setState({
            value: value
        });
        this.props.index.roleIds = value;
    }

    renderCheckbox(){
        let jsx = Config.RolePlayer.map((item,index)=>{
            return  <div >
                        <Radio  value={item.id}>
                            {Config.RolePlayer[index].name}
                        </Radio>
                        <br/><br/>
                    </div>
        })
        return jsx;
    }
    setRoleid = () =>{
        this.props.index.setState({
            rolevisible: false
        });
        this.props.index.setRoleid();
    }

    render() {
        const {visible,title} = this.props;
        
        return (
            <Dialog visible={visible}
                    onOk={this.setRoleid}
                    closable="esc,mask,close"
                    onCancel={this.onClose}
                    onClose={this.onClose} title={title}>
                <RadioGroup value={this.state.value} onChange={this.onChange.bind(this)}>
                    {this.renderCheckbox()}
                </RadioGroup>
            </Dialog>
        );
    }
}



export default RoleDialog

