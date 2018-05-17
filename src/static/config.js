const Appconfig = {
    'http':'http://',
    'cdn':'web.xjpay.cc',
    'url':'web.xjpay.cc'
}

const webUrl = "http://localhost:3000";


//部门
const Department =[
	{
		name:'开发部',
		value:25
	},{
		name:'运营部',
		value:26
	},{
		name:'战略部',
		value:27
	},{
		name:'服务商',
		value:28
	}
]


//角色管理
const RolePlayer = [
	{
		name:'超级管理员',
		value:'superManger',
		id:1
	},{
		name:'临时超级管理员',
		value:'tempManger',
		id:5
	},{
		name:'渠道服务商',
		value:'channelManger',
		id:6
	},{
		name:'管理员',
		value:'commonManger',
		id:7
	}
]


const Orderment = [
	{
		name:"系统管理",
		part:[
			{
				name:"用户管理"
			},{
				name:"角色管理"
			},{
				name:"菜单管理"
			}
		]
	},{
		name:"商户管理",
		part:[
			{
				name:"商户管理"
			}
		]
	},{
		name:"交易管理",
		part:[
			{
				name:"交易流水查询"
			}
		]
	},{
		name:"结算管理",
		part:[
			{
				name:"商户手续费统计"
			},{
				name:"渠道分润统计"
			},{
				name:"收益管理"
			},
		]
	},{
		name:"服务商费率",
	},{
		name:"服务商管理",
	},
	// {
	// 	name:"报销管理"
	// },{
	// 	name:"通知"
	// },{
	// 	name:"代码生成"
	// },{
	// 	name:"接口文档"
	// },{
	// 	name:"星洁管理员"
	// },
	

]

//支付账号
const PayState = [
	{
		name:'全部',
		value:''
	},
	{
		name:'支付中',
		value:'A'
	},{
		name:'支付失败',
		value:'B'
	},{
		name:'支付完成',
		value:'C'
	},{
		name:'结算中',
		value:'D'
	},{
		name:'结算成功',
		value:'E'
	},{
		name:'预支付',
		value:'F'
	}
]








export default {Appconfig,Department,RolePlayer,Orderment,PayState,webUrl}
/**
项目常理存放地址
**/
