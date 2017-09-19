<template>
  <div class="detail-box">
    <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" @click="show(index)">
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <cell title="身份证号" :value="data.task.card"></cell>
    <cell title="入住宾馆" :value="data.task.company.name"></cell>
    <cell title="宾馆地址" :value="data.task.company.address"></cell>
    <cell title="上报电话" :value="data.task.user.mobile"></cell>
    <cell title="上报时间" :value="createTime"></cell>
    <cell title="完成时间" :value="doneTime"></cell>
    <cell title="值班民警" :value="data.rota[0].user.name"></cell>
    <cell title="操作人员" :value="data.task.doneUser.name"></cell>
    <div class="height-fixed"></div>
  </div>
</template>

<script>
  import { Previewer, TransferDom, Cell } from 'vux'
  import qs from 'qs'
  import { formatDate } from '../components/DateChange.js'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Cell
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
      }
    },
    data () {
      return {
        list: [],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        data: "",
        createTime: '',
        doneTime: ''
      }
    },
    created: function () {
      this.$http.post('/example/api/task/leaderDetail.json',qs.stringify({id: '',userId: ''})).then(response => {
          this.data = response.data
          this.createTime = formatDate(new Date(response.data.task.createTime), 'yyyy-MM-dd hh:mm:ss')
          this.doneTime = formatDate(new Date(response.data.task.doneTime), 'yyyy-MM-dd hh:mm:ss')
          this.list.push('{src: require('+response.data.task.photo+')}')
      })
    }
  }
</script>

<style lang="less">
  .previewer-demo-img{
    width: 130px;
    height: 180px;
    border: 2px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    position: relative;
    top: 0;
    left: -65px;
    margin:30px 0 20px 50%;
  }
  .detail-box{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .weui-cell{
      padding: 20px;
      font-size: 18px;
      &:before{
        top: 65px;
      }
      .weui-cell__ft{
        font-size: 16px;
        color: #000;
      }
    }
  }
</style>
