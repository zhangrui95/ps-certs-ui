<template>
  <div class="page">
    <search-top></search-top>
    <div class="search-results" id="search-results">
      <span class="result-name">查询结果</span>
      <span class="result-news"></span>
      <span class="result-num">
        <span class="type-red">{{undo}}</span> / <span class="type-blue">{{num}}</span>
      </span>
    </div>
    <div class="list-box">
      <router-link  :to="link" v-for="(lis, i) in list">
        <div class="check-border" data-id="detail" data-tid="key1">
          <img src="../assets/list-left.jpg" class="border-right-img-mall">
          <div class="overflow-ellipsis item-width">{{lis.item.name}}</div>
          <div class="police-data">
            <span>{{lis.item.type.name}}、{{lis.item.police.name}}</span>
          </div>
          <span class="num-right"><span class="type-red">{{lis.nums.num - lis.nums.done}}</span> / <span class="type-blue">{{lis.nums.num}}</span></span>
        </div>
      </router-link>
      <load-more :tip="more?'正在加载':'暂无更多数据'" :show-loading="more"></load-more>
    </div>
  </div>
</template>

<script>
  import { Scroller, LoadMore } from 'vux'
  import SearchTop from '../components/SearchTop'

  export default {
    components: {
      SearchTop,
      Scroller,
      LoadMore
    },
    data () {
      return {
        list: [],
        more: true,
        undo: 0,
        num: 0,
        link: '/ComEmployeeList/1'
      }
    },
    created: function () {
      this.$http.post('/example/api/employee/companies.json').then(response => {
          console.log(response.data)
          for(let i in response.data.list){
              this.list.push(response.data.list[i])
          }
          this.num = response.data.nums.num
          this.undo = response.data.nums.undo
      })
    },
    methods: {

    }
  }
</script>
