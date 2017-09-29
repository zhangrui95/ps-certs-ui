<template>
  <div class="flex-page">
    <div class="header-box">已完成({{count}})</div>
    <list-view url="api/studentCert.json" ref="listView" :list="listData" :params="params" :startY="scrollY" @update="update" @onScroll="onScroll">
      <div class="list-wrap">
        <div class="approve-list" v-for="group in groups" :key="group.dateStr">
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
    groups () {
      return this.listData
        .map(item => dateFormat(item.createTime, 'YYYY年MM月DD日'))
        .filter((dateStr, i, arr) =>  arr.indexOf(dateStr, i+1) == -1 )
        .map(dateStr => {
          return { dateStr, items: this.listData.filter(item => item.dateStr == dateStr)}
        })
    },
    scrollY: {
      get () { return this.$store.state.router.scrollY || 0 },
      set (val) { this.$store.commit('updateRouterState', { scrollY: val }) }
    },
    params: {
      get () { return this.$store.state.router.params || {} },
      set (val) { this.$store.commit('updateRouterState', { params: val }) }
    },
    listData: {
      get () { return this.$store.state.router.listData || [] },
      set (val) { this.$store.commit('updateRouterState', { listData: val }) }
    }
  },
  created () {
    this.params = { state: 2 }
  },
  methods: {
    update (data) {
      this.count = data.count
      this.listData = [ ...this.listData, ...data.list.map(item => {
        return {...item, dateStr:dateFormat(item.createTime, 'YYYY年MM月DD日')}
      })]
    },
    onScroll (y) {
      this.scrollY = y
    },
    submit (val) {
      this.params = {...this.params, name: val}
      this.listData = []
      this.$refs.listView.refresh()
    },
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>
