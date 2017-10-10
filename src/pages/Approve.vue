<template>
  <div class="flex-page approve">
    <top-nav :nav="stat">{{title}}</top-nav>
    <list-view class="approve-list" :list="listData.list" :total="listData.count" :currLen="listData.currLen" @pullingUp="pullingUp">
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
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ListView from '../components/ListView'
import TopNav from '../components/TopNav'

const { mapActions, mapState } = createNamespacedHelpers('studentCert')

export default {
  components: {
    TopNav, ListView
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
    })
  },
  created () {
    this.title = this.$route.query.type === 1 ? '身份证申请' : '居住证明申请'
    this.groupByState()
  },
  methods: {
    ...mapActions({
      list: 'list',
      groupByState: 'groupByState'
    }),
    pullingUp (pageParams) {
      this.list({state: 0, ...pageParams})
    },
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less">
  .approve{
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
