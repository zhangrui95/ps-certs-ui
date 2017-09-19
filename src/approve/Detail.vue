<template>
  <div class="page page-list student-page">
    <div class="header-box">
      <span>{{name}}</span>
      <span class="header-time">{{time}}</span>
    </div>
    <div class="center-box center-box-detail padding-min">
      <div class="choice-problem img-title">自拍正面照</div>
      <div class="img-box" id="self">
        <img class="previewer-demo-img img-size only-img" v-for="(item, index) in selfList" :src="item" width="100" @click="show(index)">
        <div v-transfer-dom>
          <previewer :list="selfList" ref="previewer" :options="options"></previewer>
        </div>
      </div>
      <div class="choice-problem img-title on-read">在读证明</div>
      <div class="img-box on-read" id="prove">
        <img class="previewer-demo-img img-size only-img" v-for="(item, index) in proveList" :src="item" width="100" @click="show(index)">
        <div v-transfer-dom>
          <previewer :list="proveList" ref="previewer" :options="options"></previewer>
        </div>
      </div>
      <div class="choice-problem img-title">学生证</div>
      <div class="img-box" id="student-card">
        <img class="previewer-demo-img img-size only-img" v-for="(item, index) in cardList" :src="item" width="100" @click="show(index)">
        <div v-transfer-dom>
          <previewer :list="cardList" ref="previewer" :options="options"></previewer>
        </div>
      </div>
      <div class="choice-problem img-title">联系方式</div>
      <div class="constent-box phone-blue" id="phone" href="">{{mobile}}</div>
      <div v-if="result==-1">
        <div class="choice-problem img-title">退回原因</div>
        <div class="constent-box">{{remark}}</div>
      </div>
      <div class="height-fixed-min"></div>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  import { formatDate } from '../components/DateChange.js'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data () {
      return {
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
        selfList: [],
        proveList: [],
        cardList: [],
        mobile: '',
        result: '',
        remark: '',
        name: '',
        time: ''
      }
    },
    created: function () {
      this.$http.post('/example/api/studentCert/detail.json').then(response => {
//        console.log(response.data.data.photos)
        let photos = response.data.data.photos
        for(let i in response.data.data.photos){
          if(photos[i].type == 1){
            this.selfList.push('api/studentCert/photo?id='+photos[i].id)
          }else if(photos[i].type == 3){
            this.proveList.push('api/studentCert/photo?id='+photos[i].id)
          }else if(photos[i].type == 2){
            this.cardList.push('api/studentCert/photo?id='+photos[i].id)
          }
        }
        this.name = response.data.data.name
        this.time = formatDate(new Date(response.data.data.createTime), 'yyyy-MM-dd hh:mm:ss')
        this.mobile = response.data.data.mobile
        this.result = response.data.data.result
        this.remark = response.data.data.remark
      })
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
      }
    }
  }
</script>

