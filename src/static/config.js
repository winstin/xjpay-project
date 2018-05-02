const Appconfig = {
    'http':'http://',
    'cdn':'web.xjpay.cc',
    'url':'web.xjpay.cc'
}


//部门
const Department =[
	{
		name:'开发部'
	},{
		name:'运营部'
	},{
		name:'战略部'
	},{
		name:'服务商'
	}
]


//角色管理
const RolePlayer = [
	{
		name:'超级管理员',
		value:'superManger'
	},{
		name:'临时超级管理员',
		value:'tempManger'
	},{
		name:'渠道服务商',
		value:'channelManger'
	},{
		name:'管理员',
		value:'commonManger'
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




export default {Appconfig,Department,RolePlayer,Orderment}
/**
项目常理存放地址
**/
