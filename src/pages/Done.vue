<template>
  <div class="flex-page">
    <div class="header-box">已完成({{listData.count}})</div>
    <list-view :list="listData.list" :total="listData.count" :currLen="listData.currLen" @pullingUp="pullingUp" class="approve-list" ref="listView">
      <template scope="props">
        <div class="list-group">
          <div class="list-item group-title" v-if="props.item.first">{{props.item.dateStr}}</div>
          <div class="list-item" @click="linkTo(`/Detail?id=${props.item.id}`)" >
            <span class="item-index">{{props.item.index > 8? props.item.index + 1: '0' + (props.item.index + 1)}}.</span>
            <span class="item-title">{{props.item.name}}</span>
            <badge v-if="props.item.result == -1" text="已退回"/>
          </div>
        </div>
      </template>
    </list-view>
    <filtrate-pop ref="filtrate" @submit="submit"/>
  </div>
</template>

<script>
import { Badge, dateFormat } from 'vux'
import { createNamespacedHelpers } from 'vuex'
import ListView from '../components/ListView'
import FiltratePop from '../components/FiltratePop'

const { mapActions, mapState } = createNamespacedHelpers('studentCert')

export default {
  components: {
    ListView, FiltratePop, Badge
  },
  computed: {
    ...mapState({
      listData: state => {
        const arr = []
        let idx = 0
        const listData = {count: state.list.count, currLen: state.list.currLen}
        listData.list = state.list.list.map(item => {
          item.dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
          if (arr.indexOf(item.dateStr) === -1) {
            item.first = true
            arr.push(item.dateStr)
            idx = 0
          }
          item.index = idx
          idx++
          return item
        })
        return listData
      }
    })
  },
  methods: {
    ...mapActions({
      list: 'list'
    }),
    pullingUp (pageParams) {
      this.list({state: 2, ...pageParams})
    },
    submit (val) {
      this.list({name: val, state: 2, offset: 0, max: 10})
//      this.$refs.listView.scrollTo(0)
    },
    linkTo (url) {
      this.$router.push(url)
    },
    groupBy (item) {
      return dateFormat(item.createTime, 'YYYY年MM月DD日')
    }
  }
}
</script>
