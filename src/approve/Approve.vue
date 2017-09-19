<template>
  <div class="page page-list student-page">
    <div class="nocard-title rent-head-height">
      <div class="fire-header-left">居住证明申请</div>
      <div class="white-position">
        <div class="fire-num-box">
          <dl class="num-center">
            <dt class="purple-font">{{undone}}</dt>
            <dd>未办理</dd>
          </dl>
        </div>
        <div class="fire-num-box rent-num" @click="doneClick">
          <dl class="num-center">
            <dt class="gray-font">{{done}}</dt>
            <dd>未通知</dd>
          </dl>
        </div>
        <div class="fire-num-box fire-num-box-border rent-num" @click="goDone">
          <dl class="num-center">
            <dt class="gray-font">{{notify}}</dt>
            <dd>已完成</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="list-box center-box center-height">
      <div class="bg-box">
        <router-link :to='"/Undone/"+lis.id' v-for="(lis, index) in list">
          <div class="list">
            <div class="number"><span v-if="(index+1)<10">0</span>{{index + 1}}</div>
            <div class="list-news">
              <div class="name-color">{{lis.name}}</div>
              <div class="time-color">{{time[index]}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../components/DateChange.js'
  export default {
    components: {
    },
    data () {
      return {
        undone: 0,
        notify: 0,
        done: 0,
        list: '',
        time: []
      }
    },
    created: function () {
      this.$http.post('/example/api/studentCert/groupByState.json').then(response => {
        this.undone = response.data.init
        this.done = response.data.done
        this.notify = response.data.notify
      })
      this.$http.post('/example/api/studentCert.json').then(response => {
        this.list = response.data.list
        for(let i in response.data.list){
          this.time.push(formatDate(new Date(response.data.list[i].createTime), 'yyyy-MM-dd hh:mm:ss'))
        }
      })
    },
    methods: {
      doneClick () {
        this.$router.push({path: '/NoInform'})
      },
      goDone () {
        this.$router.push({path: '/Done'})
      }
    }
  }
</script>

