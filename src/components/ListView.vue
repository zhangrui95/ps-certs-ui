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
  import { mapState } from 'vuex'

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
      isNoMore: state => state.listDataIsNoMore,
      hasListData: state => state.listData.length > 0,
      scrollTop: 'scrollTop'
    }),
    mounted() {
      setTimeout(() => {
        this.initScroll()
      },200)   
    },
    methods: {
      initScroll() {
        
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        if (this.hasListData) {
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
  }
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }

</style>