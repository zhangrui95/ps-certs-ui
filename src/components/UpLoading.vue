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
            _this.getLocalImgData(res, _this.count)
          },
          fail: function (err) {
            console.log('error')
          }
        })
      },
      getLocalImgData: function (res, count) {
        let _this = this
        let ioslocId = []
        for (let i in res.localIds) {
          if (/iPhone/gi.test(navigator.userAgent)) {
            this.$wechat.getLocalImgData({
              localId: res.localIds[i],
              success: function (res) {
                let localData = res.localData
                _this.getAdd(res, count, localData, ioslocId)
              },
              fail: function (err) {
              }
            })
          } else {
            let localId = res.localIds[i]
            _this.getAdd(res, count, localId, ioslocId)
          }
          this.getuploadImage(res, count, i)
        }
      },
      getAdd: function (res, count, localId, iosLocId) {
        let imgs = {}
        imgs.src = localId
        if (count === 9) {
          this.ViewImages.push(imgs)
          this.$emit('addImages', this.ViewImages)
        } else {
          iosLocId.push(imgs)
          this.ViewImages = iosLocId
          this.$emit('addImages', this.ViewImages)
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
