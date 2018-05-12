/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";
export const CHOOSEDATA = "CHOOSEDATA";

import {api,isEmpty,successToast,errorToast,getNowFormatDate,NetWorkPOST} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取商户管理数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getInitData(pageno = 1,merchantName='',mchId='',startDate=getNowFormatDate(),endDate=getNowFormatDate(),isloading=true){
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
            isloading:isloading,
            callback:(rsp)=>{
                if(rsp.data.data == ""){
                    dispatch({
                        type:INITGUNSDATA,
                        dataSource: [],
                        total:0
                    });
                }else{
                    dispatch({
                        type:INITGUNSDATA,
                        dataSource: rsp.data.data,
                        total:rsp.data.total
                    });
                }
                
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
      
    }
}

/**
 * @Author   Winstin
 * @DateTime 2018-05-12
 * @param    string
 * @license  清空数据
 * @version  [version]
 * @return   {[type]}   [description]
 */
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
 * @license  修改数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function changeInfo(data){
    return (dispatch)=>{
        console.log(data)
        NetWorkPOST({
            method:'/merchants/updateBase/'+data.mchId,
            mode:'json',
            args:{
                cardNumber:data.cardNumber,
                d0fee:data.d0fee,
                fee0:data.fee0,
            },
            dataType:'json',
            callback:(rsp)=>{
                successToast('修改成功！')
            },
            errCallback:(msg)=>{
                errorToast('修改失败！')
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
