/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const GETDATA = "GETDATA";
export const SERVICEDATA = "SERVICEDATA";



import {api,ajax,NetWorkPOST,compareTime,isEmpty,successToast,errorToast} from "static/utils.js"

export function getInitData(pageno=1,appId='',appName='',isloading=true){
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
            isloading:isloading,
            callback:(rsp)=>{
             
                dispatch({
                    type:INITDATA,
                    dataSource: rsp.data.data,
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

export function emptyData(){
    return (dispatch)=>{
        dispatch({
            type:INITDATA,
            dataSource: [],
            total:0
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
        NetWorkPOST({
            method:'/rates/add/'+data.appid,
            mode:'json',
            dataType:'json',
            args:{
                id:'',
                code:data.code,
                mode:data.mode,
                appid:data.appid,
                pointsType:data.pointType,
                type:data.type,
                fee0:data.fee0,
                d0fee:data.d0fee,
                upstream:data.upstream,
                defaultNewNoCardProfit:data.defaultNewNoCardProfit || ""
            },
            callback:(rsp)=>{
                successToast('添加成功！')
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message)
                }else{
                    errorToast('添加失败！')
                }
                
            }
        });
       
    }
}


export function updateData(oldData){
    oldData.pointsType = oldData.points_type;
    
    return (dispatch)=>{
        NetWorkPOST({
            method:'/rates/update',
            mode:'json',
            args:oldData,
            callback:(rsp)=>{
                successToast('修改成功！')
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message);
                }else{
                    errorToast('添加失败！');
                }
            }
        });
       
    }
}


/**
 * @Author   Winstin
 * @DateTime 2018-05-25
 * @param    string
 * @license  获取特殊银行费率
 * @version  [version]
 * @param    {[type]}   appId  [description]
 * @param    {[type]}   rateId [description]
 * @return   {[type]}          [description]
 */
export function getBankData(appId,rateId){
    return (dispatch)=>{
        NetWorkPOST({
            method:'/rates/agent/'+appId+'/rate/'+rateId+'/specialBankRate',
            mode:'json',
            args:{
               
            },
            callback:(rsp)=>{
                console.log(rsp)
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message)
                }else{
                    errorToast('添加失败！')
                }
                
            }
        });
       
    }
}

/**
 * @Author   Winstin
 * @DateTime 2018-05-25
 * @param    string
 * @license  添加特殊银行费率
 * @version  [version]
 * @param    {[type]}   appId  [description]
 * @param    {[type]}   rateId [description]
 */
export function addBankData(appId,rateId,bankName='',bankCardType='',newNoCardProfit=''){
    return (dispatch)=>{
        NetWorkPOST({
            method:'/rates/agent/'+appId+'/rate/'+rateId+'/specialBankRate',
            mode:'json',
            args:{
                "bankCardType": bankCardType,
                "bankName": bankName,
                "id": '',
                "newNoCardProfit": newNoCardProfit
            },
            callback:(rsp)=>{
                console.log(rsp)
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message)
                }else{
                    errorToast('添加失败！')
                }
                
            }
        });
       
    }
}

/**
 * @Author   Winstin
 * @DateTime 2018-05-25
 * @param    string
 * @license  删除特殊银行费率
 * @version  [version]
 * @param    {[type]}   appId  [description]
 * @param    {[type]}   rateId [description]
 * @return   {[type]}          [description]
 */
export function delBankData(rateId){
    return (dispatch)=>{
        NetWorkPOST({
            method:'/rates/delete/'+rateId,
            mode:'json',
            args:{},
            callback:(rsp)=>{
                console.log(rsp)
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message)
                }else{
                    errorToast('添加失败！')
                }
                
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



export function autoSearch(appId='',callback){
    return (dispatch)=>{
        api({
            method:'/agents/page',
            mode:'jsonp',
            args:{
                appId:appId.trim(),
            },
            callback:(e)=>{
                if(e.data){
                    callback(e.data.data)
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
 * @DateTime 2018-05-11
 * @param    string
 * @license  删除费率
 * @version  [version]
 * @param    {[type]}   rateId [description]
 * @return   {[type]}          [description]
 */
export function deleteData(rateId){
    return (dispatch)=>{
        ajax({
            method:'/rates/delete/',
            mode:'json',
            type:"POST",
            args:{
                url:rateId,
            },
            callback:(e)=>{
                successToast('删除成功！')
            },
            errCallback:(msg)=>{
                errorToast('删除失败！')
            }
        });
       
    }
}

