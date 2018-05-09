import React from 'react'
//IndexRoute就是根路由默认显示的
import {Router, Route, IndexRoute} from 'react-router'
//从src/containers/index.js导入


import {PersonalCenter,OrderManger,RoleManger,UserManger,SetPwd,CommodityStatistics,ChannelStatistics,GetManger,ServiceManger,BatchPage,GunsIndex,ServiceRate, App} from './redux/containers/'

// import ErrorOrder from './redux/components/ErrorOrder'

//这里IndexRoute入在根app下后，就是在App页面组件的props.children
//匹配规则参考官方文档
// const routerConfig = [
//     {
//         path          : '/',
//         component     : Main,
//         childrenRoutes: [
//             {path: 'about', component: About},
//             {path: 'inbox', component: Inbox}
//         ]
//     },
//     {
//         path: '*',
//         component: Not
//     }
// ];

export const createRoutes = () => ({
    path: '/dist',
    component: App,
    indexRoute: {component: GunsIndex},
    childRoutes: [
        {path:'/dist',component:GunsIndex},
        {path:'/dist/ServiceRate',component:ServiceRate},
        {path:'/dist/BatchPage',component:BatchPage},
        {path:'/dist/ServiceManger',component:ServiceManger},
        {path:'/dist/GetManger',component:GetManger},
        {path:'/dist/ChannelStatistics',component:ChannelStatistics},
        {path:'/dist/CommodityStatistics',component:CommodityStatistics},
        {path:'/dist/reSetPassword',component:SetPwd},
        {path:'/dist/UserManger',component:UserManger},
        {path:'/dist/RoleManger',component:RoleManger},
        {path:'/dist/OrderManger',component:OrderManger},
        {path:'/dist/Personal',component:PersonalCenter},
    // PageNotFound(),
    // Redirect
  ]
})
export default createRoutes

// export default (
//   <Route name='app' path='/' component={App}>
//     <IndexRoute component={Form} />
//     <Route path="/Goods" component={Goods} />
//     <Route path="/Box" component={Box} />
//     <Route path="/Trade" component={Trade} />
//     <Route path="/Table" component={Table} />
//     <Route path="/Cancel" component={Cancel} />
//     <Route path="/Setting" component={Setting} />
//   </Route>
// )
