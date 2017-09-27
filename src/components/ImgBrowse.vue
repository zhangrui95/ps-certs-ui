<template>
  <div>
    <img class="previewer-demo-img" v-for="(item, index) in imgList" :src="item.src" @click="show(index)" :key="index">
    <div v-transfer-dom>
      <transition name="move">
        <div v-show="del">
          <div class="box-img" @click="hideImg">
            <swiper v-model="ImgIndex" :show-dots="false" style="width:100%;margin:0 auto;" height="100%" @on-index-change="change">
              <swiper-item class="swiper-demo-img" :key="index" v-for="(item, index) in imgList">
                <img :src="item.src" class="src-img">
              </swiper-item>
            </swiper>
          </div>
          <div class="del-btn" transition="move" @click="deleteImage" v-if="delShow"><i class="weui-icon-delete weui-icon_gallery-delete"></i></div>
        </div>
      </transition>
    </div>
    <confirm v-model="showCom"
             title=" "
             @on-confirm="onConfirm(index)"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">{{confirmText}}</p>
    </confirm>
  </div>
</template>

<script>
  import { Previewer, TransferDom, Confirm, Swiper, SwiperItem } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Confirm,
      SwiperItem,
      Swiper
    },
    methods: {
      show (index) {
        this.del = true
        this.index = index
        this.src = this.imgList[index].src
        this.ImgIndex = index
      },
      deleteImage: function () {
        this.del = false
        this.showCom = true
      },
      hideImg () {
        this.del = false
      },
      onConfirm (index) {
        this.imgList.splice(index, 1)
        this.$emit('delImgIndex', index)
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      change (index) {
        this.index = index
      }
    },
    props: ['imgList', 'delShow'],
    data () {
      return {
        del: false,
        index: '',
        src: '',
        confirmText: '确定删除该照片？',
        showCom: false,
        ImgIndex: 0
      }
    }
  }
</script>

<style lang="less">
  .vux-slider{
    height: 100%;
  }
  .swiper-demo-img{
    width: 100%;
  }
  .previewer-demo-img{
    width: 45px;
    height: 45px;
    float: right;
    margin: 5px;
  }
  .box-img{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 99999;
    background: #000;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .del-btn{
    color: #fff;
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    z-index: 99999;
    background: #0d0d0d;
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    letter-spacing: 2px;
  }
  .move-enter-active, .move-leave-active{
    opacity: 1;
    transition: all 0s ease;
  }
  .move-leave-active, .move-enter{
    opacity: 0;
    transition: all 0s ease;
  }
  .pswp__top-bar{
    display: none;
  }
  .src-img{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>
