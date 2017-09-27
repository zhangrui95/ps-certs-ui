import Vue from 'vue'
import qs from 'qs'
import { querystring } from 'vux'

// post快捷方式
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, qs.stringify({...params, ...querystring.parse() }))
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.status)
        }
      }).catch(err => reject(err));
  })
}

const startProxyTime = {};

// 延迟执行函数
export function lazyRateProxy(func, time, key) {
  var akey = key == null || key == '' ? 'defaultProxyKey' : key;
  startProxyTime[akey] = new Date().getTime();
  setTimeout(function() {
    var currTime = new Date().getTime();
    if (currTime - startProxyTime[akey] >= time) {
      startProxyTime[akey] = null;
      func();
    }
  }, time);
}