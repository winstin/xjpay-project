/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";
export const CHOOSEDATA = "CHOOSEDATA";

import {api,isEmpty,successToast,errorToast} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getInitData(pageno = 1,merchantName='',mchId='',startDate='',endDate=''){
    return (dispatch)=>{
        api({
            method:'/merchants/page',
            mode:'jsonp',
            args:{
                startDate: startDate,
                endDate: endDate,
                // agentName: '',
                // filterAppId: '',
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
                    total:rsp.data.total
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


/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  锁定商户
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function lockChants(mchId=''){
    return (dispatch)=>{
        api({
            method:'/merchants/lock',
            mode:'jsonp',
            args:{
                mchId:mchId
            },
            callback:(rsp)=>{
                successToast('操作成功')
            },
            errCallback:(msg)=>{
                errorToast('操作失败')
            }
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
