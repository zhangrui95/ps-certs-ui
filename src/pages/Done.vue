<template>
  <div class="flex-page">
    <div class="header-box">已完成({{count}})</div>
    <list-view url="/example/api/studentCert.json" ref="listView">
      <div class="list-wrap">
        <div class="list-group" v-for="(group, index) in listData" :key="index">
          <div class="group-title">
            {{group.dateStr}}
          </div>
          <router-link class="list-item" :to='"/Detail?id="+item.id'
            v-for="(item, itemIndex) in group.items" :key="item.id">
            <span class="item-index">{{itemIndex>8?itemIndex+1:'0'+(itemIndex+1)}}.</span>
            <span class="item-title">{{item.name}}</span>
            <badge v-if="item.result == -1" text="已退回"/>
          </router-link>
        </div>
      </div>
    </list-view>
    <filtrate-pop ref="filtrate" @submit="submit"/>
  </div>
</template>

<script>
import { dateFormat, Badge } from 'vux'
import ListView from '@/components/ListView'

import FiltratePop from '@/components/FiltratePop'
import { post } from '@/utils/ajax'

export default {
  components: {
    ListView, FiltratePop, Badge
  },
  data () {
    return {
      count: 0,
    }
  },
  computed: {
    listData () {
      let result = []
      let dateStrArr = []
      this.$store.state.listData.forEach(item => {
        let dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
        let iof = dateStrArr.indexOf(dateStr)
        if (iof == -1) {
          dateStrArr.push(dateStr)
          result.push({ dateStr: dateStr, items: [item] })
        } else {
          result[iof].items.push(item)
        }
      })
      return result
    }
  },
  created () {
    this.$store.commit('updateFiltrate', {
      type: this.$route.query.type,
      state: 2,
    })
    post('/example/api/studentCert.json').then(data => {
      this.count = data.count
    })
  },
  methods: {
    submit (val) {
      this.$store.commit('updateFiltrate', { name: val })
      this.$refs.listView.reload()
    },
  }
}
</script>
