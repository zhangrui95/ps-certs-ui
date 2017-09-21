<template>
  <div class="flex-page">
    <drag-box class="drag-box">
    </drag-box>
    <top-nav :nav="nav">{{title}}</top-nav>
    <list-view url="/example/api/studentCert.json">
      <div :style="{paddingTop: '20px'}">
        <router-link :to='"/Undone?id="+item.id' v-for="(item, index) in listData" :key="index">
          <div class="list">
            <div class="number">{{index>=10?index:'0'+(index+1)}}</div>
            <div class="list-news">
              <div class="name-color">{{item.name}}</div>
              <div class="time-color">{{item.createTime | dateFormat}}</div>
            </div>
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
      return this.$store.state.vux.listData
    }
  },
  created () {
    this.title = this.$route.query.type == 1? '身份证申请': '居住证明申请'
    post('/example/api/studentCert/groupByState.json').then(data => {
      this.nav = [{
        num: data.init,
        text: '未办理',
        active: true,
      },{
        link: '/NoInform',
        num: data.done,
        text: '未通知'
      },{
        link: 'fire_list?state=1',
        num: data.notify,
        text: '已完成'
      }]
    })
  }
}
</script>
<style lang="less">
  .drag-box{
    position: fixed;
    top: 70%;
    left: 60%;
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 50%;
    z-index: 100;
  }
</style>
