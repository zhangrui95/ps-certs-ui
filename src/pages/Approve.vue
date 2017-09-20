<template>
  <div>
    <top-nav :nav="nav">{{title}}</top-nav>
    <list-view url="/example/api/studentCert.json" :style="{paddingTop: '20px'}">
      <router-link :to='"/Undone?id="+item.id' v-for="(item, index) in listData" :key="index">
        <div class="list">
          <div class="number">{{index>=10?index:'0'+(index+1)}}</div>
          <div class="list-news">
            <div class="name-color">{{item.name}}</div>
            <div class="time-color">{{item.createTime | dateFormat}}</div>
          </div>
        </div>
      </router-link>
    </list-view>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import TopNav from '@/components/TopNav'
import { post } from '@/utils/ajax'

export default {
  components: {
    TopNav, ListView
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
        text: '未检查',
        active: true
      }, {
        link: 'fire_list?state=1',
        num: data.done,
        text: '已检查'
      }, {
        link: 'fire_list?state=1',
        num: data.notify,
        text: '总次数'
      }]
    })
  }
}
</script>
