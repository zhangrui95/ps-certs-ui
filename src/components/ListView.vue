<template>
  <div ref="wrapper" class="list-wrapper" :style="style">
    <div class="scroll-content">
      <div ref="list" class="list-content">
        <slot></slot>
      </div>  
      <div class="pullup-wrapper">
        <div class="before-trigger" v-if="!isPullUpLoad">
          <span>{{pullUpTxt}}</span>
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
  import { getRect } from '@/utils/dom'

  export default {
    components: {
      BScroll,
      InlineLoading,
    },
    props: ['url', 'style'],
    data() {
      return {
        isPullUpLoad:false,
      }
    },
    computed: {
      pullUpTxt () {
        return this.$store.state.vux.listDataIsNoMore? '暂时没有更多': '加载更多'
      },
    },
    mounted() {
      this.initScroll()
    },
    methods: {
      initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        if (this.$store.state.vux.listData.length > 0) {
          this.$nextTick(() => {
            this.scroll.scrollTo(0,this.$store.state.vux.scrollTop,200)
          })
        } else {
          this.updateListData()
        }
        this.bindScrollEvent()
      },
      updateListData() {
        this.isPullUpLoad = true
        this.$store.dispatch('updateListData', { url: this.url, cb: () => {
          this.$nextTick(() => {
            this.scroll.refresh()
            this.scroll.finishPullUp()
            this.isPullUpLoad = false
          })
        }})
      },
      bindScrollEvent() {
        this.scroll.on('scrollEnd', ({x, y}) => {
          this.$store.commit('updateScrollTop', y)
        })
        this.scroll.on('pullingUp', () => {
          if (!this.isPullUpLoad && !this.isNoMore){
            this.updateListData()
          }
        })
      },
    },
  }
</script>

<style lang="less">
  .list-wrapper{
    flex: 1;
    overflow: hidden;
    background: #fff;
    .list-content{
      position: relative;
      z-index: 10;
      background: #fff;
    }
  }
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }

</style>