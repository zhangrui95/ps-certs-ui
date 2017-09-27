import Vue from 'vue'
import { dateFormat, BusPlugin, DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import MockWechatPlugin from '../mock/wx-mock'
import FastClick from 'fastclick'

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)
Vue.filter('dateFormat', dateFormat)

if (process.env.NODE_ENV === 'development') {
  Vue.use(MockWechatPlugin)
} else {
  Vue.use(WechatPlugin)
}

Vue.use(Vuex)
Vue.use(VueRouter)

const init = store => {
  if (process.env.platform === 'app') {
    Vue.use(AppPlugin, store)
  }
  FastClick.attach(document.body)
}

export default init