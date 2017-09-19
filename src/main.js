// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'

import router from './router/index'
import store from './store/index'
import App from './App'

require('es6-promise').polyfill()

import objectAssign from 'object-assign'

const vuxLocales = require('json-loader!yaml-loader!../src/locales/all.yml')
const componentsLocales = require('json-loader!yaml-loader!../src/locales/components.yml')

const finalLocales = {
    'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
    'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
    Vue.i18n.add(i, finalLocales[i])
}
Vue.i18n.set('zh-CN')

// plugins
import { BusPlugin, DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)

// test
if (process.env.platform === 'app') {
    Vue.use(AppPlugin, store)
}

const wx = Vue.wechat
const http = Vue.http

if (process.env.NODE_ENV === 'production') {
    wx.ready(() => {
        console.log('wechat ready')
        wx.onMenuShareAppMessage({
            title: 'VUX', // 分享标题
            desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
            link: 'https://vux.li?x-page=wechat_share_message',
            imgUrl: 'https://static.vux.li/logo_520.png'
        })

        wx.onMenuShareTimeline({
            title: 'VUX', // 分享标题
            desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
            link: 'https://vux.li?x-page=wechat_share_timeline',
            imgUrl: 'https://static.vux.li/logo_520.png'
        })
    })

    const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage'])
    const url = document.location.href
    http.post('https://vux.li/jssdk?url=' + encodeURIComponent(url.split('#')[0]) + '&jsApiList=' + permissions).then(res => {
        wx.config(res.data.data)
    })
}

const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
    Vue.i18n.set('zh-CN')
} else {
    Vue.i18n.set('en')
}

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')