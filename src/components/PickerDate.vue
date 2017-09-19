<template>
  <div class="vux-checker-box picker-date">
    <div class="checker-title">选择时间</div>
    <div class="vux-checker-item vux-tap-active" :class="{'checker-item-selected': reseted}" @click="reset">全部</div>
    <datetime
      v-model="startStr" placeholder="开始时间" @on-change="" clear-text="today" @on-clear="setToday"/>-
    <datetime
      v-model="endStr" placeholder="开始时间" @on-change="" clear-text="today" @on-clear="setToday"/>
  </div>
</template>

<script>
  import { Datetime } from 'vux'

  export default {
    components: {
      Datetime
    },
    data () {
      return {
        reseted: true,
        startStr: '',
        endStr: ''
      }
    },
    props: {
      initialStr: String
    },
    methods: {
      setStr (value) {
        if (value)  this.reseted = false
      },
      reset () {
        this.reseted = true
        this.startStr = ''
        this.endStr = ''
      },
      setToday (value) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        this.$data.startStr = now.getFullYear() + '-' + cmonth + '-' + day
        console.log('set today ok')
      }
    }
  }
</script>

<style lang="less">
  .picker-date{
    margin: 20px 10px;
    overflow: hidden;
    font-size: 16px;
    .checker-title{
      width: 94%;
      margin: 0 auto;
      line-height: 50px;
      color: #5a8af6;
      text-shadow: 1px 1px 2px #90b1ff;
    }
    .vux-checker-item{
      float: left;
      margin: 6px 1%;
      cursor: pointer;
      width: 31%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background: #f5f5f5;
      border-radius: 50px;
      font-size: 14px;
      color: #666;
    }
    .checker-item-selected {
      background:-moz-linear-gradient(left, #6a95fd, #467bed);/*Mozilla*/
      background:-webkit-gradient(linear,0 50%,100% 50%,from(#6a95fd),to(#467bed));/*Old gradient for webkit*/
      background:-webkit-linear-gradient(left,#6a95fd,#467bed);/*new gradient for Webkit*/
      background:-o-linear-gradient(left,#6a95fd,#467bed); /*Opera11*/
      color: #ffffff;
      box-shadow: 0px 1px 8px #9db8f6;
    }
    .vux-datetime{
      display: inline-block;
      border-radius: 15px;
      width: 76px;
      font-size: 14px;
      padding: 6px 10px;
      margin: 5px;
      cursor: pointer;
      background: #f5f5f5;
      line-height: 19px;
      color: #888;
      .weui-cell__ft{
        padding-right: 0;
        text-align: center;
        font-size: 13px;
      }
      &:before{
        display: none;
      }
      .weui-cell__ft:after{
        display:none;
      }
    }
  }
  .theme-blue{
    .picker-date{
      .checker-title{
        color:#55a3e7 ;
      }
      .checker-item-selected {
        border: 1px dashed #55a3e7;
        color: #55a3e7;
      }
    }
  }
</style>
