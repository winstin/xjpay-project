import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox';
import { Row, Col } from 'qnui/lib/grid';
import Dialog from 'qnui/lib/dialog';
const { Group: CheckboxGroup } = Checkbox;

import Config from '../../../config/config.js'


class RoleDialog extends Component {
  constructor(props) {
        super(props);
        this.state = {
            value: 'orange'
        };
        console.log(Config.RolePlayer)
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
                <CheckboxGroup value={this.state.value} onChange={this.onChange.bind(this)}>
                    {this.renderCheckbox()}
                </CheckboxGroup>
            </Dialog>
        );
    }
}



export default RoleDialog

