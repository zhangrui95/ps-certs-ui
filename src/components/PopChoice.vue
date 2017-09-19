<template>
  <div class="filtrate filtrate-blue" id="filtrate" v-if="popShow">
    <pop-search></pop-search>
    <div class="choice-box-pop" v-if="choice">
      <picker-date></picker-date>
      <choice-list :list="list2" :title="title2" :more="morePolice" :tag="tagPolice"></choice-list>
      <div class="height-fixed"></div>
    </div>
    <div class="btn-box" id="btnPanel">
      <div class="imported-left" id="reset">重置</div>
      <a class="btn-bg" href="javascript:" id="showToast" data-id="hotel-choice-list">确定</a>
    </div>
  </div>
</template>

<script>
  import { Countup, Cell } from 'vux'
  import ChoiceList from './ChoiceList'
  import Btn from './Btn'
  import PickerDate from  './PickerDate'
  import PopSearch from './PopSearch'

  export default {
    components: {
      Countup,
      ChoiceList,
      Btn,
      Cell,
      PickerDate,
      PopSearch
    },
    data () {
      return {
        btn: '查询',
        length1: 0,
        tag: true,
        tagPolice: true,
        goLink: '/CompanyList',
        title2: '选择辖区',
        list2: [],
        title3: '选择时间',
        list3: []
      }
    },
    props: [
      'popShow',
      'choice'
    ],
    created: function () {
      this.$http.post('/example/api/company/info.json').then(response => {
        this.length1 = response.data.persons.length
        if(this.length1 > 10){
          response.data.persons.length = 11
          for (let j in response.data.persons) {
            this.list2.push(response.data.persons[j])
          }
        }
      })
    },
    methods: {
      morePolice: function () {
        this.list2 = []
        this.$http.post('/example/api/company/info.json').then(response => {
          response.data.persons.length = this.length1
          for (let j in response.data.persons) {
            this.list2.push(response.data.persons[j])
            this.tagPolice = false
          }
        })
      },
      clickDics: function () {

      },
      Default: function () {
        this.popShow = false
//        this.$emit('popShow', false)
      }
    }
  }
</script>
<style>
  .choice-box-pop{
    height: 70%;
    overflow-y: scroll;
  }
  .filtrate .vux-datetime.weui-cell{
    padding: 6px 10px;
  }
</style>
