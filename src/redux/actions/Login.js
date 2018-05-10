/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";

import {api} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function Login(username="",password="",callback){
    return (dispatch)=>{
        api({
            method:'/rest/login',
            mode:'json',
            args:{username:username,password:password},
            callback:(rsp)=>{
                let now = new Date();
                localStorage.setItem("loginTime",now);
                localStorage.setItem("appId",username);
                callback("success");
                localStorage.setItem("userType",rsp.data[0].roleName);
                dispatch({
                    type:INITGUNSDATA,
                    userType: rsp.data[0].roleName,
                });
                
            },
            errCallback:(msg)=>{
                callback("fail")
                
            }
        });
      
    }
}


