/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const GETDATA = "GETDATA";
export const SERVICEDATA = "SERVICEDATA";



// import {ajax} from "./AY_API"
import {api,ajax,compareTime,isEmpty} from "static/utils.js"

// export function getInitData(){
//     return (dispatch)=>{
//         api({
//             method:'/agentrate/list',
//             mode:'jsonp',
//             // args:{},
//             callback:(rsp)=>{
//                 // console.log(rsp);
//                 dispatch({
//                     type:INITDATA,
//                     dataSource: rsp
//                 });
//             },
//             errCallback:(msg)=>{
//                 // self.setState({msg:'账号密码错误！'});
//                 // clearAllCookie();
//                 // console.log(msg)
//             }
//         });
       
//     }
// }
export function getInitData(pageno=1,appId='',appName=''){
    return (dispatch)=>{
        api({
            method:'/rates/page',
            mode:'jsonp',
            args:{
                appId:appId.trim(),
                appName:appName.trim(),
                pageIndex:pageno,
                pageSize:20
            },
            callback:(rsp)=>{
                // console.log(rsp);
                dispatch({
                    type:INITDATA,
                    dataSource: rsp.data.records,
                    total: rsp.data.total
                });
            },
            errCallback:(msg)=>{
                // self.setState({msg:'账号密码错误！'});
                // clearAllCookie();
                // console.log(msg)
            }
        });
       
    }
}


export function getServiceData(){
    return (dispatch)=>{
        api({
            method:'/agent/list',
            mode:'jsonp',
            // args:{},
            callback:(rsp)=>{
                console.log(rsp);
                dispatch({
                    type:SERVICEDATA,
                    dataSource: rsp
                });
            },
            errCallback:(msg)=>{
                // self.setState({msg:'账号密码错误！'});
                // clearAllCookie();
                // console.log(msg)
            }
        });
       
    }
}


export function addData(data = {}){
    return (dispatch)=>{
        api({
            method:'/agentrate/add',
            mode:'jsonp',
            args:{
                id:'',
                code:data.code,
                mode:data.mode,
                appid:data.appid,
                pointTpye:data.pointType,
                type:data.type,
                fee0:data.fee0,
                d0fee:data.d0fee,
                upstream:data.upstream,
            },
            callback:(rsp)=>{
                console.log(rsp);
                // dispatch({
                //     type:SERVICEDATA,
                //     dataSource: rsp
                // });
            },
            errCallback:(msg)=>{
                // self.setState({msg:'账号密码错误！'});
                // clearAllCookie();
                // console.log(msg)
            }
        });
       
    }
}


export function updateData(oldData,newData){
    return (dispatch)=>{
        api({
            method:'/agentrate/add',
            mode:'jsonp',
            args:{
                id:'',
                code:data.code,
                mode:data.mode,
                appid:data.appid,
                pointTpye:data.pointType,
                type:data.type,
                fee0:data.fee0,
                d0fee:data.d0fee,
                upstream:data.upstream,
            },
            callback:(rsp)=>{
                console.log(rsp);
                // dispatch({
                //     type:SERVICEDATA,
                //     dataSource: rsp
                // });
            },
            errCallback:(msg)=>{
                // self.setState({msg:'账号密码错误！'});
                // clearAllCookie();
                // console.log(msg)
            }
        });
       
    }
}

export function getData(pageno){
    return (dispatch)=>{
        dispatch({
            type: GETDATA,
            pageno: pageno
        });
    }
}

export function SearchData(appId='',appName=''){
    return (dispatch)=>{
        api({
            method:'/agentrate/list',
            mode:'jsonp',
            args:{
                appId:appId.trim(),
                appName:appName.trim()
            },
            callback:(e)=>{
                dispatch({
                    type:INITDATA,
                    dataSource: e,
                });
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
       
    }
}
// export function SearchData(appId,appName){
//     return (dispatch)=>{
//         api({
//             method:'/agentrate/list',
//             mode:'jsonp',
//             args:{},
//             callback:(rsp)=>{
//                 // console.log(rsp);
//                 dispatch({
//                     type:INITDATA,
//                     dataSource: rsp
//                 });
//             },
//             errCallback:(msg)=>{
//                 // self.setState({msg:'账号密码错误！'});
//                 // clearAllCookie();
//                 // console.log(msg)
//             }
//         });
//     }
// }
