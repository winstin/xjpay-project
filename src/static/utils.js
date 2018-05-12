import fetchJsonp from 'fetch-jsonp';

// import fetch from 'whatwg-fetch';


import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;

const webUrl = "http://localhost:3000";

var Tools = {
  /**
   * 判断一个值是否为空
   * author: cbl
   * @param  {[type]}  key [description]
   * @return {Boolean}     [description]
   */
  isEmpty: function(key){
      if (typeof(key) === 'string') {
          key = key.replace(/(^\s*)|(\s*$)/g, '');
          if (key == '' || key == null || key == 'null' || key == undefined || key == 'undefined') {
              return true
          } else {
              return false
          }
      } else if (typeof(key) === 'undefined') {
          return true;
      } else if (typeof(key) == 'object') {
          for(let i in key){
              return false;
          }
          return true;
      }else if (typeof(key) == 'boolean'){
          return false;
      }
  },
  /**
   * json转换字符串并进行uri编码
   * author: cbl
   * @param  {[type]} obj [json]
   * @return {[type]}     [uri]
   */
  toQueryString: function(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  },

   /**
   * 把json解析成字符串
   * author 张文
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  childStr: function (data) {
    let childArr = [];
    if(typeof(data) == 'object'){
      for (let key in data) {
        for (let i in this.childStr(data[key])) {
          childArr.push('[' + key + ']' + this.childStr(data[key])[i]);
        }
      }
    } else {
      childArr.push(('=' + encodeURIComponent(data)));
    }
    return childArr;
  },
  /**
   * 把json解析成字符串
   * author 张文
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  buildStr: function (data){
    let str = '';
    for (let key in data) {
      for (let i in this.childStr(data[key])) {
        str += (key + this.childStr(data[key])[i] + '&');
      }
    }
    return str.substr(0, str.length-1);
  },
  showLoading:function(text = "加载中，请稍后"){
      let element = document.getElementById("c-loading-trade");
      if(this.isEmpty(element)){
          let html =`<div id="c-loading-trade" >
              <div style="background: #000;position: fixed;width: 100%;height: 100%;top: 0;left: 0;z-index: 1001;transition: opacity .3s;opacity: 0.05;"></div>
              <div  style="position: fixed;right: 40%;bottom: 45%;z-index:999999;margin-right:10px;padding: 20px;background-color: white;">
                  <div>
                  <img src = "//q.aiyongbao.com/trade/img/loading.gif" style="margin-right:10px;vertical-align: middle;"/>
                  <font style="vertical-align: middle;color:#999">${text}</font>
                  </div>
              </div>
          </div>`;
          let div = document.createElement('div');
          div.innerHTML = html;
          document.getElementById('app').appendChild(div);
      }
  },
  hideLoading:function(){
      let elements = document.getElementById("c-loading-trade");
      if(elements) elements.parentNode.removeChild(elements);
  },

  buildArgs:function(formData,args,keys = []){
    for(let i in args){
        if(typeof(args[i]) == 'object'){
            let newkeys = [...keys];
            if(newkeys.length > 0){
                newkeys[0] = newkeys[0] + `[${i}]`;
            }else{
                newkeys.push(i);
            }
            this.buildArgs(formData,args[i],newkeys);
        }else{
            let key = '';
            keys.map( c => {
                this.isEmpty(key) ? key = c : key += `[${c}]`;
            })
            this.isEmpty(key) ? formData.append(i,args[i]) : formData.append(key+`[${i}]`,args[i]);
        }
    }
    return formData;
  },

    /**
   * 调用接口方法 fecth
   * author: wp
   * @param  {[type]}   method   [接口名称]
   * @param  {String}   args     [参数 默认为空]
   * @param  {String}   mode     [默认jsonp 否则为json]
   * @param  {Function} callback [成功回调]
   * @return {[type]}            [description]
   */
  apis: function({method,args='',mode='jsonp',callback,errCallback = undefined,isloading = true}){
    var self = this;
    
    
    if (mode == 'jsonp') {
      // args = this.buildStr(args);
      // if(args!=''){
      //     args = '?'+args;
      // }
      // fetchJsonp('https://web.xjpay.cc' + method + args, {
      // // fetchJsonp(host + method + args, {
      //   jsonpCallback: 'callback'
      // })
      // .then((response) => console.log(response))//返回数据类型json
      // .then((responseText) => {
      //   if(responseText == 'fail'){
      //     //遇见错误时弹框提示   by Mothpro
      //     //session获取失败登录失效
      //   }else{
      //       try {
      //           callback(responseText);
      //       } catch (e) {
      //           // console.error("后台php调用失败"+method,e);
      //       }
      //   }
      // })
      // .catch((error) => {
         

      //     //错误处理，待补充
      //     // console.log(error);
      //     if (errCallback) {
      //       errCallback(error);
      //     } else {

      //     }
      // });
      // 
      if(isloading){
         showLoading('加载数据中...');
      }
      // var formData = new FormData();
      //   formData = this.buildArgs(formData,args);
        args = this.buildStr(args);
        if(args!=''){
            args = '?'+args;
        }
        fetch(`${webUrl+method+args}`, {
        // fetch(`${host}${method}`, {
            method : 'GET',
            mode : 'json',
            credentials: 'include',//携带cookies
               
            // body : formData,
        }).then((res)=>res.json()).then(function(responseText){
            if(isloading){
                hideLoading();
            }

            if(responseText == 'fail'){
                //遇见错误时弹框提示   by Mothpro
                //session获取失败登录失效
            }else{
                callback(responseText);
            }
        }, function(error){
            if(isloading){
                hideLoading();
            }
            //错误处理，待补充
            // console.log(error);
            promptToast('登录超时，请退出重新登录！',2000)
            
            if (errCallback) {
                errCallback(error);
            } else {

            }
        });
    } else {
        var formData = new FormData();
        formData = this.buildArgs(formData,args);
        args = this.buildStr(args);
        if(args!=''){
            args = '?'+args;
        }
        fetch(`${webUrl+method+args}`, {
        // fetch(`${host}${method}`, {
            method : 'GET',
            mode : 'json',
            credentials: 'include',//携带cookies
            // body : formData,
        }).then((res)=>res.json()).then(function(responseText){
            if(responseText == 'fail'){
                //遇见错误时弹框提示   by Mothpro
                //session获取失败登录失效
            }else{
                callback(responseText);
            }
        }, function(error){
            //错误处理，待补充
            // console.log(error);
            if (errCallback) {
                errCallback(error);
            } else {

            }
        });
    }
  },



   /**
   * 调用接口方法 ajax
   * author: wp
   * @param  {[type]}   method   [接口名称]
   * @param  {String}   args     [参数 默认为空]
   * @param  {String}   mode     [默认jsonp 否则为json]
   * @param  {Function} callback [成功回调]
   * @return {[type]}            [description]
   */
  api: function({method,args='',mode='jsonp',callback,errCallback = undefined,isloading = true}){
    var self = this;
    
    
    if(isloading){
       showLoading('加载数据中...');
    }
    args = this.buildStr(args);
    if(args!=''){
        args = '?'+args;
    }

    const uri = webUrl+method+args;
    let data = {};
    data.url = uri;

    data.dataType = 'json';
    data.type = 'GET';
    data.credentials='include';

    data.xhrFields = {
        withCredentials: true
    },
    data.crossDomain = true,
    

    $.ajax(data).done(function(e) {
        if(isloading){
            hideLoading();
        }
        callback(e);
    }).fail(function(data,status,xhr) {
        if(isloading){
            hideLoading();
        }
        if(data.responseText){
            if(data.responseText.indexOf('登录超时')>-1){
              promptToast("登录超时，请退出重新登录!",2000)
            }

            if(data.responseText.indexOf('502 Bad Gateway')>-1){
              promptToast("服务器异常请稍后登录!",2000)
            }
        }else{
            errCallback(data.responseJSON)
        }
       
        // promptToast('登录超时，请退出重新登录！',2000)
    });
    
  },
  /**
   * @Author   Winstin
   * @DateTime 2018-04-28
   * @param    string
   * @license  调用后端接口方法 ajax
   * @version  [version]
   * @param    {[type]}   options.url   [description]
   * @param    {Object}   options.args  [description]
   * @param    {String}   type          [description]
   * @param    {Function} callback      [description]
   * @param    {[type]}   errCallback} [description]
   * @return   {[type]}                 [description]
   */
  ajax: function({method,args={},mode='jsonp',type="GET",callback,errCallback}){
      
      const uri = webUrl+method+args.url;
      let data = {};
      data.url = uri;

      data.dataType = mode;
      data.type = type;
      data.credentials='include';

      data.xhrFields = {
          withCredentials: true
      },
      data.crossDomain = true,
      

      $.ajax(data).done(function(e) {
          callback(e);
      }).fail(function(data,status,xhr) {
        if(data.responseText){
            if(data.responseText.indexOf('登录超时')>-1){
              promptToast("登录超时，请退出重新登录!",2000)
            }
        }
        console.error(data);
        // console.error(status);
        // console.error(xhr);
      });

     
  },

  NetWorkPOST: function({method,args={},mode='jsonp',type="POST",dataType="",callback,errCallback}){
      
      const uri = webUrl+method;
      let data = {};
      data.url = uri;
      if(dataType == "json"){
          data.contentType = "application/json;charset=UTF-8"
          data.header = {
            "Content-Type":"application/json;charset=UTF-8"
          }
          data.data = JSON.stringify(args);
      }else{
          data.data = args;
      }
      
      data.dataType = mode;
      data.type = type;
      data.credentials='include';

      data.xhrFields = {
          withCredentials: true
      };
      data.crossDomain = true;


      

      $.ajax(data).done(function(e) {
          callback(e);
      }).fail(function(data,status,xhr) {
          console.error(data);
          console.error(status);
          console.error(xhr);
      });

     
  },

  /**
   * @Author   Winstin
   * @DateTime 2018-05-03
   * @param    string
   * @license  时间差
   * @version  [version]
   * @param    {[type]}   date1 开始时间
   * @param    {[type]}   date2 结束时间
   * @return   {[type]}         [description]
   */
  compareTime:function(date1,date2){

    date1 = new Date(date1);
    var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数


    //计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))
     
    //计算出小时数

    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))
    //计算相差秒数
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000)
    // alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");

    let result = {
      days:days,
      hours:hours,
      minutes:minutes,
      seconds:seconds
    }
    return result;
  },

  errorToast: function(text,time=1000){
      Toast.error({content: text,hasMask:true,duration: time});
  },

  successToast: function(text,time=1000){
      Toast.success({content: text,hasMask:true,duration: time});
  },

  promptToast:function(text,time=1000){
      Toast.prompt({content: text,hasMask:true,duration: time});
  },
  /**
 * @Author   Winstin
 * @DateTime 2018-05-05
 * @param    string
 * @license  时间转换
 * @version  [version]
 * @param    {[type]}   UnixTime [description]
 */
  FormatDateTime: function (UnixTime) {  
      if(UnixTime== undefined){
          return;
      }
      var a = UnixTime.replace("/Date(", "").replace(")/", "");  
      var date = new Date(parseInt(a));  
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? ('0' + m) : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = date.getHours();  
      h = h < 10 ? ('0' + h) : h;  
      var minute = date.getMinutes();  
      var second = date.getSeconds();  
      minute = minute < 10 ? ('0' + minute) : minute;  
      second = second < 10 ? ('0' + second) : second;  
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;  
  },

  getNowFormatDate:function() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
  }

};

export const api = Tools.api.bind(Tools);
export const ajax = Tools.ajax.bind(Tools);
export const NetWorkPOST = Tools.NetWorkPOST.bind(Tools);

export const isEmpty = Tools.isEmpty.bind(Tools);
export const hideLoading = Tools.hideLoading.bind(Tools);
export const showLoading = Tools.showLoading.bind(Tools);
export const compareTime = Tools.compareTime.bind(Tools);
export const errorToast = Tools.errorToast.bind(Tools);
export const successToast = Tools.successToast.bind(Tools);
export const FormatDateTime = Tools.FormatDateTime.bind(Tools);
export const promptToast = Tools.promptToast.bind(Tools);
export const getNowFormatDate = Tools.getNowFormatDate.bind(Tools);



export default Tools;