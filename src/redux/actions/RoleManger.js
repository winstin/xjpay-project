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
export function getInitData(pageno = 1,name=''){
    return (dispatch)=>{
        api({
            method:'/roles/page',
            mode:'jsonp',
            args:{
                roleName: name,
                pageIndex: pageno,
                pageSize: 20
            },
            callback:(rsp)=>{
               
                dispatch({
                    type:INITGUNSDATA,
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

export function removeData(id){
    return (dispatch)=>{
        api({
            method:'/role/remove',
            mode:'jsonp',
            args:{
                roleId: id,
            },
            callback:(rsp)=>{
                successToast('删除成功');
            },
            errCallback:(msg)=>{
                errorToast('删除失败');
            }
        });
      
    }
}


export function addData(name,pName,deptid,num,tips,pid = ''){

    let dept = "";
    switch(deptid){
        case "总公司":
            dept = 24;
            break;
        case "开发部":
            dept = 25;
            break;
        case "运营部":
            dept = 26;
            break;
        case "战略部":
            dept = 27;
            break;
        case "服务商":
            dept = 27

    }

    return (dispatch)=>{
        api({
            method:'/roles/add',
            mode:'jsonp',
            args:{
                name:name,
                pName:pName,
                num:num,
                tips:tips,
                deptid:dept,
                pid:pName
            },
            callback:(rsp)=>{
                successToast('删除成功');
            },
            errCallback:(msg)=>{
                errorToast('删除失败');
            }
        });
      
    }
}


export function changeData(oldData,newData){

    console.log(oldData);
    console.log(newData)

    return (dispatch)=>{
        api({
            method:'/roles/edit',
            mode:'jsonp',
            args:{
                name:newData.name == undefined ? oldData.name:newData.name,
                pid:newData.pid == undefined ? oldData.pid:newData.pid,
                num:newData.num == undefined ? oldData.num:newData.num,
                tips:newData.tips == undefined ? oldData.tips:newData.tips,
                deptid:newData.deptid == undefined ? oldData.deptid:newData.deptid
            },
            callback:(rsp)=>{
                successToast('修改成功');
            },
            errCallback:(msg)=>{
                errorToast('修改失败');
            }
        });
      
    }
}


