<template>
  <div class="page">
    <search-top></search-top>
    <div class="search-results result-name-size" id="name">
      <span class="result-name overflow-name">{{company.name}}</span>
      <span class="result-num">
        <span class="type-red">{{undo}}</span>/<span class="type-blue">{{num}}</span>
      </span>
    </div>
    <div class="list-box">
      <router-link  :to="link" v-for="(lis, i) in list">
        <div class="check-border" data-id="detail" data-tid="key1">
          <span class="red-circle"></span>
          <div class="overflow-ellipsis item-width">{{lis.card}}</div>
          <div class="time-data">
            <img src="../assets/icon-time.jpg" class="position-time" style="top:50px;left:25px;"/>
            <span>{{time[i]}}</span>
          </div>
        </div>
      </router-link>
      <load-more :tip="more?'正在加载':'暂无更多数据'" :show-loading="more"></load-more>
    </div>
  </div>
</template>

<script>
  import { LoadMore } from 'vux'
  import SearchTop from '../components/SearchTop'
  import { formatDate } from '../components/DateChange.js'

  export default {
    components: {
      SearchTop,
      LoadMore
    },
    data () {
      return {
        list: [],
        more: true,
        time: [],
        company: {},
        undo: 0,
        num: 0,
        link: '/EmployeeDetail/1'
      }
    },
    created: function () {
      this.$http.post('/example/api/employee/listByCompany.json').then(response => {
        console.log(response.data)
        for(let i in response.data.list){
          this.list.push(response.data.list[i])
          this.time.push(formatDate(new Date(response.data.list[i].createTime), 'yyyy-MM-dd hh:mm:ss'))
        }
        this.company = response.data.company
        this.undo = response.data.undo
        this.num = response.data.undo + response.data.done
      })
    },
    methods: {

    }
  }
</script>
