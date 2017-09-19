<template>
  <div class="choice-list">
    <div class="all-num-box">
      <!--<countup :start-val="0" :end-val="987" :duration="0.7" class="demo1"></countup>-->
      <router-link to="/AddCompany"><img class="change-news" src="../assets/icon-new.png"></router-link>
      <countup :start-val="0" :end-val="987" :duration="0.7" class="demo1"></countup>
      <div class="all-number">全部企业</div>
      <img class="bg-img-header" src="../assets/bg.png"/>
    </div>
    <div class="choice-box">
      <choice-list :list="list1" :title="title1" :more="more" :tag="tag"></choice-list>
      <choice-list :list="list2" :title="title2" :more="morePolice" :tag="tagPolice"></choice-list>
      <choice-list :list="list3" :title="title3"></choice-list>
      <div class="height-fixed"></div>
    </div>
    <btn :btn="btn" :goLink="goLink" :clickDics="clickDics"></btn>
  </div>
</template>

<script>
  import { Countup, Cell } from 'vux'
  import ChoiceList from '../components/ChoiceList'
  import Btn from '../components/Btn'

  export default {
    components: {
      Countup,
      ChoiceList,
      Btn,
      Cell
    },
    data () {
      return {
        btn: '查询',
        length: 0,
        length1: 0,
        tag: true,
        tagPolice: true,
        goLink: '/ListCeil',
        title1: '选择分类',
        list1: [],
        title2: '选择辖区',
        list2: [],
        title3: '选择组别',
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
  .demo1 {
    font-family: '黑体','Source Sans Pro', Helvetica, Arial, sans-serif;
    font-size: 40px;
    /*color: #55A3E7;*/
    float: right;
    padding-right: 2%;
    position: absolute;
    z-index: 999;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(204, 204, 204, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 100%;
    text-align: center;
    margin-left: 50%;
    left: -50%;
    top: 0px;
    text-shadow:-1px -1px 0 #fff, 0px 0px 0 #666, 0px 0px 5px #666;
  }
  .choice-list{
    height: 100%;
  }
  .choice-box{
    height: 78%;
    overflow-y: scroll;
  }
  /*.position-cell-img{*/
    /*position: absolute;*/
    /*bottom:100px;*/
    /*right: 50px;*/
  /*}*/
</style>

