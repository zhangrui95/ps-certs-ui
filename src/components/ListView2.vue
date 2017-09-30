<template>
  <div ref="wrapper" class="list-box">
    <div class="scroll-content" >
      <div class="list-wrap">
          <slot v-for="(item, index) in list" :item="item" :index="index"></slot>
      </div>
      <div class="pullup-wrapper">
        <div class="before-trigger" v-if="!isPullUpLoad">
          <span>{{isNoMore? '暂时没有更多': '加载更多'}}</span>
        </div>
        <div class="after-trigger" v-else>
          加载中<inline-loading></inline-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { InlineLoading } from 'vux'

  export default {
    components: {
      BScroll, InlineLoading,
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    watch: {
      list () {
        if (this.list.length < 10) this.isNoMore = true
        this.refresh()
      }
    },
    data() {
      return {
        isPullUpLoad: false,
        isNoMore: false,
      }
    },
    mounted() {
      this.initScroll()
    },
    methods: {
      initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        this.scroll.on('scrollEnd', position => this.$emit('scrollEnd', position))
        this.scroll.on('pullingUp', () => {
          if (!this.isPullUpLoad && !this.isNoMore) this.$emit('pullingUp')
        })
      },
      refresh () {
        this.$nextTick(() => {
          this.scroll.refresh()
          this.scroll.finishPullUp()
          this.isPullUpLoad = false
        })
      },
      scrollTo (y) {
        this.scroll.scrollTo(0,y,0)
      },
    },
  }
</script>

<style lang="less">
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
</style>
