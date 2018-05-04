export const GET_LIST = "GET_LIST"
export const GET_ARGS = "GET_ARGS"

/**
 * uri => 后端地址
 * url => 控制器地址
 * args => 传入参数
 * type => POST|GET
 * callback => 回调方法
*/
export function ajax(url,args={},type="POST",callback){
    // /ajax
    // ajax("itemdb2/getkfnick",{},"",function(e){}); 调用示例
    const uri = "https://web.xjpay.cc"+url;

    let data = {};
    data.type = type;
    data.url = uri;
    // data.headers = {
    //     "Content-Type": "application/json;charset=utf-8"
    // };
    data.data = args;
    data.dataType = "json";
    
    data.credentials='include';

    data.xhrFields = {
        withCredentials: true
    },
    data.crossDomain = true,



    // data.contentType = "application/json; charset=utf-8";


    // console.log(data)
    // data.jsonp  = 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    // data.callback = '', //设置回调函数名
    $.ajax(data).done(function(rsp) {
        callback(rsp);
    }).fail(function(data,status,xhr) {
        // console.error(data);
        // // document.getElementById('app').innerHTML = data.responseText;
        // console.error(status);
        // console.error(xhr);
    });


    // console.log(args);
    // console.log(uri);


    // $.ajax({
    //     url:uri,
    //     type:'post',
    //     dataType:'json',
    //     // headers: {
    //     //     "Content-Type": "application/json;charset=utf-8"
    //     // },
    //     // contentType:'application/json; charset=utf-8',
    //     credientials:false, 
    //     data:args,
    //     emulateJSON: true,
    //     success:function(){},
    //     error:function (res) {
    //         console.log(res)
    //         // alert("网络出错！")
    //     }
    // })
    // $.ajax({
    //     type:"POST",
    //     data:args,//{"userName": "admin","password": "1111111"}
    //     url:uri,//"https://web.xjpay.cc"+url
    //     dataType:'json',
    //     "contentType":"application/json",
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     success:function (res) {
    //         console.log(res)
    //         alert("发送成功！")
    //     },
    //     error:function (res) {
    //         console.log(res)
    //         alert("网络出错！")
    //     }
    // })


    // $.ajax({
    //     url: 'http://query.yahooapis.com/v1/public/yql',
    //     dataType: 'jsonp',
    //     data: {
    //         q: "select * from json where url=\"http://www.w3dev.cn/json.asp\"",
    //         format: "json"
    //     },
    //     success: function (d) {
    //        alert(JSON.stringify(d))//远程json数据放在query.results下
    //     }
    // });
}

/**
 * uri => 后端地址
 * args => 传入参数
*/
export function api(method,args="",callback){
    // /api
    // method=aiyong.foreigntrade.ft.getinformation&version=xxxx&category_id=abc
    // api("ebs.orders.list",1,args,demo()) 调用示例
    // const uri = "http://ebs.aiyongbao.com/api";
    // const version = 1;
    // args = toQueryString(args);
    // if(args!=""){
    //     args = "&"+args;
    // }
    // fetch(uri,{
    //         method: "POST",
    //         mode: "cros",
    //         credentials: 'include',
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //         },
    //         body: "method="+method+"&version="+version+args
    //     })
    // .then((response) => response.json())//返回数据类型json
    // .then((responseText) => {
    //     callback(responseText);
    // })
    // .catch((error) => {
    //     console.warn(error);//错误处理，待补充
    // });
}

/**
 * 组件参数传递
*/
export function getargs(args){
    return {
        type:GET_ARGS,
        data:args
    }
}

/*
把json格式解析为参数参数字符串
*/
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
