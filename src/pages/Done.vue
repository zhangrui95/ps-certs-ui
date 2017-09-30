<template>
  <div class="flex-page">
    <div class="header-box">已完成({{count}})</div>
    <div class="approve-list">
      <list-view url="api/studentCert.json" :list="listData" :params="params" :startY="scrollY" @update="update" ref="listView">
        <template scope="props">
          <div @click="linkTo(`/Detail?id=${props.item.id}`)" class="list-item">
            <span class="item-index">{{props.index > 8? props.index + 1: '0' + (props.index + 1)}}.</span>
            <span class="item-title">{{props.item.name}}</span>
            <badge v-if="props.item.result == -1" text="已退回"/>
          </div>
        </template>
      </list-view>
    </div>
    <filtrate-pop ref="filtrate" @submit="submit"/>
  </div>
</template>

<script>
import { Badge, dateFormat } from 'vux'
import { createNamespacedHelpers } from 'vuex'
import ListView from '../components/ListView2'
import FiltratePop from '../components/FiltratePop'

const { mapActions, mapState } = createNamespacedHelpers('studentCert')

export default {
  components: {
    ListView, FiltratePop, Badge
  },
  data () {
    return {
      count: 0,
      scrollY: 0,
      params: {}
    }
  },
  computed: {
    ...mapState({
      listData: state => state.list
    }),
    groups () {
      let map = this.listData.reduce((target, item) => {
        const dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
        if(target.filter(v => v.dateStr === dateStr).length === 0){

        }else{

        }
        return target
      }, [])
      console.log('map', map)
      return this.listData
        .map(item => dateFormat(item.createTime, 'YYYY年MM月DD日'))
        .filter((dateStr, i, arr) => arr.indexOf(dateStr, i + 1) === -1)
        .map(dateStr => {
          return {dateStr, items: this.listData.filter(item => item.dateStr === dateStr)}
        })
    }
  },
//  watch : {
//    '$store.state.router' () {
//      this.scrollY = this.$store.state.router.scrollY
//      this.params = this.$store.state.router.params
//      this.listData = this.$store.state.router.listData
//    }
//  },
  created () {
//    this.params = { state: 2 }
    this.list({state: 2})
  },
  methods: {
    ...mapActions({
      list: 'list'
    }),
    update (data) {
//      this.count = data.count
//      this.listData = [ ...this.listData, ...data.list.map(item => {
//        return {...item, dateStr:dateFormat(item.createTime, 'YYYY年MM月DD日')}
//      })]
    },
    submit (val) {
//      this.params = {...this.params, name: val}
//      this.listData = []
//      this.$refs.listView.refresh()
    },
    commitState () {
//      this.$store.commit('updateRouterState', {
//        params: this.params,
//        listData: this.listData,
//        scrollY: this.$refs.listView.getScrollY()
//      })
    },
    linkTo (url) {
//      this.commitState()
//      this.$router.push(url)
    }
  }
}
</script>
