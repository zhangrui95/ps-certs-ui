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
        ViewImages: []
      }
    },
    props: ['count', 'index'],
    methods: {
      chooseImage: function () {
        this.$emit('num', this.index)
        let _this = this
        console.log('start!')
        this.$wechat.chooseImage({
          count: _this.count, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            let localId = res.localIds[0]
            let localData = res.localData
            let url = localData || localId
            console.log('url' + url)
            _this.upload(res, _this.count)
          },
          fail: function (err) {
            console.log('error')
          }
        })
      },
      upload: function (res, count) {
        let _localIds = res.localIds
        let _this = this
        this.$wechat.uploadImage({
          localId: _localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            let Imgsrc = []
            for (var i = 0, len = _localIds.length; i < len; i++) {
              let imgs = {}
              imgs.src = "'" + _localIds[i] + "'"
              if (count === 9) {
                _this.ViewImages.push(imgs)
              } else {
                Imgsrc.push(imgs)
                _this.ViewImages = Imgsrc
              }
            }
            _this.$emit('addImages', _this.ViewImages)
          },
          fail: function (err) {
          }
        })
      }
    }
  }
</script>
