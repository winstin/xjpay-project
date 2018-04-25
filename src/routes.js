import React from 'react'
//IndexRoute就是根路由默认显示的
import {Router, Route, IndexRoute} from 'react-router'
//从src/containers/index.js导入


import {OrderManger,RoleManger,UserManger,Login,CommodityStatistics,ChannelStatistics,GetManger,ServiceManger,BatchPage,GunsIndex,ServiceRate,AutoEva, App} from './redux/containers/'

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
    path: '/',
    component: App,
    indexRoute: {component: GunsIndex},
    childRoutes: [
        {path:'/',component:GunsIndex},
        {path:'/autoeva',component:AutoEva},
        {path:'/ServiceRate',component:ServiceRate},
        {path:'/BatchPage',component:BatchPage},
        {path:'/ServiceManger',component:ServiceManger},
        {path:'/GetManger',component:GetManger},
        {path:'/ChannelStatistics',component:ChannelStatistics},
        {path:'/CommodityStatistics',component:CommodityStatistics},
        {path:'/Login',component:Login},
        {path:'/UserManger',component:UserManger},
        {path:'/RoleManger',component:RoleManger},
        {path:'/OrderManger',component:OrderManger},
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
