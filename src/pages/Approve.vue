<template>
  <div class="flex-page">
    <top-nav :nav="nav">{{title}}</top-nav>
    <list-view url="/example/api/studentCert.json">
      <div v-for="(item, index) in listData" :key="index" style="height:100px;">{{item.name}}</div>
    </list-view>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import ListView from '@/components/ListView'
import { post } from '@/utils/ajax'

export default {
  components: {
<<<<<<< HEAD
    TopNav, ListView
=======
    Cell,
    TopNav
>>>>>>> ad7895981ac500195e168633b7408710362eb531
  },
  data () {
    return {
      nav: [],
      title: '',
    }
  },
  computed: {
    listData () {
      return this.$store.state.vux.listData
    },
  },
  created () {
    this.title = this.$route.query.type == 1? '身份证申请': '居住证明申请'
    post('/example/api/studentCert/groupByState.json').then(data => {
      this.nav = [{
        link: 'fire_list?state=0',
        num: data.init,
        text: '未检查',
        clsName: 'active'
      },{
        link: 'fire_list?state=1',
        num: data.done,
        text: '已检查'
      },{
        num: data.notify,
        text: '总次数'
      }]
    })
  },
  methods: {

  }

}
</script>
