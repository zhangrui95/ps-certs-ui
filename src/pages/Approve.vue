<template>
  <div class="flex-page approve">
    <top-nav :nav="nav" @navClick="commitState">{{title}}</top-nav>
    <list-view url="/example/api/studentCert.json" :list="listData" :params="params" :startY="scrollY" @update="update" ref="listView">
      <div class="list-wrap">
        <div class="list-item" v-for="(item, index) in listData" :key="index" @click="linkTo(`/Undone?id=${item.id}`)">
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
      nav: '',
      scrollY: this.$store.state.router.scrollY || 0,
      params: this.$store.state.router.params || {},
      listData: this.$store.state.router.listData || []
    }
  },
  created () {
    this.title = this.$route.query.type == 1? '身份证申请': '居住证明申请'
    this.params = {
      state: 0,
    }
    post('/example/api/studentCert/groupByState.json').then(data => {
      this.nav = [{
        num: data.init,
        text: '未办理',
      },{
        link: `/NoInform`,
        num: data.done,
        text: '未通知'
      },{
        link: `/Done`,
        num: data.notify,
        text: '已完成'
      }]
    })
  },
  methods: {
    update (data) {
      this.listData = [ ...this.listData, ...data.list]
    },
    commitState () {
      this.$store.commit('updateRouterState', { 
        params: this.params,
        listData: this.listData,
        scrollY: this.$refs.listView.getScrollY() 
      })
    },
    linkTo (url) {
      this.commitState()
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less">
  .approve{
    .list-wrap{
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
