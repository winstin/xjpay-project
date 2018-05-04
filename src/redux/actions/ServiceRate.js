/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const GETDATA = "GETDATA";


// import {ajax} from "./AY_API"
import {api,ajax,compareTime,isEmpty} from "static/utils.js"

export function getInitData(){
    return (dispatch)=>{
        // ajax("/rest/agentrate/list","","GET",function(e){
        //     // console.log("GoodsListTable：", e);
        //     dispatch({
        //         type:INITDATA,
        //         dataSource: e
        //     });
        // });

        api({
            method:'/rest/agents/list',
            mode:'jsonp',
            // args:{},
            callback:(rsp)=>{
                console.log(rsp);

                dispatch({
                    type:INITDATA,
                    dataSource: e
                });
            },
            errCallback:(msg)=>{
                // self.setState({msg:'账号密码错误！'});
                // clearAllCookie();
                // console.log(msg)
            }
        });
        // ajax({
        //     method:'/rest/agents/list',
        //     mode:'json',
        //     callback:(rsp)=>{
        //         console.log(rsp);

        //         dispatch({
        //             type:INITDATA,
        //             dataSource: e
        //         });
        //     },
        //     errCallback:(msg)=>{
        //         // self.setState({msg:'账号密码错误！'});
        //         // clearAllCookie();
        //         // console.log(msg)
        //     }
        // });
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


export function SearchData(appId,appName){
    return (dispatch)=>{
        ajax("/agentrate/list",{
            appId:appId,
            appName:appName
        },"GET",function(e){
            // console.log("GoodsListTable：", e);
            dispatch({
                type:INITDATA,
                dataSource: e
            });
        });
    }
}
