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
// import {getInitData} from '../../actions/ServiceRate';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';

import Tools  from 'static/utils.js'

const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    },
    getData = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push({
                title: {name: `2000`},
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
class PersonalCenter extends Component {
  constructor(props) {
        super(props);

        this.state = {
            dataSource: getData(5),
            visible:false,
            visibles:false
        };

    }

  onSearch(value) {
      console.log(value);
  }

  loadTradeList(){
    let self = this;
    let list = [];
    //gettbtime();

    const {getTradeList} = this.props;
    getTradeList();

  }
  componentWillMount() {
        Tools.showLoading('加载数据中...');
        console.log('Component WILL MOUNT!');
        Tools.hideLoading();
  }

  componentDidMount(){
    console.log("首次渲染页面")
    console.log(this.props)
    const {getInitData} = (this.props);
    getInitData();
  }


   onOpen = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    toggleVisible = () => {
        this.setState({
            visibles: !this.state.visibles
        });
    };

    onVisibleChange = visibles => {
        this.setState({
            visibles
        });
    };

  render() {
        const {containerHeight} = (this.props);
        return (
            <div className="PersonalCenter">
                <div className="space-bottom">
                    <span className='tips-title'>基础信息</span>
                </div>
                <Row className="marginTop text-center">
                    <div className="flexStyles" >
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                    </div>
                    
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                    </div>
                    <Input value="执照编号" className="input-width"  disabled />
                </Row>
                <Row className="marginTop text-center border-bottom">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>签约时间：</span>
                    </div>
                    <Input disabled value="渠道类型" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                    </div>
                    <Input disabled value="渠道级别" className="input-width"   />
                </Row>
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人电话：</span>
                    </div>
                    <Input disabled value="到期时间" className="input-width"   />
                </Row>
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                    </div>
                    <Input disabled value="法人姓名" className="input-width"   />
                </Row>
                <Row className="marginTop text-center border-bottom">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles hide">
                    </div>
                    <Input className='input-width hide' />
                </Row>
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>法人邮箱：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>商务邮箱：</span>
                    </div>
                    <Input disabled value="法人邮箱" className="input-width"   />
                </Row>

                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>财务邮箱：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>APP名称：</span>
                    </div>
                    <Input disabled value="财务邮箱" className="input-width"   />
                </Row>

                <Row className="marginTop text-center border-bottom">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>官网地址：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles hide">
                    </div>
                    <Input className='input-width hide' />
                </Row>


                <div className="space-bottom">
                    <span className='tips-title'>结算信息</span>
                </div>
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                    </div>
                    
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                    </div>
                    <Input disabled value="收款户名" className="input-width"   />
                </Row>
                <Row className="marginTop text-center border-bottom">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                    </div>
                    <Input disabled value="公司名称" className="input-width"   />
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                    </div>
                    <Input disabled value="收款账户" className="input-width"   />
                </Row>


                <div className="space-bottom">
                    <span className='tips-title'>业务类型</span>
                </div>
                <Table dataSource={this.state.dataSource} onRowClick={onRowClick}  hasBorder={true} fixedHeader className="text-left">
                    <Table.Column title={<b>业务名称</b>} dataIndex="title.name" />
                    <Table.Column title={<b>渠道名称</b>} dataIndex="time" />
                    <Table.Column title={<b>交易类型</b>} dataIndex="title.name" />
                    <Table.Column title={<b>结算费率</b>} dataIndex="time" />
                    <Table.Column title={<b>代付费</b>} dataIndex="title.name" />
                    <Table.Column title={<b>鉴权费</b>} dataIndex="time" />
                    <Table.Column title={<b>是否开通</b>} dataIndex="time" />
                </Table>


                <div className="space-bottom marginTop">
                    <span className='tips-title'>渠道管理</span>
                </div>
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>管理后台地址：</span>
                    </div>

                    <span style={{fontSize:'14px',marginTop:'7px'}} className="input-width">https://web.xjpay.cc</span>
                    <div className="flexStyles hide">
                    </div>
                    <Input className='input-width hide' />
                </Row>
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>请求地址：</span>
                    </div>
                    <span style={{fontSize:'14px',marginTop:'7px'}} className="input-width">https://api.xjpay.cc</span>
                    <div className="flexStyles hide">
                    </div>
                    <Input className='input-width hide' />
                </Row>
                <Row className="marginTop text-center border-bottom">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}} >密钥：</span>
                    </div>
                    <span style={{fontSize:'14px',marginTop:'7px'}} className="input-width">93bebec70b8841a5bf604a055f24f0e3</span>
                    <div className="flexStyles hide">
                    </div>
                    <Input className='input-width hide' />
                </Row>

                
                <Row className="marginTop text-center">
                    <div className="flexStyles">
                        <span></span>
                        <span style={{fontSize:'14px',marginTop:'7px'}}>公司邮箱：</span>
                    </div>
                    <span style={{fontSize:'14px',marginTop:'7px'}} className="input-width">792282qq.com</span>
                    <div className="flexStyles hide">
                    </div>
                    <Input className='input-width hide' />
                </Row>
            </div>
        );
    }
    reduceContent() {
        this.setState({
            dataSource: getData(10)
        });
    }
}

function mapStateToProps(state, ownProps){
    return {
        data:state.ServiceRate.isupdate
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 230;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(PersonalCenter))
