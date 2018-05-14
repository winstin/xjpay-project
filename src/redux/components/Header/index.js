import Breadcrumb from 'qnui/lib/breadcrumb';
import React,{Component,PropTypes} from 'react'
import Icon from 'qnui/lib/icon';

let onMouseEnter = (id, item, nav) => {
    console.log('onMouseEnter')  
}

let onMouseLeave = (id, item, nav) => {
    console.log('onMouseLeave')
}


class RoleDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: []
        };
    }

    componentWillMount(){
        let menus = localStorage.getItem("History");
        let text = this.props.title;

        if(menus==undefined||menus==null){
            menus = JSON.stringify([]);
        }
        if(menus.indexOf(text)>-1){

        }else{
            let menu = JSON.parse(menus);
            menu.push(text);
            menus = JSON.stringify(menu);
            localStorage.setItem("History",JSON.stringify(menu));
        }
        this.setState({context:JSON.parse(menus)})
    }

    linkUrl(value){
        window.location.href = value;
    }
    

    //自动生成菜单
    checkInfo(value){
        switch(value){
            case"商户管理":
              return {icon:'account',link:'/dist/GunsIndex'}
              break;
            case"交易管理":
              return {icon:'store',link:'/dist/BatchPage'}
              break;
            case"商户手续费统计":
              return {icon:'box',link:'/dist/CommodityStatistics'}
              break;
            case"渠道分润统计":
              return {icon:'box',link:'/dist/ChannelStatistics'}
              break;
            case"收益管理":
              return {icon:'account',link:'/dist/GetManger'}
              break;
            case"服务商管理":
              return {icon:'table',link:'/dist/ServiceManger'}
              break;
            case"服务商费率":
              return {icon:'training',link:'/dist/ServiceRate'}
              break;
            case"用户管理":
              return {icon:'account',link:'/dist/UserManger'}
              break;

            case"结算管理":
              return {icon:'box',link:''}
              break;
            case"系统管理":
              return {icon:'account',link:''}
              break;


            case"角色管理":
              return {icon:'account',link:'/dist/RoleManger'}
              break;
            case"菜单管理":
              return {icon:'account',link:'/dist/OrderManger'}
              break;
             default:
              return  {icon:'minus',link:''}

        }
    }

    delete(value){
        let newData=[];
        for(let i in this.state.context){
            if(this.state.context[i] != value){
                newData.push(this.state.context[i]);
            }
        }

        localStorage.setItem("History",JSON.stringify(newData));
        this.setState({context:newData});
        let url = this.checkInfo(value);

        if(url.link == window.location.pathname){
            if(newData.length>=1){
                let url = this.checkInfo(newData[newData.length-1]);
                window.location.href = url.link
            }else{
                window.location.href = "/dist/"
            }
        }
        
    }

    render() {
        let jsx = this.state.context.map((item,index)=>{
            let url = this.checkInfo(item);
            if(item == "首页"){
                if("/dist/" != window.location.pathname){
                    return  <div className="nav-border">
                            <span onClick={this.linkUrl.bind(this,"/dist/")} className="paddtingRight-5">{item}</span>
                        </div>

                }else{
                    return  <div className="nav-border-active">
                            <span onClick={this.linkUrl.bind(this,"/dist/")} className="paddtingRight-5">{item}</span>
                        </div>
                }
                
            }else{
                if(url.link != window.location.pathname){
                    return  <div className="nav-border">
                            <span onClick={this.linkUrl.bind(this,url.link)} className="paddtingRight-5">{item}</span>
                            <i className="next-icon next-icon-error next-icon-mediums topicon" onClick={this.delete.bind(this,item)}></i>
                        </div>

                }else{
                    return  <div className="nav-border-active">
                            <span onClick={this.linkUrl.bind(this,url.link)} className="paddtingRight-5">{item}</span>
                            <i className="next-icon next-icon-error next-icon-mediums topicon" onClick={this.delete.bind(this,item)}></i>
                        </div>

                }
            }
            
        })

        return (
            <div className="borderSoild">
                {jsx}
            </div>
        );
    }
}



export default RoleDialog

