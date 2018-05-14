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
export function getInitData(pageno = 1,startDate=getNowFormatDate(),endDate=getNowFormatDate(),agentName='',filterAppId='',){
    return (dispatch)=>{
        api({
            method:'/profits/agent/page',
            mode:'jsonp',
            args:{
                startDate: startDate,
                endDate: endDate,
                agentName:agentName,
                filterAppId:filterAppId,
                pageIndex:pageno,
                pageSize:20
            },
            callback:(rsp)=>{
                if(rsp.data.data == ""){
                    dispatch({
                        type:INITGUNSDATA,
                        dataSource: [],
                        total:0,
                        countMerchantNum:0,
                        countOrderNum:0,
                        totalMoney:0,
                        totalProfit:0,
                    });
                }else{
                    dispatch({
                        type:INITGUNSDATA,
                        dataSource: rsp.data.data,
                        total:Number(rsp.data.total),
                        countMerchantNum:rsp.data.sum.sum_d0fee,
                        countOrderNum:rsp.data.sum.count_order_num,
                        sum_agent_profit:rsp.data.sum.sum_agent_profit,
                        totalMoney:rsp.data.sum.sum_total_fee,
                        totalProfit:rsp.data.sum.sum_total_profit,
                    });
                }
                
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
