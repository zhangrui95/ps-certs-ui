<template>
  <div class="flex-page">
    <div class="header-box">已完成({{count}})</div>
    <list-view :list="listData"  @pullingUp="pullingUp" class="approve-list" ref="listView">
      <template scope="props">
        <div class="list-group">
          <div class="group-title" v-if="props.item.first">{{props.item.dateStr}}</div>
          <div class="list-item" @click="linkTo(`/Detail?id=${props.item.id}`)" >
            <span class="item-index">{{props.index > 8? props.index + 1: '0' + (props.index + 1)}}.</span>
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
      count: state => state.count,
      listData: state =>  {
        let arr = []
        return state.list.map(item => {
          item.dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
          if (arr.indexOf(item.dateStr) == -1) {
            item.first = true
            arr.push(item.dateStr)
          }
          return item
        })
      }
    })
  },
  created () {
    this.list({state: 2, offset: 0})
  },
  methods: {
    ...mapActions({
      list: 'list'
    }),
    pullingUp (data) {
      this.list({state: 2})
    },
    submit (val) {
      this.list({state: 2, offset: 0})
      this.$refs.listView.scrollTo(0)
    },
    linkTo (url) {
     this.$router.push(url)
    }
  }
}
</script>
