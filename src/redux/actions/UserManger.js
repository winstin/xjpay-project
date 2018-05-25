/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";
export const CHOOSEDATA = "CHOOSEDATA";
export const GETDATA = "GETDATA";

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
export function getInitData(pageno = 1,beginTime='',endTime='',name=''){
    return (dispatch)=>{
        api({
            method:'/users/page',
            mode:'jsonp',
            args:{
                deptid: 0,
                name: name,
                beginTime: beginTime,
                endTime: endTime,
                pageIndex:pageno,
                pageSize:20
            },
            callback:(rsp)=>{
                if(rsp.records == ""){
                    return;
                }
                dispatch({
                    type:INITGUNSDATA,
                    dataSource: rsp.records,
                    total:rsp.total
                });
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
      
    }
}


export function freezeData(userId){
    return (dispatch)=>{
        api({
            method:'/users/freeze',
            mode:'jsonp',
            args:{
                userId:userId
            },
            callback:(rsp)=>{
                console.log(rsp);
                successToast('操作成功！');
            },
            errCallback:(msg)=>{
                console.log(msg);
                errorToast('操作失败！');
            }
        });
      
    }
}


export function unfreezeData(userId){
    return (dispatch)=>{
        api({
            method:'/users/unfreeze',
            mode:'jsonp',
            args:{
                userId:userId
            },
            callback:(rsp)=>{
                console.log(rsp);
                successToast('操作成功！');
            },
            errCallback:(msg)=>{
                console.log(msg)
                errorToast('操作失败！');
            }
        });
      
    }
}

export function resetData(userId){
    return (dispatch)=>{
        api({
            method:'/users/reset',
            mode:'jsonp',
            args:{
                userId:userId
            },
            callback:(rsp)=>{
                // console.log(rsp);
                successToast('操作成功！');
            },
            errCallback:(msg)=>{
                // console.log(msg)
                errorToast('操作失败！');
            }
        });
      
    }
}

export function addData(newData){

    return (dispatch)=>{
        api({
            method:'/users/add',
            mode:'jsonp',
            args:newData,
            callback:(rsp)=>{
                successToast('操作成功！');
            },
            errCallback:(msg)=>{
                errorToast('操作失败！');
            }
        });
      
    }
}


export function removeData(userId){
    return (dispatch)=>{
        api({
            method:'/users/delete',
            mode:'jsonp',
            args:{userId:userId},
            callback:(rsp)=>{
                successToast('操作成功！');
            },
            errCallback:(msg)=>{
                errorToast('操作失败！');
            }
        });
      
    }
}

export function setRoleId(userId,roleIds){
    return (dispatch)=>{
        api({
            method:'/users/setRole',
            mode:'jsonp',
            args:{
                userId:userId,
                roleIds:roleIds
            },
            callback:(rsp)=>{
                successToast('操作成功！');
            },
            errCallback:(msg)=>{
                errorToast('操作失败！');
            }
        });
      
    }
}



export function updateData(newData,oldData){
    // id: 290
    // account: 555
    // sex: 1
    // email: 786407628@qq.com
    // name: 555
    // birthday: 2018-05-09
    // deptid: 27
    // phone: 18796258655
    let birthday = "";
    if(newData.birthday!=undefined){
        birthday = newData.birthday.split(' ')[0];
    }else{
        if(oldData.birthday!=undefined){
            birthday = oldData.birthday.split(' ')[0];
        }
    }
    return (dispatch)=>{
        api({
            method:'/users/edit',
            mode:'jsonp',
            args:{
                id: newData.id == undefined ? oldData.id : newData.id,
                account: newData.account == undefined ? oldData.account : newData.account,
                sex: newData.sex == undefined ? oldData.sex : newData.sex,
                email: newData.email == undefined ? oldData.email : newData.email,
                name: newData.name == undefined ? oldData.name : newData.name,
                birthday: birthday,
                deptid: newData.deptid == undefined ? oldData.deptid : newData.deptid,
                phone: newData.phone == undefined ? oldData.phone : newData.phone
            },
            callback:(rsp)=>{
                console.log(rsp);
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
