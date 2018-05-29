/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";

import {api,ajax} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  登录判段
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
                console.log("rsp")
                console.log(rsp)
                let now = new Date();
                localStorage.setItem("loginTime",now);
                localStorage.setItem("appId",username);
                localStorage.setItem("userType",rsp.data.roles[0].roleName);
                localStorage.setItem("userInfo",JSON.stringify(rsp.data.userDetail));
                localStorage.setItem("History",JSON.stringify(["首页"]));
                window.userNick = username;
                /*ajax({
                    method:'/users/view',
                    mode:'json',
                    args:{
                        url:"/"+username,
                    },
                    callback:(e)=>{*/
                        /*console.log(e)
                        localStorage.setItem("userInfo",JSON.stringify(e));*/
                        if(rsp.data.firstLogin == false || rsp.data.firstLogin == "false"){//用户非第一次登录
                            callback("success");
                        }else{
                            callback("firstLogin");
                        }

                        dispatch({
                            type:INITGUNSDATA,
                            userType:rsp.data.roles[0].roleName,
                        });
                   /* },
                    errCallback:(msg)=>{
                        // console.log(msg)
                    }
                });*/
                
                
            },
            errCallback:(msg)=>{
                // console.log(msg)
                callback("fail")
                
            }
        });
      
    }
}


