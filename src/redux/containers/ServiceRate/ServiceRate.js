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
import {promptToast} from "static/utils.js"


import './ServiceRate.css';

const codeMent = [{
    name:'银联快捷',
    value:1
}]

const upstreamMent = [{
    name:'Q1',
    value:'HF_SERVICE'
},{
    name:'Q2',
    value:'CONGYU_SERVICE'
},{
    name:'Q3',
    value:'KFT_SERVICE'
}]

const pointTypeMent = [{
    name:'商旅类',
    value:0
},{
    name:'一般类',
    value:2
}]

const typeMent = [{
    name:'D0',
    value:0
},{
    name:'T1',
    value:1
}]


class ServiceRates extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
        this.appid = "";
        this.state = {
            visible: false,
            visible0: false,
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visibles:false,
            newData:{
                code:1,codeName:'银联快捷',
                upstream:'HF_SERVICE',upstreamName:'Q1',
                pointType:0,pointTypeName:'商旅类',
                type:0,typeName:'D0',
            },
            autoName:''
        };
        this.oldData = {};
        this.current = 1;
        // this.rateId = "";
    }


    componentDidMount(){
        const {getInitData} = this.props;
        getInitData();
    }


    reLoad(){
        let self = this;
        const{getInitData} = this.props;
        setTimeout(
            function(){
                getInitData(self.current,self.id,self.name);
            }
        ,500)
    }

    handleChange(current) {
        this.current = current;
        const {getInitData} = this.props;
        getInitData(current,this.id,this.name);
    }


    searchData(){
        this.current = 1;
        const{getInitData,SearchData} = this.props;
        getInitData(1,this.id,this.name);
    }

    onchange(type,value){
        if(type == "id"){
            this.id = value;
        }else{
            this.name = value;
        }

    }
    onOpen = () => {
        this.setState({
            visible: true
        });
    };

    onOpenChange = () => {
        if(this.appid == ""){            
            promptToast('请选择操作项！');
            return;
        }
        this.setState({
            visible0: true
        });
    }

    remove = () =>{
        if(this.appid == ""){            
            promptToast('请选择操作项！');
            return;
        }
        const {deleteData} = this.props;
        deleteData(this.appid)
    }

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    onCloseChange = () => {
        this.setState({
            visible0: false
        });
    }


    onRowClick = (index,record)=>{
        this.appid = index[0];

        this.oldData = record[0];
        this.oldData.codeName = this.cellRender(this.oldData.code);
        this.oldData.pointTypeName = this.cellPointType(this.oldData.pointType);
        this.oldData.typeName = this.cellType(this.oldData.type);
        this.oldData.upstreamName = this.cellUpstream(this.oldData.upstream);
    }

    addRates = () =>{
        this.setState({
            visible: false
        });
        const {getInitData,addData} = this.props;
        addData(this.state.newData);
        this.reLoad();

    }



    updateRates = () =>{
        this.setState({
            visible0: false
        });
        const {updateData} = this.props;
        updateData(this.oldData);

        this.reLoad();
        // setTimeout(function(){getInitData()},500);
    }

    toggleVisible = () => {
        this.setState({
            visibles: !this.state.visibles
        });
    };

    onVisibleChange1 = visibles => {
        this.setState({
            visible1:visibles
        });
    };
    onVisibleChange2 = visibles => {
        this.setState({
            visible2:visibles
        });
    };
    onVisibleChange3 = visibles => {
        this.setState({
            visible3:visibles
        });
    };
    onVisibleChange4 = visibles => {
        this.setState({
            visible4:visibles
        });
    };


    cellRender = (value, index, record, context) => {
        if(value == 1){
            return '银联快捷';
        }else{
            return value;
        }
    }

    cellUpstream = (value, index, record, context) => {
        if(value == 'KFT_SERVICE'){
            return 'Q3';
        }else if(value == 'HF_SERVICE'){
            return 'Q1';
        }else if(value == 'CONGYU_SERVICE'){
            return 'Q2';
        }

    }

    cellPointType = (value, index, record, context) => {
       if(value == 0){
            return '商旅类';
        }else if(value == 2){
            return '一般类';
        }else{
            
            return '-';
        }
    }


    cellType = (value, index, record, context) => {
        if(value == 0){
            return 'D0';
        }else{
            return 'T1';
        }
    }
    render() {
        const {dataSource,isLoad,total,containerHeight} = this.props;

        let code = codeMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.state.newData.code = item.value;
                            this.state.newData.codeName = item.name;
                         }}>
                        {item.name}
                    </Menu.Item>
        })

        let upstream = upstreamMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.state.newData.upstream = item.value;
                            this.state.newData.upstreamName = item.name;
                        }}
                            >{item.name}
                    </Menu.Item>
        })

        let pointType = pointTypeMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.state.newData.pointType = item.value;
                            this.state.newData.pointTypeName = item.name;
                        }}
                            >{item.name}
                    </Menu.Item>
        })

        let type = typeMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.state.newData.type = item.value;
                            this.state.newData.typeName = item.name;
                        }}
                            >{item.name}
                    </Menu.Item>
        })


        let code0 = codeMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.oldData.code = item.value;
                            this.oldData.codeName = item.name;
                         }}>
                        {item.name}
                    </Menu.Item>
        })

        let upstream0 = upstreamMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.oldData.upstream = item.value;
                            this.oldData.upstreamName = item.name;
                        }}
                            >{item.name}
                    </Menu.Item>
        })

        let pointType0 = pointTypeMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.oldData.pointType = item.value;
                            this.oldData.pointTypeName = item.name;
                        }}
                            >{item.name}
                    </Menu.Item>
        })

        let type0 = typeMent.map((item,index)=>{
            return  <Menu.Item onClick={
                        ()=>{
                            this.oldData.type = item.value;
                            this.oldData.typeName = item.name;
                        }}
                            >{item.name}
                    </Menu.Item>
        })



        return (
            <div>
                <div className="paddingTop">
                    <span className='top-sumtext-bold'>渠道编号：</span>
                    <Input placeholder="渠道编号" size="large"   style={{width:'120px'}} onChange={this.onchange.bind(this,'id')}/>
                    <span className='top-sumtext'>渠道名称：</span>
                    <Input placeholder="渠道名称" size="large"   style={{width:'120px'}} onChange={this.onchange.bind(this,'name')}/>
                   {/* <Button type="primary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.searchData.bind(this)}>搜索</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onOpen}>添加</Button>
                    <Button type="secondary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onOpenChange}>修改</Button>*/}
                </div>

                <div className="marginTop-20">
                    <Button type="primary" style={{width:'100px'}} size="large" onClick={this.searchData.bind(this)}>搜索</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onOpen}>添加</Button>
                    <Button type="secondary" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.onOpenChange}>修改</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} size="large" onClick={this.remove}>删除</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} rowSelection={{onChange: this.onRowClick,mode:'single'}} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title="编号" dataIndex="id"/>
                        <Table.Column title="创建时间" dataIndex="createTime"/>
                        <Table.Column title="服务商编号" dataIndex="appid"/>
                        <Table.Column title="服务商名称" dataIndex="agentName"/>
                        <Table.Column title="业务类型" dataIndex="code" cell={this.cellRender}/>
                        <Table.Column title="上游渠道" dataIndex="upstream" cell={this.cellUpstream}/>
                        <Table.Column title="交易类型" dataIndex="pointType" cell={this.cellPointType}/>
                        <Table.Column title="结算类型" dataIndex="type" cell={this.cellType}/>
                        <Table.Column title="鉴权费" dataIndex="mode"/>
                        <Table.Column title="结算费率" dataIndex="fee0"/>
                        <Table.Column title="代付费" dataIndex="d0fee"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination current={this.current} size="large" onChange={this.handleChange.bind(this)} pageSize={20} total={total}/>
                </div>

                <Dialog visible={this.state.visible}
                        onOk={this.addRates}
                        closable="esc,mask,close"
                        onCancel={this.onClose}
                        onClose={this.onClose} title="添加">
                    <Row>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>渠道编号：</span>
                        </div>
                        
                        <Input placeholder="渠道编号" className="textClsName"   style={{width:'180px'}} 
                            value={this.state.autoName}
                            onChange={(e)=>{
                                this.state.newData.appid = e;
                                this.setState({autoName:e})
                            }}
                            onBlur={(e)=>{
                                if(this.state.newData.appid!=""){
                                    const {autoSearch} = this.props;
                                    autoSearch(this.state.newData.appid,(e)=>{
                                        // console.log(e);
                                        if(e.length){
                                            this.setState({autoName:this.state.autoName+" - "+e[0].name})
                                        }else{
                                            this.setState({autoName:this.state.autoName+" - "+"没有匹配到服务商"})
                                        }
                                    })
                                }
                            }}
                        />
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>业务类型：</span>
                        </div>

                        <Dropdown trigger={<Input placeholder="业务类型" className="textClsName"   style={{width:'180px'}} value={this.state.newData.codeName}/>}
                                  triggerType="click"
                                  visible={this.state.visible1}
                                  onVisibleChange={this.onVisibleChange1}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {code}
                            </Menu>
                        </Dropdown>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>上游渠道：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="上游渠道" className="textClsName"   style={{width:'180px'}} value={this.state.newData.upstreamName}/>}
                                  triggerType="click"
                                  visible={this.state.visible2}
                                  onVisibleChange={this.onVisibleChange2}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {upstream}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>交易类型：</span>
                        </div>

                        <Dropdown trigger={<Input placeholder="交易类型" className="textClsName"   style={{width:'180px'}} value={this.state.newData.pointTypeName}/>}
                                  triggerType="click"
                                  visible={this.state.visible4}
                                  onVisibleChange={this.onVisibleChange4}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {pointType}
                            </Menu>
                        </Dropdown>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>结算类型：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="结算类型" className="textClsName"   style={{width:'180px'}} value={this.state.newData.typeName}/>}
                                  triggerType="click"
                                  visible={this.state.visible3}
                                  onVisibleChange={this.onVisibleChange3}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {type}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>鉴权费：</span>
                        </div>
                        <Input placeholder="鉴权费" className="textClsName"   style={{width:'180px'}} onChange={(e)=>{this.state.newData.mode = e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>结算费率(‰)：</span>
                        </div>
                        <Input placeholder="结算费率(‰)" className="textClsName"   style={{width:'180px'}} onChange={(e)=>{this.state.newData.fee0 = e}}/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>代付费(分)：</span>
                        </div>
                        <Input placeholder="代付费(分)" className="textClsName"   style={{width:'180px'}} onChange={(e)=>{this.state.newData.d0fee = e}}/>
                    </Row>
                </Dialog>


                <Dialog visible={this.state.visible0}
                        onOk={this.updateRates}
                        closable="esc,mask,close"
                        onCancel={this.onCloseChange}
                        onClose={this.onCloseChange} title="修改">
                    <Row>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>渠道编号：</span>
                        </div>
                        
                        <Input placeholder="渠道编号" className="textClsName"   style={{width:'180px'}} value={this.oldData.appid} disabled/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>业务类型：</span>
                        </div>

                        <Dropdown trigger={<Input placeholder="业务类型" className="textClsName"   style={{width:'180px'}} value={this.oldData.codeName} />}
                                  triggerType="click"
                                  visible={this.state.visible1}
                                  onVisibleChange={this.onVisibleChange1}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {code0}
                            </Menu>
                        </Dropdown>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>上游渠道：</span>
                        </div>
                        {/*<Dropdown trigger={<Input placeholder="上游渠道" className="textClsName"   style={{width:'180px'}} value={this.oldData.upstreamName} disabled/>}
                                  triggerType="click"
                                  visible={this.state.visible2}
                                  onVisibleChange={this.onVisibleChange2}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {upstream0}
                            </Menu>
                        </Dropdown>*/}
                        <Input placeholder="上游渠道" className="textClsName"   style={{width:'180px'}} value={this.oldData.upstreamName} disabled/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>交易类型：</span>
                        </div>

                        {/*<Dropdown trigger={<Input placeholder="交易类型" className="textClsName"   style={{width:'180px'}} value={this.oldData.pointTypeName}/>}
                                  triggerType="click"
                                  visible={this.state.visible4}
                                  onVisibleChange={this.onVisibleChange4}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {pointType0}
                            </Menu>
                        </Dropdown>*/}
                        <Input placeholder="交易类型" className="textClsName"   style={{width:'180px'}} value={this.oldData.pointTypeName} disabled/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>结算类型：</span>
                        </div>
                        <Dropdown trigger={<Input placeholder="结算类型" className="textClsName"   style={{width:'180px'}} value={this.oldData.typeName}/>}
                                  triggerType="click"
                                  visible={this.state.visible3}
                                  onVisibleChange={this.onVisibleChange3}
                                  safeNode={() => this.refs.button}>
                            <Menu>
                                {type0}
                            </Menu>
                        </Dropdown>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>鉴权费：</span>
                        </div>
                        <Input placeholder="鉴权费" className="textClsName"   style={{width:'180px'}} defaultValue={this.oldData.mode} onChange={(e)=>{this.oldData.mode = e}}/>
                    </Row>
                    <Row className="marginTop">
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px'}}>结算费率(‰)：</span>
                        </div>
                        <Input placeholder="结算费率(‰)" className="textClsName"   style={{width:'180px'}} defaultValue={this.oldData.fee0} onChange={(e)=>{this.oldData.fee0 = e}}/>
                        <div className="flexStyle">
                            <span></span>
                            <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>代付费(分)：</span>
                        </div>
                        <Input placeholder="代付费(分)" className="textClsName"   style={{width:'180px'}} defaultValue={this.oldData.d0fee} onChange={(e)=>{this.oldData.d0fee = e}}/>
                    </Row>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ServiceRate.dataSource,
        isLoad:state.ServiceRate.isLoad,
        total:state.ServiceRate.total,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 250;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(ServiceRates))

