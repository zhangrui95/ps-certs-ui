<template>
  <div class="flex-page approve">
    <top-nav :nav="nav">{{title}}</top-nav>
    <list-view url="api/studentCert.json" ref="listView" :list="listData" :params="params" :startY="scrollY" @update="update" @onScroll="onScroll">
      <div class="approve-list">
        <div class="list-item" v-for="(item, index) in listData" :key="index" @click="linkTo('/Undone?id='+item.id)">
          <div class="item-left">
            <div class="item-index">{{index>8?index+1:'0'+(index+1)}}.</div>
          </div>
          <div class="item-right">
            <div class="item-title">{{item.name}}</div>
            <div class="item-desc">{{item.createTime | dateFormat}}</div>
          </div>
        </div>
      </div>
    </list-view>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import TopNav from '@/components/TopNav'
import DragBox from '@/components/DragBox'
import { post } from '@/utils/ajax'

export default {
  components: {
    TopNav, ListView, DragBox
  },
  data () {
    return {
      title: '',
      nav: [],
    }
  },
  computed: {
    scrollY: {
      get () { return this.$store.state.router.scrollY || 0 },
      set (val) { this.$store.commit('updateRouterState', { scrollY: val }) }
    },
    params: {
      get () { return this.$store.state.router.params || {} },
      set (val) { this.$store.commit('updateRouterState', { params: val }) }
    },
    listData: {
      get () { return this.$store.state.router.listData || {} },
      set (val) { this.$store.commit('updateRouterState', { listData: val }) }
    }
  },
  created () {
    this.title = this.$route.query.type == 1? '身份证申请': '居住证明申请'
    this.params = { state: 0 }
    post('/example/api/studentCert/groupByState.json').then(data => {
      this.nav = [
        { text: '未办理', num: data.init }, 
        { text: '未通知', num: data.done, link: '/NoInform' },
        { text: '已完成', num: data.notify, link: '/Done' }
      ]
    })
  },
  methods: {
    update (data) {
      this.listData = [ ...this.listData, ...data.list]
    },
    onScroll (y) {
      this.scrollY = y
    },
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less">
  .approve{
    .approve-list{
      padding-top: 20px;
    }
    .top-nav{
      .vux-flexbox-item:first-child{
        .num{
          color: #6c6bbd;
        }
      }
    }
    .item-left{
      display: inline-block;
      line-height: 60px;
      vertical-align: top;
    }
    .item-right{
      display: inline-block;
    }
  }
</style>
