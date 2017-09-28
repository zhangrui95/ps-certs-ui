<template>
  <div @click="addItem(index, count)">
    <slot></slot>
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
      choose: function (limit, localCb) {
        let _this = this
        this.$wechat.chooseImage({
          count: limit, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            _this.$vux.loading.show({text: '上传中...'})
            let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            let localData = res.localData
            let getImgData = res.getImgData
            let nextFun = function () {
              _this.$vux.loading.hide()
            }
            let localId = localIds.pop()
            while (localId) {
              nextFun = (function (imLocalId, next) {
                return function () {
                  if (getImgData) {
                    getImgData(imLocalId, function (dataRes) {
                      localCb(imLocalId, dataRes.localData, next)
                    })
                  } else {
                    let url = localData || imLocalId
                    localCb(imLocalId, url, next)
                  }
                }
              })(localId, nextFun)
              localId = localIds.pop()
            }
            nextFun()
          },
          fail: function (err) {
            _this.$vux.toast.text('提交失败！')
          }
        })
      },
      upload: function (localId, serverCb, next) {
        let _this = this
        this.$wechat.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success: function (res) {
            let serverId = res.serverId // 返回图片的服务器端ID
            serverCb(localId, serverId)
            if (next) {
              next()
            }
          },
          fail: function (err) {
            _this.$vux.toast.text('提交失败！')
          }
        })
      },
      addItem: function (index, limit) {
        let _this = this
        let iosLocId = []
        let ids = []
        this.$emit('num', this.index)
        this.choose(limit, function (localId, url, next) {
          let serverCb = function (localId, serverId) {
            let imgs = {}
            imgs.src = localId
            if (limit === 1) {
              iosLocId.push(imgs)
              _this.ViewImages = iosLocId
              ids.push(serverId)
              _this.Ids = ids
            } else {
              _this.ViewImages.push(imgs)
              _this.Ids.push(serverId)
            }
            _this.$emit('addImages', _this.ViewImages)
            _this.$emit('ids', _this.Ids)
          }
          _this.upload(localId, serverCb, next)
        })
      }
    }
  }
</script>
