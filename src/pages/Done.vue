<template>
  <div class="flex-page">
    <div class="header-box">已完成({{count}})</div>
    <list-view url="api/studentCert.json" :list="listData" :params="params" :startY="scrollY" @update="update" ref="listView">
      <div class="list-wrap">
        <div class="list-group" v-for="group in groups" :key="group.dateStr">
          <div class="group-title">
            {{group.dateStr}}
          </div>
          <div v-for="(item, index) in group.items" :key="item.id"
            @click="linkTo(`/Detail?id=${item.id}`)" class="list-item">
            <span class="item-index">{{index > 8? index + 1: '0' + (index + 1)}}.</span>
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
import { Badge, dateFormat } from 'vux'
import ListView from '@/components/ListView'
import FiltratePop from '@/components/FiltratePop'
import service from '../service/studentCert'

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
    groups () {
      return this.listData
        .map(item => dateFormat(item.createTime, 'YYYY年MM月DD日'))
        .filter((dateStr, i, arr) =>  arr.indexOf(dateStr, i+1) == -1 )
        .map(dateStr => {
          return { dateStr, items: this.listData.filter(item => item.dateStr == dateStr)}
        })
    }
  },
  watch : {
    '$store.state.router' () {
      this.scrollY = this.$store.state.router.scrollY
      this.params = this.$store.state.router.params
      this.listData = this.$store.state.router.listData
    }
  },
  created () {
    this.params = { state: 2 }
    const data = service.list(this)
    console.log('post2 data', data)
//    this.count = data.count
  },
  methods: {
    update (data) {
      this.listData = [ ...this.listData, ...data.list.map(item => {
        return {...item, dateStr:dateFormat(item.createTime, 'YYYY年MM月DD日')}
      })]
    },
    submit (val) {
      this.params = {...this.params, name: val}
      this.listData = []
      this.$refs.listView.refresh()
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
