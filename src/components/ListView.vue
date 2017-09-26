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
      initScroll() { //初始化scroll
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, pullUpLoad: true })
        if (this.list.length > 0) { // 如果已有数据 滚动到指定位置 否则首次获取数据
          this.$nextTick(() => {
            this.scrollY = this.startY || 0
            this.scroll.scrollTo(0,this.scrollY,0)
          })
        } else { 
          this.getListData()
        }
        this.bindScrollEvent()
      },
      getListData(params) {
        this.isPullUpLoad = true
        post(this.url, { max: 10, offset: this.list.length, ... this.params, ...params }).then(data => {
          this.$emit('update', data) // 将获取的数据传递给父组件
          if (!data.list.length) this.isNoMore = true  // 如果list长度为0  显示“暂时没有更多”
          this.$nextTick(() => {
            this.scroll.refresh()
            this.scroll.finishPullUp()
            this.isPullUpLoad = false
          })
        })
      },
      refresh () {  // 刷新
        this.getListData({offset: 0})
        this.$nextTick(() => {
          this.scroll.scrollTo(0,0,0)
        })
      },
      bindScrollEvent() {  // 绑定滚动和上拉事件
        this.scroll.on('scrollEnd', ({x, y = 0}) => this.scrollY = y )
        this.scroll.on('pullingUp', () => {
          if (!this.isPullUpLoad && !this.isNoMore) this.getListData()
        })
      },
      getScrollY() {  // 获取滚动的高度
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