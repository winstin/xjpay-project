/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";
export const CHOOSEDATA = "CHOOSEDATA";
export const GETDATA = "GETDATA";

import {api,isEmpty,getNowFormatDate} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getInitData(pageno = 1,startDate=getNowFormatDate(),endDate=getNowFormatDate(),agentName='',merchantName='',filterAppId='',mchId=''){
    return (dispatch)=>{
        api({
            method:'/profits/merchant/page',
            mode:'jsonp',
            args:{
                startDate: startDate,//'2018-05-05'
                endDate: endDate,
                agentName: agentName.trim(),
                filterAppId: filterAppId.trim(),
                merchantName: merchantName.trim(),
                mchId: mchId.trim(),
                pageIndex:pageno,
                pageSize:20
            },
            callback:(rsp)=>{
                if(rsp.data.data == ""){
                    return;
                }
                dispatch({
                    type:INITGUNSDATA,
                    dataSource: rsp.data.data,
                    total:Number(rsp.data.total)
                });
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
      
    }
}

export function emptyData(){
    return (dispatch)=>{
        dispatch({
            type:INITGUNSDATA,
            dataSource: [],
            total:0
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

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  选中记录
 * @version  [version]
 * @param    {[type]}   arrIndex [description]
 * @param    {[type]}   arrData  [description]
 */
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
                type:INITGUNSDATA,
                dataSource: e
            });
        });
    }
}
