<template>
  <div class="flex-page">
    <div class="header-box">已完成({{count}})</div>
    <list-view url="/example/api/studentCert.json" :list="listData" :params="params" :startY="scrollY" @update="update" ref="listView">
      <div class="list-wrap">
        <div class="list-group" v-for="(group, index) in computedListData" :key="index">
          <div class="group-title">
            {{group.dateStr}}
          </div>
          <div class="list-item" @click="linkTo(`/Detail?id=${item.id}`)"
            v-for="(item, itemIndex) in group.items" :key="item.id">
            <span class="item-index">{{itemIndex>8?itemIndex+1:'0'+(itemIndex+1)}}.</span>
            <span class="item-title">{{item.name}}</span>
            <badge v-if="item.result == -1" text="已退回"/>
          </div>
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
      scrollY: 0,
      params: {},
      listData: []
    }
  },
  computed: {
    computedListData () {
      let result = []
      let dateStrArr = []
      this.listData.forEach(item => {
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
  watch : {
    '$store.state.router' () {
      if (this.$store.state.router.isReverse) {
        this.scrollY = this.$store.state.router.scrollY
        this.params = this.$store.state.router.params
        this.listData = this.$store.state.router.listData
      }
    }
  },
  created () {
    this.params = {
      state: 2,
    }
    post('/example/api/studentCert.json').then(data => {
      this.count = data.count
    })
  },
  methods: {
    submit (val) {
      this.params = {...this.params, name: val}
      this.listData = []
      this.$refs.listView.refresh()
    },
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
