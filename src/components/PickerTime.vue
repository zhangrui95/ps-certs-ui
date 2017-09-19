<template>
  <div class="vux-checker-box picker-date">
    <div class="checker-title">时间</div>
    <div class="vux-checker-item vux-tap-active" :class="{'checker-item-selected': reseted}" @click="reset">全部</div>
    <datetime
      v-model="startStr" placeholder="开始时间"
      year-row="{value}年" month-row="{value}月" day-row="{value}日"
      :default-selected-value="initialStr"
      :start-date="initialStr" 
      :end-date="endStr || new Date() | dateFormat" @on-change="setStr"/>—
    <datetime
      v-model="endStr"  placeholder="结束时间"
      year-row="{value}年" month-row="{value}月" day-row="{value}日"
      :default-selected-value="new Date() | dateFormat"
      :end-date="new Date() | dateFormat"
      :start-date="startStr || initialStr" @on-change="setStr"/>
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
        endStr: '',
      }
    },
    props: {
      initialStr: String,
    },
    methods: {
      setStr (value) {
        if (value)  this.reseted = false
      },
      getStartStr () {
        return this.startStr
      },
      getEndStr () {
        return this.endStr
      },
      reset () {
        this.reseted = true
        this.startStr = ''
        this.endStr = ''
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
      color:#55a3e7 ;
      font-weight: 900;
      margin: 10px;
    }
    .vux-checker-item{
      float: left;
      padding: 2px 10px;
      margin: 5px;
      cursor: pointer;
      border: 1px solid #fff;
    }
    .checker-item-selected {
      border: 1px dashed #55a3e7;
      border-radius: 5px;
      color: #55a3e7;
      background: transparent;
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
      }
      &:before{
        display: none;
      }
      .weui-cell__ft:after{
        display:none;
      }
    }
  }
  .theme-red{
    .picker-date{
      .checker-title{
        color:#ff5a54 ;
      }
      .checker-item-selected {
        border: 1px dashed #ff5a54;
        color: #ff5a54;
      }
    }
  }
</style>
