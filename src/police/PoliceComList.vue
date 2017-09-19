<template>
  <div class="page">
    <tab :line-width=2 active-color='#55a3e7' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item.tab}}<span v-if="item.type===0">({{undo}})</span><span v-else="item.type===1">({{done}})</span></tab-item>
    </tab>
    <swiper v-model="index" height="100%" :show-dots="false">
      <swiper-item v-for="(item, index) in list2" :key="index">
        <div class="list-box-police" v-if="item.type===0">
          <router-link v-for="(list, i) in item.list" :to="item.link">
            <div class="check-border" data-id="detail" data-tid="key1" v-if="list.state===0">
              <img src="../assets/list-left.jpg" class="border-right-img-mall">
              <div class="overflow-ellipsis item-width" >{{list.CompanyName}}</div>
              <div class="time-data">
                <img src="../assets/icon-time.jpg" class="position-time" style="top:50px;left:25px;"/>
                <span>{{item.time[i]}}</span>
                <img class="icon-go" src="../assets/icon-go.jpg">
              </div>
            </div>
          </router-link>
          <load-more :tip="more?'正在加载':'暂无更多数据'" :show-loading="more"></load-more>
        </div>
        <div class="list-box-police" v-if="item.type!=0">
          <router-link v-for="(list, i) in item.list" :to="item.link">
            <div class="check-border" data-id="detail" data-tid="key1" v-if="list.state===1">
              <img src="../assets/list-left.jpg" class="border-right-img-mall">
              <div class="overflow-ellipsis item-width">{{list.CompanyName}}</div>
              <div class="time-data">
                <img src="../assets/icon-time.jpg" class="position-time" style="top:50px;left:25px;"/>
                <span>{{item.time[i]}}</span>
                <img class="icon-go" src="../assets/icon-go.jpg">
              </div>
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
  let List = []
  let news = []
  let time = []
  let number = ""

  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller,
      LoadMore
    },
    data () {
      return {
        length: 0,
        bottomCount: 20,
        onFetching: false,
        list2: [{
          type: 0,
          tab: '未核查',
          list: List,
          news: news,
          time: time,
          link: '/PoliceComDetail/1'
        }, {
          type: 1,
          tab: '已核查',
          list: List,
          time: time,
          link: '/PoliceComDetail/1'
        }],
        demo2: '未核查',
        index: 0,
        more: true,
        done: 0,
        undo: 0
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
      }
    },
    created: function () {
      this.$http.post('/example/api/employee.json').then(response => {
        for (let i in response.data.list) {
          List.push(response.data.list[i])
          time.push(formatDate(new Date(response.data.list[i].createTime), 'yyyy-MM-dd hh:mm:ss'))
        }
        this.length = response.data.list.length
        this.done = response.data.done
        this.undo = response.data.undo
      })
    }
  }
</script>

<style>
  .list-box-police{
    height: 93%;
    overflow-y: scroll;
  }
</style>

