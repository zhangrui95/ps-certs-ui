<template>
  <div>
    <top-nav :nav="nav">{{title}}</top-nav>
  </div>
</template>

<script>
import { Cell } from 'vux'
import TopNav from '@/components/TopNav'
import { post } from '@/utils/ajax'

export default {
  components: {
    Cell,
    TopNav,
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    const type = 1
    console.log(this.$store.state)
    this.title = type == 1? '身份证申请': '居住证明申请'

    post('/api/firePlan/info.json').then(data => {
      this.nav = [{
        link: 'fire_list?state=0',
        num: 13,
        text: '未检查',
        clsName: 'active',
      },{
        link: 'fire_list?state=1',
        num: 8,
        text: '已检查'
      },{
        num: 19,
        text: '总次数'
      }]
    })
  }
}
</script>