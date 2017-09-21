<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="list" class="list-content">
        <slot></slot>
      </div>  
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
  import { mapState } from 'vuex'
  import { getRect } from '@/utils/dom'

  export default {
    components: {
      BScroll,
      InlineLoading,
    },
    props: ['url'],
    data() {
      return {
        isPullUpLoad:false,
      }
    },
    computed: mapState({
      isNoMore: state => state.vux.listDataIsNoMore,
      noListData: state => state.vux.listData.length > 0,
      scrollTop: 'scrollTop'
    }),
    mounted() {
      this.initScroll()
    },
    methods: {
      initScroll() {
        
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        if (this.noListData) {
          this.$nextTick(() => {
            this.scroll.scrollTo(0,this.scrollTop,200)
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
        this.scroll.on('scrollEnd', ({x, y = 0}) => {
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
    box-sizing: border-box;
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