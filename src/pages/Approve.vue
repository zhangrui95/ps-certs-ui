<template>
  <div class="flex-page">
    <top-nav :nav="nav">{{title}}</top-nav>
    <list-view url="/example/api/studentCert.json">
      <div class="list-wrap">
        <router-link class="list-item" :to='"/Undone?id="+item.id' v-for="(item, index) in listData" :key="index">
          <div class="item-left">
            <div class="item-index">{{index>=10?index:'0'+(index+1)}}.</div>
          </div>
          <div class="item-right">
            <div class="item-title">{{item.name}}</div>
            <div class="item-desc">{{item.createTime | dateFormat}}</div>
          </div>    
        </router-link>
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
      nav: ''
    }
  },
  computed: {
    listData () {
      return this.$store.state.listData
    }
  },
  created () {
    this.title = this.$route.query.type == 1? '身份证申请': '居住证明申请'
    this.$store.commit('updateFiltrate', {
      type: this.$route.query.type,
      state: 0,
    })
    post('/example/api/studentCert/groupByState.json').then(data => {
      this.nav = [{
        num: data.init,
        text: '未办理',
      },{
        link: '/NoInform',
        num: data.done,
        text: '未通知'
      },{
        link: '/Done',
        num: data.notify,
        text: '已完成'
      }]
    })
  }
}
</script>
<style scoped lang="less">
  .top-nav{
    .vux-flexbox-item:first-child{
      .num{
        color: #6c6bbd;
      }
    }
  }
  .list-wrap{
    padding-top: 20px;
  }
  .item-left{
    display: inline-block;
    line-height: 60px;
    vertical-align: top;
  }
  .item-right{
    display: inline-block;
  }
</style>
