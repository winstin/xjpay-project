/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const GETDATA = "GETDATA";
export const CHOOSEDATA = "CHOOSEDATA";

import {api,ajax,compareTime,isEmpty} from "static/utils.js"

export function getInitData(pageno = 1){
    return (dispatch)=>{
        api({
            method:'/rest/agents/list',
            mode:'jsonp',
            args:{pageIndex:pageno},
            callback:(rsp)=>{
                // console.log(rsp);

                dispatch({
                    type:INITDATA,
                    dataSource: rsp.data.records,
                    total:rsp.data.total
                });
            },
            errCallback:(msg)=>{
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


export function setData(arrIndex,arrData){
    return (dispatch)=>{
        dispatch({
            type: CHOOSEDATA,
            chooseDatas:arrData,
            chooseIndex:arrIndex
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
