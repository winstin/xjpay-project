/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";
export const CHOOSEDATA = "CHOOSEDATA";
export const GETDATA = "GETDATA";

import {api,isEmpty} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getInitData(pageno = 1,startDate='',endDate='',orderNo='',agentOrderNo='',agentName='',filterAppId='',merchantName='',mchId='',orderState='',result=''){
    return (dispatch)=>{
        api({
            method:'/orders/statOrder',
            mode:'jsonp',
            args:{
                startDate: '2018-05-05',
                endDate: '2018-05-05',
                orderNo: '',
                agentOrderNo: '',
                agentName: '',
                filterAppId: '',
                merchantName: '',
                mchId: '',
                orderState: '',
                result: '',
            },
            callback:(e)=>{
                 api({
                    method:'/orders/page',
                    mode:'jsonp',
                    args:{
                        startDate: startDate,
                        endDate: endDate,
                        orderNo: orderNo,
                        agentOrderNo: agentOrderNo,
                        agentName: agentName,
                        filterAppId: filterAppId,
                        merchantName: merchantName,
                        mchId: mchId,
                        orderState: orderState,
                        result: result,
                        pageIndex:pageno,
                        pageSize:20
                    },
                    callback:(rsp)=>{
                        dispatch({
                            type:INITGUNSDATA,
                            dataSource: rsp.data.data,
                            total:Number(rsp.data.total),
                            countMerchantNum:e.data.countMerchantNum,
                            countOrderNum:e.data.countOrderNum,
                            totalMoney:e.data.totalMoney,
                            totalProfit:e.data.totalProfit,
                        });
                    },
                    errCallback:(msg)=>{
                        // console.log(msg)
                    }
                });
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
      
    }
}



export function exportData(pageno = 1,startDate='',endDate='',orderNo='',agentOrderNo='',agentName='',filterAppId='',merchantName='',mchId='',orderState='',result=''){
    return (dispatch)=>{  
    api({
        method:'/orders/export',
        mode:'jsonp',
        args:{
            s1:1,
            startDate: startDate,
            endDate: endDate,
            orderNo: orderNo,
            agentOrderNo: agentOrderNo,
            agentName: agentName,
            filterAppId: filterAppId,
            merchantName: merchantName,
            mchId: mchId,
            orderState: orderState,
            result: result,
        },
        callback:(rsp)=>{
           
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


export function emptyData(){
    return (dispatch)=>{
        dispatch({
            type:INITGUNSDATA,
            dataSource: [],
            total:0
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
