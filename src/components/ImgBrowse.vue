<template>
  <div>
    <img class="previewer-demo-img" v-for="(item, index) in imgList" :src="item.src" @click="show(index)" :key="index">
    <div v-transfer-dom>
      <div @click="hideDel">
        <previewer :list="imgList" ref="previewer"></previewer>
      </div>
      <transition name="move" v-if="delShow">
        <div v-show="del" class="del-btn" transition="move" @click="deleteImage(index)"><i class="weui-icon-delete weui-icon_gallery-delete"></i></div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
        this.del = true
        this.index = index
      },
      hideDel () {
        this.del = false
      },
      deleteImage: function (index) {
        this.imgList.splice(index, 1)
      }
    },
    props: ['imgList', 'delShow'],
    data () {
      return {
        del: false,
        index: ''
      }
    }
  }
</script>

<style lang="less">
  .mytran {
    transition: all 0.3s ease;
    background-color: greenyellow;
  }

  .mytran-enter, .mytran-leave {
    height: 0;
    width: 0;
  }
  .previewer-demo-img{
    width: 45px;
    height: 45px;
    float: right;
    margin: 5px;
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
    transition: all 1s ease;
  }
  .move-leave-active, .move-enter{
    opacity: 0;
    transition: all 1s ease;
  }
  .pswp__top-bar{
    display: none;
  }

</style>
