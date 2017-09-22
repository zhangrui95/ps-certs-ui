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
        newImagesCache: [],
        ViewImages: []
      }
    },
    props: ['count'],
    methods: {
      chooseImage: function () {
        let _this = this
        wx.chooseImage({
          count: this.count, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var _localIds = res.localIds
            for (var i = 0, len = _localIds.length; i < len; i++) {
              let imgs = {}
              imgs.src = _localIds[i]
              _this.ViewImages.push(imgs)
              _this.newImagesCache.push(_localIds[i])
            }
            console.log(_this.newImagesCache)
            console.log(_this.ViewImages)
          }
        })
      }
    }
  }
</script>
