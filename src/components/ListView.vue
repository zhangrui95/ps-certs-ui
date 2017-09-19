<template>
  <scroller 
    class="list-view" lock-x 
    ref="scrollerBottom" 
    :scroll-bottom-offst="120"
    @on-scroll-bottom="onScrollBottom">
    <group>
      <swipeout>
        <slot></slot>
      </swipeout>
      <load-more :tip="hasMore?'正在加载':'暂时没有更多'" :show-loading="hasMore"></load-more>
    </group>
  </scroller>
</template>

<script>
  import { Scroller, LoadMore, Group, Swipeout } from 'vux'

  export default {
    components: {
      Scroller, LoadMore, Group, Swipeout
    },
    data () {
      return {
        onFetching: false
      }
    },
    props: {
      hasMore: Boolean,
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    methods: {
      onScrollBottom () {
        if (!this.onFetching) {
          this.onFetching = true
          this.$emit('getData',
            () => {
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset()
              })
              this.onFetching = false
            }
          )
        }
      },
      refresh () {
        if (!this.onFetching) {
          this.onFetching = true
          this.$emit('getData',
            () => {
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
              })
              this.onFetching = false
            }
          )
        }
      }
    }
  }
</script>

<style lang="less">
  .list-view{
    flex: 1;
    .vux-no-group-title{
      margin-top: 0px;
      &:before{
        border-top: none;
      }
    }
    .weui-cell {
      padding-right: 0;
      margin: 0 15px;
      border-bottom: 1px solid #f0f0f0;
      &::before{
        display: none;
      }
      .weui-cell__hd{
        position: absolute;
        top: 14px;
        left: -5px;
        img{
          width: 22px;
        }
      }
      .vux-cell-bd{
        padding: 0 5px;
        .vux-label {
          line-height: 33px;
          color: #666;
        }
        .vux-label-desc{
          color: #999;
          img{
            width: 15px;
            padding-right: 5px;
            vertical-align: text-bottom;
          }
        }
      }
      .weui-cell__ft{
        padding-right: 0;
        &::after{
          display: none;
          padding-right: 0;
        }
      }
    }
  }
</style>
