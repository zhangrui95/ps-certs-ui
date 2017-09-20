<template>
  <div>
    <img class="previewer-demo-img" v-for="(item, index) in imgList" :src="item.src" @click="show(index)">
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer" :options="options"></previewer>
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
      }
    },
    props: ['imgList'],
    data () {
      return {
        options: {
          getThumbBoundsFn (index) {
            console.log(index)
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    }
  }
</script>

<style>
  .previewer-demo-img{
    width: 45px;
    height: 45px;
    float: right;
    margin: 5px;
  }
</style>
