<template>
  <div class="flex-page approve">
    <top-nav :nav="stat">{{title}}</top-nav>
      <div class="approve-list">
        <list-view url="api/studentCert.json" ref="listView" :list="listData" :params="params" :startY="scrollY" @update="update" @onScroll="onScroll">
          <template scope="props">
            <div class="list-item"  @click="linkTo('/Undone?id='+props.item.id)">
              <div class="item-left">
                <div class="item-index">{{props.index>8?props.index+1:'0'+(props.index+1)}}.</div>
              </div>
              <div class="item-right">
                <div class="item-title">{{props.item.name}}</div>
                <div class="item-desc">{{props.item.createTime | dateFormat}}</div>
              </div>
            </div>
          </template>
        </list-view>
      </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ListView from '../components/ListView2'
import TopNav from '@/components/TopNav'
import DragBox from '@/components/DragBox'

const { mapActions, mapState } = createNamespacedHelpers('studentCert')

export default {
  components: {
    TopNav, ListView, DragBox
  },
  data () {
    return {
      title: ''
    }
  },
  computed: {
    ...mapState({
      listData: state => state.list,
      stat: state => state.stat
    }),
    scrollY: {
      get () { return this.$store.state.router.scrollY || 0 },
      set (val) { this.$store.commit('updateRouterState', { scrollY: val }) }
    },
    params: {
      get () { return this.$store.state.router.params || {} },
      set (val) { this.$store.commit('updateRouterState', { params: val }) }
    }
  },
  created () {
    this.title = this.$route.query.type === 1 ? '身份证申请' : '居住证明申请'
//    this.params = { state: 0 }
    this.list({state: 0})
    this.groupByState()
  },
  methods: {
    ...mapActions({
      list: 'list',
      groupByState: 'groupByState'
    }),
    update (data) {
//      this.listData = [ ...this.listData, ...data.list]
    },
    onScroll (y) {
      this.scrollY = y
    },
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less">
  .approve{
    .approve-list{
      padding-top: 20px;
    }
    .top-nav{
      .vux-flexbox-item:first-child{
        .num{
          color: #6c6bbd;
        }
      }
      .vux-flexbox-item{
        .num{
          color: #666;
        }
      }
    }
    .item-left{
      display: inline-block;
      line-height: 60px;
      vertical-align: top;
    }
    .item-right{
      display: inline-block;
    }
  }
</style>
