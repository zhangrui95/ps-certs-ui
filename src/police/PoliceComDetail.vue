<template>
  <div class="detail-box police-detail-box">
    <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" @click="show(index)">
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <cell title="身份证号" :value="data.card"></cell>
    <cell title="手机号码" :value="data.mobile"></cell>
    <cell title="企业名称" :value="data.company.name"></cell>
    <cell title="企业地址" :value="data.company.address"></cell>
    <cell title="上报电话" :value="data.user.mobile"></cell>
    <cell title="上报时间" :value="createTime"></cell>
    <cell v-if="data.state == 1" title="完成时间" :value="doneTime"></cell>
    <div class="height-fixed"></div>
    <btn v-if="data.state == 0" :btn="btn" :goLink="goLink" :clickDics="clickDics"></btn>
  </div>
</template>

<script>
  import { Previewer, TransferDom, Cell } from 'vux'
  import qs from 'qs'
  import { formatDate } from '../components/DateChange.js'
  import Btn from '../components/Btn'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Cell,
      Btn
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
        doneTime: '',
        btn: '核查完毕',
        goLink: '',
      }
    },
    created: function () {
      this.$http.post('/example/api/employee/detail.json',qs.stringify({id: '',userId: ''})).then(response => {
        this.data = response.data
        console.log(this.data)
        this.createTime = formatDate(new Date(response.data.createTime), 'yyyy-MM-dd hh:mm:ss')
        this.doneTime = formatDate(new Date(response.data.doneTime), 'yyyy-MM-dd hh:mm:ss')
        this.list.push('{src: require('+response.data.photo+')}')
      })
    },
    methods: {
      clickDics: function () {
        this.$http.post('/example/api/employee/doneTask.json', qs.stringify({userid:'',id:''})
        ).then(function (data) {
          window.history.go(-1);
        })
      }
    }
  }
</script>

<style lang="less">
  .police-detail-box{
    height: 89%;
  }
</style>
