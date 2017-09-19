<template>
  <div class="page page-list student-page student-page-noinform">
    <div class="header-box" id="headerText">未通知</div>
    <div class="draw-time-box">
      <div class="draw-time-title">领取时间</div>
      <!--<div class="draw-time" id="time">请选择</div>-->
      <datetime placeholder="请选择" class="draw-time" v-model="value9" @on-change="change" :show.sync="visibility"></datetime>
    </div>
    <div class="draw-time-box">
      <div class="draw-time-title">领取地址</div>
      <div class="draw-time" ><input class="text-place" type="text" id="address"></div>
    </div>
    <div class="time-box time-top">
      <input class="check-problem check-problem-margin" id="20170808" data-date-group="20170808" type="checkbox">
      <label for="20170808"></label>
      <span class="time-title">2017年08月08日</span>
    </div>
    <div class="list">
      <!--<checklist :options="objectList" v-model="objectListValue" @on-change="changes"></checklist>-->
      <div class="time-box">
        <input class="check-problem checkbox" id="1" data-id="1" data-date="20170808" type="checkbox">
        <label for="1"></label>
        <div class="number checkbox-left-num number-line-height">01.</div>
        <div class="list-news">
          <div class="name-color name-color-line">test三1</div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <div>
        <input class="all-choice-check" name="check" id="checkAll"  type="checkbox" checked/>
        <label for="checkAll"></label>
        <span class="problem-word choice-top" id="allText">全部选择</span>
      </div>
      <a class="btn-right" href="javascript:" id="showToast">通知</a>
    </div>
  </div>
</template>

<script>
  import { Datetime, Checklist } from 'vux'

  export default {
    components: {
      Datetime,
      Checklist
    },
    data () {
      return {
        value9: '',
        visibility: false,
        objectList: [{key: '1', value: '001 value'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],
        objectListValue: ['1', '2']
      }
    },
    methods: {
      change (value) {
        console.log('change', value)
      },
      changes (val) {
        console.log('changes', val)
      }

    }
  }
</script>

<style lang="less">
  .student-page.student-page-noinform{
    .vux-datetime.weui-cell{
      padding: 0 5px;
    }
    .weui-cell_access .weui-cell__ft:after{
      display: none;
    }
    .weui-cell__ft{
      text-align: left;
    }
  }
</style>
