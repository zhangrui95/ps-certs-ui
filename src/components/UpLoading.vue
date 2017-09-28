<template>
  <div @click="chooseImage">
    <slot></slot>
  </div>
</template>

<script>
  let ids = []
  export default {
    data () {
      return {
        ViewImages: [],
        Ids: []
      }
    },
    props: ['count', 'index'],
    methods: {
      chooseImage: function () {
        this.$emit('num', this.index)
        let _this = this
        this.$wechat.chooseImage({
          count: _this.count, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            if (/iPhone/gi.test(navigator.userAgent)) {
              _this.getLocalImgData(res, _this.count)
            } else {
              _this.getAddImages(res, _this.count)
            }
          },
          fail: function (err) {
            console.log('error')
          }
        })
      },
      getAddImages: function (res, count) {
        let AndroidlocId = []
        let _this = this
        for (let i in res.localIds) {
          let localId = res.localIds[i]
          let imgs = {}
          imgs.src = localId
          if (count === 9) {
            _this.ViewImages.push(imgs)
          } else {
            AndroidlocId.push(imgs)
            _this.ViewImages = AndroidlocId
          }
          _this.$emit('addImages', _this.ViewImages)
          _this.getuploadImage(res, count, i)
        }
      },
      getLocalImgData: function (res, count) {
        let ioslocId = []
        let _this = this
        for (let i in res.localIds) {
          this.$wechat.getLocalImgData({
            localId: res.localIds[i],
            success: function (res) {
              let localData = res.localData
              let imgs = {}
              imgs.src = localData
              if (count === 9) {
                _this.ViewImages.push(imgs)
              } else {
                ioslocId.push(imgs)
                _this.ViewImages = ioslocId
              }
              _this.$emit('addImages', _this.ViewImages)
            },
            fail: function (err) {
            }
          })
          this.getuploadImage(res, count, i)
        }
      },
      getuploadImage: function (res, count, i) {
        let _this = this
        this.$wechat.uploadImage({
          localId: res.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            let serverId = res.serverId
            if (count === 9) {
              _this.Ids.push(serverId)
            } else {
              ids.push(serverId)
              _this.Ids = ids
            }
            _this.$emit('ids', _this.Ids)
          },
          fail: function (err) {
          }
        })
      }
    }
  }
</script>
