<template>
  <div ref="wrapper" class="list-box">
    <div class="scroll-content" >
      <list class="list-wrap" :list="list">
        <template scope="props">
          <slot :item="props.item" :index="props.index"></slot>
        </template>
      </list>
      <load-more :show-loading="isPullUpLoad"  :tip="isPullUpLoad?'加载中':(isNoMore?'暂时没有更多':'加载更多')"></load-more>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
//  import LoadMore from './LoadMore'
  import { LoadMore } from 'vux'
  import List from './List'

  export default {
    components: {
      BScroll, List, LoadMore
    },
    props: {
      list: {
        type: Array,
        'default': []
      },
      groupBy: {
        type: Function
      },
      listInOrder: {
        type: Boolean,
        'default': false
      }
    },
    watch: {
      list (arr) {
        if (arr.length < 10) this.isNoMore = true
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
        console.log('this.groupBy', this.groupBy)
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        this.scroll.on('scrollEnd', position => this.$emit('scrollEnd', position))
        this.scroll.on('pullingUp', () => {
          if (!this.isPullUpLoad && !this.isNoMore) {
            this.isPullUpLoad = true
            this.$emit('pullingUp')
          }
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
