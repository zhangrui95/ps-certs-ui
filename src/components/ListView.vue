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
      page: {
        type: Number,
        'default': 10
      },
      init: {
        type: Boolean,
        'default': true
      },
      total: {
        type: Number,
        'default': -1
      },
      currLen: {
        type: Number,
        'default': -1
      }
    },
    watch: {
      list () {
        this.refresh()
      }
    },
    data () {
      return {
        isPullUpLoad: false,
        isNoMore: false,
        offset: 0
      }
    },
    mounted () {
      this.initScroll()
    },
    methods: {
      initScroll () {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        this.scroll.on('scrollEnd', position => this.$emit('scrollEnd', position))
        this.scroll.on('pullingUp', () => {
          if (!this.isPullUpLoad) {
            this.offset = this.list.length
            this.isPullUpLoad = true
            this.next()
          }
        })
        if (this.init) {
          this.next()
        }
      },
      next () {
        this.$emit('pullingUp', {max: this.page, offset: this.offset})
      },
      refresh () {
        this.$nextTick(() => {
          this.scroll.refresh()
          this.scroll.finishPullUp()
          this.isPullUpLoad = false
          this.isNoMore = (this.total !== -1 && this.total === this.currLen) || this.currLen === 0
        })
      },
      scrollTo (y) {
        this.scroll.scrollTo(0, y, 0)
      }
    }
  }
</script>
