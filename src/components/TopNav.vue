<template>
  <div class="top-nav" :style="{background: color}">
    <slot></slot>
    <flexbox class="body">
      <flexbox-item v-for="(item, index) in nav" :key="index">
        <router-link v-if="item.link" :to="item.link">
          <div class="num">{{item.num}}</div>
          <div class="text">{{item.text}}</div>
        </router-link>
        <a v-else>
          <div class="num">{{item.num}}</div>
          <div class="text">{{item.text}}</div>
        </a>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux'

  export default {
    components: {
      Flexbox, FlexboxItem
    },
    props: {
      nav: Array,
      color: {
        type: String,
        default: '#5f60bd'
      },
    },
  }
</script>

<style scoped lang="less">
  .top-nav{
    background: #6c6bbd;
    padding: 15px 20px 65px 20px;
    position: relative;
    color: #fff;
    font-size: 18px;
    margin-bottom: 25px;
    .body{
      overflow: hidden;
      width: 86%;
      height: 75px;
      background: #fff;
      box-shadow: -2px 0 0 #e4e3f5, 0 0 0 #e4e3f5, 0 2px 15px #e4e3f5, 2px 0 0 #e4e3f5;
      border-radius: 10px;
      position: absolute;
      bottom: -25px;
      left: 7%;
      z-index: 100;
      .vux-flexbox-item{
        text-align: center;
        border-right: 1px solid #e5e5e5;
        height: 45px;
        margin: 0!important;
        outline: none;
        cursor: pointer;
        a{
          color: #999;
          .num{
            font-size: 30px;
            line-height: 30px;
            font-family: '黑体';
          }
          .text{
            font-size: 14px;
            line-height: 26px;
          }
        }
      }
    }
  }

</style>
