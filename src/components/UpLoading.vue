<template>
  <div class="img-uploader-box" @click="chooseImage">
    <input class="weui-uploader__input" type="button"/>
    <img class="change-upload" src="../assets/photo.png"/>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  export default {
    data () {
      return {
        newImagesCache: [],
        ViewImages: []
      }
    },
    props: ['count'],
    methods: {
      chooseImage: function () {
        let _this = this
        wx.chooseImage({
          count: _this.count, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            console.log('wx is success!!!')
            let _localIds = res.localIds
            _this.$options.methods.upload(_localIds)
          },
          fail: function (err) {
            console.log('error!!!')
          }
        })
      },
      upload: function (_localIds) {
        let localId = _localIds.pop()
        wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            let serverId = res.serverId // 返回图片的服务器端ID
            this.$options.methods.serverCb(_localIds, serverId)
          },
          fail: function (err) {
          }
        })
      },
      serverCb: function (_localIds, serverId) {
        for (var i = 0, len = _localIds.length; i < len; i++) {
          let imgs = {}
          imgs.src = _localIds[i]
          if (this.count === 1) {
            this.ViewImages = imgs
          } else {
            this.ViewImages.push(imgs)
          }
          this.ViewImages.push(imgs)
          this.newImagesCache.push(_localIds[i])
        }
        console.log(this.newImagesCache)
        this.$emit('addImages', this.newImagesCache)
        console.log(this.ViewImages)
      }
    }
  }
</script>
