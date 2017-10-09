// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import pluginsInit from './plugins'
import routerInit from './router'
import store from './store'
import App from './App'

// require('es6-promise').polyfill()

pluginsInit(store)
const router = routerInit(store)

const wx = Vue.wechat
const http = Vue.http

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
  iosPreviewFix()
})

if (process.env.NODE_ENV === 'production') {
  const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage'])
  const url = document.location.href
  http.post('https://vux.li/jssdk?url=' + encodeURIComponent(url.split('#')[0]) + '&jsApiList=' + permissions).then(res => {
    wx.config(res.data.data)
  })
}
function iosPreviewFix () {
  if (/iPhone/gi.test(navigator.userAgent)) {
    let oldChooseImage = wx.chooseImage
    let getImgData = function (localId, dataCb) {
      wx.getLocalImgData({
        localId: localId,
        success: dataCb
      })
    }
    let checkImgDataJsApi = function (chooseRes, cb) {
      let localId = chooseRes.localIds[0]
      wx.checkJsApi({
        jsApiList: ['getLocalImgData'],
        success: function (res) {
          let tag = res.checkResult.getLocalImgData
          if (tag) {
            if (chooseRes.localIds.length > 1) {
              chooseRes.getImgData = getImgData
              cb(chooseRes)
            } else {
              getImgData(localId, function (res) {
                chooseRes.localData = res.localData
                cb(chooseRes)
              })
            }
          } else {
            cb(chooseRes)
          }
        }
      })
    }
    wx.chooseImage = function (opt) {
      let oldSuccess = opt.success
      opt.success = function (res) {
        checkImgDataJsApi(res, oldSuccess)
      }
      oldChooseImage(opt)
    }
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
