<template>
  <div class="employee-choice-box">
    <div class="all-nums-box" id="all-nums-box">
      <div class="all-number">企业从业人员数量</div>
      <div class="all-done-num">
        <countup class="done-num-child timer" :start-val="0" :end-val="20" :duration="0.7"></countup>
        <p class="child-name child-name-red">未核查</p>
      </div>
      <div class="all-num">
        <countup class="all-num-child timer" :start-val="0" :end-val="37" :duration="0.7"></countup>
        <p class="child-name">全部</p>
      </div>
    </div>
    <div>
      <choice-list :list="list1" :title="title1" :more="more" :tag="tag"></choice-list>
      <choice-list :list="list2" :title="title2" :more="morePolice" :tag="tagPolice"></choice-list>
      <picker-date></picker-date>
      <div class="height-fixed"></div>
    </div>
    <btn :btn="btn" :goLink="goLink" :clickDics="clickDics"></btn>
  </div>
</template>

<script>
  import { Countup, Cell } from 'vux'
  import ChoiceList from '../components/ChoiceList'
  import Btn from '../components/Btn'
  import PickerDate from '../components/PickerDate'

  export default {
    components: {
      Countup,
      ChoiceList,
      Btn,
      Cell,
      PickerDate
    },
    data () {
      return {
        btn: '查询',
        length: 0,
        length1: 0,
        tag: true,
        tagPolice: true,
        goLink: '/CompanyList',
        title1: '选择分类',
        list1: [],
        title2: '选择辖区',
        list2: [],
        title3: '选择时间',
        list3: [{
          name: '普通',
          num: '23'
        }, {
          name: '其他',
          num: '5'
        }]
      }
    },
    created: function () {
      this.$http.post('/example/api/company/info.json').then(response => {
        this.length = response.data.types.length
        if(this.length > 10){
          response.data.types.length = 11
          for (let i in response.data.types) {
            this.list1.push(response.data.types[i])
          }
        }

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
      more: function () {
        this.list1 = []
        this.$http.post('/example/api/company/info.json').then(response => {
          response.data.types.length = this.length
          for (let i in response.data.types) {
            this.list1.push(response.data.types[i])
            this.tag = false
          }
        })
      },
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

      }
    }
  }
</script>

<style lang="less">
  .employee-choice-box{
    height: 89%;
    overflow-y: scroll;
  }
</style>
