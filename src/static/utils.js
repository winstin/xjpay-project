import fetchJsonp from 'fetch-jsonp';
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
          document.getElementById('container').appendChild(div);
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
  api: function({method,args='',mode='jsonp',callback,errCallback = undefined,isloading = true}){
      var self = this;
    if (mode == 'jsonp') {
      args = this.buildStr(args);
      if(args!=''){
          args = '?'+args;
      }
      fetchJsonp('https://web.xjpay.cc' + method + args, {
      // fetchJsonp(host + method + args, {
        jsonpCallback: 'callback'
      })
      .then((response) => response.json())//返回数据类型json
      .then((responseText) => {
        if(responseText == 'fail'){
          //遇见错误时弹框提示   by Mothpro
          //session获取失败登录失效
        }else{
            try {
                callback(responseText);
            } catch (e) {
                // console.error("后台php调用失败"+method,e);
            }
        }
      })
      .catch((error) => {
          if (isloading) {
          } else {
            // statement
          }

          //错误处理，待补充
          // console.log(error);
          if (errCallback) {
            errCallback(error);
          } else {

          }
      });
    } else {
        var formData = new FormData();
        formData = this.buildArgs(formData,args);
        fetch(`${'https://web.xjpay.cc'}${method}`, {
        // fetch(`${host}${method}`, {
            method : 'POST',
            mode : 'cors',
            credentials: 'include',//携带cookies
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },     
            body : formData,
        }).then((res)=>res.json()).then(function(responseText){

            if(responseText == 'fail'){
                //遇见错误时弹框提示   by Mothpro
                //session获取失败登录失效
            }else{
                callback(responseText);
            }
        }, function(error){
            if (isloading) {
            } else {
              // statement
            }
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
  ajax: function({method,args={},mode='jsonp',type="POST",callback,errCallback}){
     
      const uri = "https://web.xjpay.cc"+method;
      let data = {};
      data.url = uri;

      data.data = args;
      data.dataType = mode;
      data.type = type;
      // data.credentials='include';

      data.xhrFields = {
          withCredentials: true
      },
      data.crossDomain = true,
      
      // data.contentType = "jsonp";
      // data.jsonp  = 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
      // data.callback = '', //设置回调函数名
      $.ajax(data).done(function(rsp) {
          callback(rsp);
      }).fail(function(data,status,xhr) {
          console.error(data);
          // document.getElementById('app').innerHTML = data.responseText;
          console.error(status);
          console.error(xhr);
      });

     
  }


};

export const api = Tools.api.bind(Tools);
export const ajax = Tools.ajax.bind(Tools);
export const isEmpty = Tools.isEmpty.bind(Tools);
export const hideLoading = Tools.hideLoading.bind(Tools);
export const showLoading = Tools.showLoading.bind(Tools);


export default Tools;