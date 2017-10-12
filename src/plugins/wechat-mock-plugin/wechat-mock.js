
const wx = {
  index: 0,
  __hideFileMap: {},
  config: function (opt) {
    console.log('wx.config', opt)
  },
  checkJsApi: function (opt) {
    console.log('wx.checkJsApi', opt)
    const checkResult = {}
    const jsApiList = opt.jsApiList
    for (let i in jsApiList) {
      checkResult[jsApiList[i]] = true
    }
    opt.success({checkResult: checkResult})
  },
  getLocalImgData: function (opt) {
    console.log('wx.getLocalImgData', opt)
    const file = wx.__hideFileMap[opt.localId]
    console.log('wx.getLocalImgData file', file)
    if (file) {
      const render = new FileReader()
      render.onload = function (e) {
        opt.success({localData: e.target.result})
      }
      render.readAsDataURL(file)
    } else {
      setTimeout(function () {
        opt.success({localData: opt.localId})
      }, 500 + Math.round(Math.random() * 100))
    }
  },
  chooseImage: function (opt) {
    console.log('wx.chooseImage', opt)
    const input = document.createElement('input')
    input.type = 'file'
    // input.accept = 'image/*';
    if (opt.count > 1) {
      input.multiple = 'multiple'
    }
    const hideFileMap = {}
    wx.__hideFileMap = hideFileMap
    input.onchange = function () {
      console.log('wx.chooseImage file', input.files)
      const files = input.files
      if (files && files.length !== 0) {
        const localIds = []
        const len = files.length
        for (let i = 0; i < len; i++) {
          (function (file) {
            const render = new FileReader()
            render.onload = function (e) {
              const blob = new Blob([e.target.result])
              const src = (URL || window.webkitURL).createObjectURL(blob)
              localIds.push(src)
              hideFileMap[src] = file
              if (localIds.length === len) {
                console.log('wx.chooseImage localIds', localIds)
                opt.success({localIds: localIds})
              }
            }
            render.readAsArrayBuffer(file)
          })(files[i])
        }
      }
    }
    input.click()
  },
  uploadImage: function (opt) {
    console.log('wx.uploadImage', opt)
    setTimeout(function () {
      wx.index++
      opt.success({serverId: 'testServerImgId_' + wx.index})
    }, 500 + Math.round(Math.random() * 100))
  },
  closeWindow: function () {
    console.log('wx.closeWindow')
  },
  ready: function (cb) {
    console.log('wx.ready')
    cb()
  },
  invoke: function (func, opt) {
    console.log('wx.invoke ' + func, opt)
  },
  onMenuShareTimeline: function (opt) {
    console.log('wx.onMenuShareTimeline', opt)
  },
  onMenuShareQQ: function (opt) {
    console.log('wx.onMenuShareTimeline', opt)
  },
  onMenuShareAppMessage: function (opt) {
    console.log('wx.onMenuShareAppMessage', opt)
  },
  onMenuShareWeibo: function (opt) {
    console.log('wx.onMenuShareTimeline', opt)
  },
  onMenuShareQZone: function (opt) {
    console.log('wx.onMenuShareQZone', opt)
  },
  hideAllNonBaseMenuItem: function (opt) {
    console.log('wx.hideAllNonBaseMenuItem', opt)
  }
}

export default wx
