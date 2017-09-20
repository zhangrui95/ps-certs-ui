<template>
  <div class="tabel-page">
    <div class="header">
      <slot name="top"></slot>
      <flexbox class="nav">
        <flexbox-item v-for="(item, index) in nav" :key="index">
          <router-link :to="item.link || ''" :class="[item.clsName || '']">
            <div class="num">{{item.num}}</div>
            <div class="text">{{item.text}}</div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="table">
      <div class="t-head">
        <flexbox>
          <flexbox-item v-for="(item, index) in tHead" :key="index">{{item}}</flexbox-item>
        </flexbox>
      </div>
      <div class="t-body">
        <flexbox >
          <flexbox-item v-for="(item, index) in tHead" :key="index">{{item}}</flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    Flexbox, FlexboxItem, 
  },
  props: ['nav', 'tHead', 'tBody'],
}
</script>

<style lang="less">
  .tabel-page{
    .header{
      background: #55a3e7;
      padding: 20px 5px 52px 5px;
      position: relative;
      .nav{
        overflow: hidden;
        width: 86%;
        height: 75px;
        background: #fff;
        box-shadow: -2px 0 0 #faeded,0 0 0 #ffe1e0,0 2px 15px #ffe1e0,2px 0 0 #fbf6f6;
        border-radius: 10px;
        position: absolute;
        bottom: -35px;
        left: 7%;
        .vux-flexbox-item{
          text-align: center;
          border-right: 1px solid #e5e5e5;
          height: 45px;
          margin: 0!important;
          outline: none;
          cursor: pointer;
          a{
            color: #999;
            &.active{
              color: #55a3e7;
            }
            .num{
              font-size: 30px;
              line-height: 24px;
            }
            .text{
              font-size: 14px;
              line-height: 26px;
            }
          }
        }
      }
    }
    .table{
      margin: 54px 10px;
      .t-head{
        color: #999;
        font-size: 13px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }

</style>
