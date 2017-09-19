<template>
  <div class="page nocard-box">
    <div class="position-choice" style="background:#55a3e7;" @click="PopShow()">
      <img src="../assets/Iconset.png" class="choice-img">
    </div>
    <pop-choice :popShow="popShow" :choice="choice"></pop-choice>
    <tab :line-width=2 active-color='#55a3e7' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item.tab}}<span v-if="item.num!=null">({{item.num}})</span></tab-item>
    </tab>
    <swiper v-model="index" height="100%" :show-dots="false">
      <swiper-item v-for="(item, index) in list2" :key="index">
        <div class="weui-media-box" v-if="item.type===0">
          <p class="weui-media-box__desc">{{item.title}}：<span>{{number}}</span></p>
        </div>
        <div class="weui-media-box" v-else>
          <p class="weui-media-box__desc"><span>{{item.title1}}：{{number1}}</span><span style="margin-left: 20px;">{{item.title2}}：{{number2}}</span></p>
        </div>
        <div class="list-box" v-if="item.type===0">
          <router-link v-for="(list, i) in item.list" :to="item.link">
            <div class="check-border" data-id="detail" data-tid="key1">
            <img src="../assets/list-left.jpg" class="border-right-img-mall">
            <div class="overflow-ellipsis item-width" >{{list.company}}</div>
            <div class="time-data">
              <img src="../assets/icon-time.jpg" class="position-time" style="top:50px;left:25px;"/>
              <span>{{item.time[i]}}</span>
            </div>
            <span class="num-right"><span class="weui-badge" style="box-shadow: none;padding: 2px 6px;" v-if="list.state!=1">未核查</span></span>
            </div>
          </router-link>
          <load-more :tip="more?'正在加载':'暂无更多数据'" :show-loading="more"></load-more>
        </div>
        <div class="list-box" v-if="item.type!=0">
          <router-link v-for="(list, i) in item.list" :to="item.link">
            <div class="check-border" data-id="detail" data-tid="key1">
              <img src="../assets/list-left.jpg" class="border-right-img-mall">
              <div class="overflow-ellipsis item-width">{{list.item.name}}</div>
              <div class="police-data">
                <span>辖区：{{list.item.police.name}}</span>
              </div>
              <span class="num-right"><span class="type-red">{{list.nums.num - list.nums.done}}</span> / <span class="type-blue">{{list.nums.num}}</span></span>
            </div>
          </router-link>
          <load-more :tip="more?'正在加载':'暂无更多数据'" :show-loading="more"></load-more>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem, Scroller, LoadMore } from 'vux'
  import { formatDate } from '../components/DateChange.js'
  import PopChoice from '../components/PopChoice'
  let List = []
  let List1 = []
  let news = []
  let time = []
  let num = 0


  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller,
      LoadMore,
      PopChoice
    },
    data () {
      return {
        length: 0,
        bottomCount: 20,
        onFetching: false,
        popShow: false,
        choice: true,
        list2: [{
          type: 0,
          tab: '核查统计',
          num: 0,
          title: '全部人数',
          list: List,
          news: news,
          time: time,
          link: '/Detail/1'
        }, {
          type: 1,
          tab: '企业统计',
          title1: '全部企业',
          title2: '全部人数',
          list: List1,
          link: '/EmployeeList/1'
        }],
        demo2: '核查统计',
        index: 0,
        number: 0,
        number1: 0,
        number2: 0,
        more: true,
        tag: true
      }
    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.bottomCount += 10
            this.onFetching = false
          }, 2000)
        }
      },
      PopShow () {
        this.popShow = this.tag
        console.log(this.popShow)
      }
    },
    created: function () {
      this.$http.post('/example/api/task/leader.json').then(response => {
        for (let i in response.data.list) {
          List.push(response.data.list[i])
          time.push(formatDate(new Date(response.data.list[i].createTime), 'yyyy-MM-dd hh:mm:ss'))
        }
        this.length = response.data.list.length
        this.number = response.data.undo + response.data.done
        num = response.data.undo
        this.list2[0].num = num
      })
      this.$http.post('/example/api/task/companies.json').then(response => {
        for (let i in response.data.list) {
          List1.push(response.data.list[i])
        }
        this.number1 = response.data.total
        this.number2 = response.data.nums.num
      })
    }
  }
</script>

