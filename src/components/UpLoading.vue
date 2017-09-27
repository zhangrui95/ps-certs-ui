<template>
  <div class="img-uploader-box" @click="chooseImage">
    <input class="weui-uploader__input" type="button"/>
    <img class="change-upload" src="../assets/photo.png"/>
  </div>
</template>

<script>
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
            _this.upload(res, _this.count)
          },
          fail: function (err) {
            console.log('error')
          }
        })
      },
      getLocalImgData: function (res, count) {
        let ioslocId = []
        let _this = this
        for (let i = 0, len = res.localIds.length; i < len; i++) {
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
        }
      },
      upload: function (res, count) {
        let _localIds = res.localIds
        let _this = this
        let ids = []
        for (let i = 0, len = _localIds.length; i < len; i++) {
          this.$wechat.uploadImage({
            localId: _localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
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
  }
</script>
