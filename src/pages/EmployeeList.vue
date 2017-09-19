<template>
  <div class="page">
    <div class="fire-header blue-header">
      <div class="fire-company-name" id="head-name" style="text-align:left">{{companyNews.name}}</div>
      <marquee class="fire-company-name" id="head-name-scroll" style="display: none;"></marquee>
      <span class="num-right num-right-top">
        <span class="type-red">{{undone}}</span>/<span style="color:#fff;">{{allNumber}}</span>
      </span>
    </div>
    <div class="weui-media-box" style="padding:10px 15px;">
      <p style="color:gray">地址:<span id="head-addr">{{companyNews.address}}</span></p>
    </div>
    <div class="list-box">
      <router-link :to="link">
        <div class="check-border" data-id="detail" data-tid="key1" v-for="(item, i) in list">
          <img src="../assets/list-left.jpg" class="border-right-img-mall">
          <div class="overflow-ellipsis item-width">{{item.card}}</div>
          <div class="time-data">
            <img src="../assets/icon-time.jpg" class="position-time" style="top:50px;left:25px;"/>
            <span>{{time[i]}}</span>
          </div>
          <span class="num-right" v-if="item.state!=1"><span class="weui-badge" style="box-shadow: none;padding: 2px 6px;">未核查</span></span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../components/DateChange.js'

  export default {
    data () {
      return {
        time: [],
        list: [],
        companyNews: {},
        link: '/Detail/1',
        undone: 0,
        allNumber: 0
      }
    },
    methods: {

    },
    created: function () {
      this.$http.post('/example/api/task/leader.json').then(response => {
        for (let i in response.data.list) {
          this.list.push(response.data.list[i])
          this.time.push(formatDate(new Date(response.data.list[i].createTime), 'yyyy-MM-dd hh:mm:ss'))
        }
        this.companyNews = response.data.company
        this.undone = response.data.undo
        this.allNumber = response.data.undo + response.data.done
      })
    }
  }
</script>

<style lang="less">
  .num-right-top{
    position: absolute;
    top: 0;
    right: 12px;
    line-height: 50px;
    font-size: 14px;
  }
</style>
