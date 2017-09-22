import Vue from 'vue'
import qs from 'qs'
import { querystring } from 'vux'

const userid = querystring.parse()['userid']

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        Vue.http.post(url, qs.stringify({...params, userid }))
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