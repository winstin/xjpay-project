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
export function getInitData(pageno = 1,startDate='',endDate='',upstream=''){

    let serchData = {
                startDate: startDate,
                endDate: endDate,
                pageIndex:pageno,
                pageSize:20,
            };
    if(upstream != ''){
        serchData.upstream=upstream
    }


    return (dispatch)=>{
        api({
            method:'/profits/page',
            mode:'jsonp',
            args:serchData,
            callback:(rsp)=>{
                
                let profitsData = rsp.data.data;
                let sumTotalFee = 0;
                let sumOrderNum = 0;
                let sumProfit = 0;
                let sumD0fee = 0;
                let sumTotalProfit = 0;
                for(let i in profitsData){
                    if(profitsData[i].sumTotalFee){
                        sumTotalFee = sumTotalFee + Number(profitsData[i].sumTotalFee.replace(/\,/g,""));
                    }

                    if(profitsData[i].sumOrderNum){
                        sumOrderNum = sumOrderNum + Number(profitsData[i].sumOrderNum);
                    }

                    if(profitsData[i].sumProfit){
                        sumProfit = sumProfit + Number(profitsData[i].sumProfit.replace(/\,/g,""));
                    }

                    if(profitsData[i].sumD0fee){
                        sumD0fee = sumD0fee + Number(profitsData[i].sumD0fee.replace(/\,/g,""));
                    }

                    if(profitsData[i].sumTotalProfit){
                        sumTotalProfit = sumTotalProfit + Number(profitsData[i].sumTotalProfit.replace(/\,/g,""));
                    }
                }

                dispatch({
                    type:INITGUNSDATA,
                    dataSource: rsp.data.data,
                    total:rsp.data.total,
                    sumTotalFee:sumTotalFee.toFixed(2),
                    sumOrderNum:sumOrderNum,
                    sumProfit:sumProfit.toFixed(2),
                    sumD0fee:sumD0fee.toFixed(2),
                    sumTotalProfit:sumTotalProfit.toFixed(2),
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
            dispatch({
                type:INITGUNSDATA,
                dataSource: e
            });
        });
    }
}
