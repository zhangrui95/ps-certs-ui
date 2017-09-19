// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

require('es6-promise').polyfill()

Vue.use(VueRouter)
Vue.use(Vuex)

/**
 * you can add your module here
 */
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

Vue.use(vuexI18n.plugin, store)

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

import App from './App'
import Home from './components/HelloFromVux'
import LeaderGrid from './pages/LeaderGrid'
import PoliceGrid from './police/PoliceGrid'
import List from './pages/List'
import ListCeil from './pages/ListCeil'
import ComDetail from './pages/ComDetail'
import SetUp from './pages/SetUp'
import AddCompany from './pages/AddCompany'
import NoCard from './pages/NoCard'
import Detail from './pages/Detail'
import EmployeeList from './pages/EmployeeList'
import EmployeeChoice from './pages/EmployeeChoice'
import CompanyList from './pages/CompanyList'
import ComEmployeeList from './pages/ComEmployeeList'
import EmployeeDetail from './pages/EmployeeDetail'
import PoliceComList from './police/PoliceComList'
import Fire from './police/Fire'
import Hotel from './company/Hotel'
import Company from './company/Company'
import Station from './company/Station'
import NoIdCard from './company/NoIdCard'
import EmployeeUp from './company/EmployeeUp'
import PoliceComDetail from './police/PoliceComDetail.vue'
import ProveApply from './visitors/ProveApply'
import Visitors from './visitors/Visitors'
import ApplyNews from './visitors/ApplyNews'
import Approve from './approve/Approve'
import Undone from './approve/Undone'
import Back from './approve/Back'
import NoInform from './approve/NoInform'
import Done from './approve/Done'
import DoneDetail from './approve/Detail'

// The following line will be replaced with by vux-loader with routes in ./demo_list.json
// const routes = []
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/LeaderGrid',
    component: LeaderGrid
  },
  {
    path: '/List',
    component: List
  },
  {
    path: '/PoliceGrid',
    component: PoliceGrid
  },
  {
    path: '/ListCeil',
    component: ListCeil
  },
  {
    path: '/ComDetail/:id',
    component: ComDetail
  },
  {
    path: '/SetUp',
    component: SetUp
  },
  {
    path: '/AddCompany',
    component: AddCompany
  },
  {
    path: '/NoCard',
    component: NoCard
  },
  {
    path: '/Detail/:id',
    component: Detail
  },
  {
    path: '/EmployeeList/:cid',
    component: EmployeeList
  },
  {
    path: '/EmployeeChoice',
    component: EmployeeChoice
  },
  {
    path: '/CompanyList',
    component: CompanyList
  },
  {
    path: '/ComEmployeeList/:cid',
    component: ComEmployeeList
  },
  {
    path: '/EmployeeDetail/:id',
    component: EmployeeDetail
  },
  {
    path: '/Hotel',
    component: Hotel
  },
  {
    path: '/Company',
    component: Company
  },
  {
    path: '/Station',
    component: Station
  },
  {
    path: '/PoliceComList',
    component: PoliceComList
  },
  {
    path: '/NoIdCard',
    component: NoIdCard
  },
  {
    path: '/EmployeeUp',
    component: EmployeeUp
  },
  {
    path: '/PoliceComDetail/:id',
    component: PoliceComDetail
  },
  {
    path: '/ProveApply',
    component: ProveApply
  },
  {
    path: '/Visitors',
    component: Visitors
  },
  {
    path: '/ApplyNews',
    component: ApplyNews
  },
  {
    path: '/Approve',
    component: Approve
  },
  {
    path: '/Undone/:id',
    component: Undone
  },
  {
    path: '/Back',
    component: Back
  },
  {
    path: '/NoInform',
    component: NoInform
  },
  {
    path: '/Done',
    component: Done
  },
  {
    path: '/DoneDetail',
    component: DoneDetail
  },
  {
    path: '/Fire',
    component: Fire
  }
]

const router = new VueRouter({
  routes
})

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  // if (process.env.NODE_ENV === 'production') {
  //   ga && ga('set', 'page', to.fullPath)
  //   ga && ga('send', 'pageview')
  // }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
