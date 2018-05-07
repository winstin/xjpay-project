/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const GETDATA = "GETDATA";


// import {ajax} from "./AY_API"
import {api,ajax,compareTime,isEmpty} from "static/utils.js"

export function getInitData(){
    return (dispatch)=>{
        api({
            method:'/agentrate/list',
            mode:'jsonp',
            // args:{},
            callback:(rsp)=>{
                // console.log(rsp);
                dispatch({
                    type:INITDATA,
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
