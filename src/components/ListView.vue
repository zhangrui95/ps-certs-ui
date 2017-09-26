<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <slot ref="list"></slot>
      <div class="pullup-wrapper">
        <div class="before-trigger" v-if="!isPullUpLoad">
          <span>{{isNoMore? '暂时没有更多': '加载更多'}}</span>
        </div>
        <div class="after-trigger" v-else>
          <inline-loading></inline-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { InlineLoading } from 'vux'
  import { post } from '@/utils/ajax'

  export default {
    components: {
      BScroll,
      InlineLoading,
    },
    props: ['url', 'params', 'list', 'startY'],
    data() {
      return {
        isPullUpLoad: false,
        isNoMore: false,
        scrollY: 0,
      }
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      },200)   
    },
    methods: {
      initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        if (this.list.length) {
          this.$nextTick(() => {
            this.scrollY = this.startY || 0
            this.scroll.scrollTo(0,this.scrollY,0)
          })
        } else {
          this.getListData()
        }
        this.bindScrollEvent()
      },
      getListData() {
        this.isPullUpLoad = true
        post(this.url, { max: 10, offset: this.list.length, ... this.params }).then(data => {
          this.$emit('update', data)
          if (!data.list.length) this.isNoMore = true
          this.$nextTick(() => {
            this.scroll.refresh()
            this.scroll.finishPullUp()
            this.isPullUpLoad = false
          })
        })
      },
      refresh () {
        this.getListData()
        this.$nextTick(() => {
          this.scroll.scrollTo(0,0,0)
        })
      },
      bindScrollEvent() {
        this.scroll.on('scrollEnd', ({x, y = 0}) => this.scrollY = y )
        this.scroll.on('pullingUp', () => {
          if (!this.isPullUpLoad && !this.isNoMore) this.getListData()
        })
      },
      getScrollY() {
        return this.scrollY
      }
    },
  }
</script>

<style lang="less">
  .list-wrapper{
    flex: 1;
    overflow: hidden;
    background: #fff;
    box-sizing: border-box;
  }
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }

</style>