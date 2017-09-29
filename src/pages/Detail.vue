<template>
  <div class="flex-page detail">
    <div class="header-box">
      <span>{{name}}</span>
      <span>{{createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
    </div>
    <div class="center-box">
      <div class="cell" v-for="(group, index) in lists" :key="index">
        <div class="cell-title">{{group.name}}</div>
        <div class="cell-content previewer-box">
          <span v-for="(item, itemIndex) in group.list" :key="itemIndex">
            <img class="previewer-img" :src="item.src" @click="show(index, itemIndex)">
          </span>
        </div>
      </div>
      <div class="cell">
        <div class="cell-title">联系方式</div>
        <div class="cell-content">
          <a class="text phone-blue" href="tel:13012345678">{{mobile}}</a>
        </div>
      </div>
      <div class="cell" v-if="back">
        <div class="cell-title">退回原因</div>
        <div class="cell-content">
          <span class="text">{{remark}}</span>
        </div>
      </div>
    </div>
    <previewer v-for="(group, index) in lists" :key="index" :list="group.list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
import { Previewer } from 'vux'
import { post } from '@/utils/ajax'

export default {
  components: {
    Previewer
  },
  data () {
    return {
      name: '',
      createTime: '',
      back: false,
      remark: '',
      mobile: '',
      lists: [],
      showList: 0,
      options: {}
    }
  },
  methods: {
    show (index, itemIndex) {
      this.showList = index
      this.$refs.previewer[index].show(itemIndex)
    }
  },
  created () {
    post('api/studentCert/detail.json').then(data => {
        this.name = data.data.name
        this.createTime = data.data.createTime
        this.back = data.data.result === -1
        this.remark = data.data.remark
        this.mobile = data.data.mobile
        let list = data.data.photos.map(item => {
          return  {...item, src: "api/studentCert/photo?id="+item.id}
        })
        this.lists = [{
            name: '自拍正面照',
            list: list.filter(item => item.type == 1),
          }, {
            name: '在读证明',
            list: list.filter(item => item.type == 3),
          }, {
            name: '学生证',
            list: list.filter(item => item.type == 2),
          }
        ]
    })
    this.options = {
      getThumbBoundsFn: (index) =>{
        let thumbnail = document.querySelectorAll('.previewer-box')[this.showList].querySelectorAll('.previewer-img')[index]
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        let rect = thumbnail.getBoundingClientRect()
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      }
    }
  }
}
</script>
<style lang="less">
.detail{
  .center-box{
    padding-bottom: 60px;
  }
  .cell{
    font-size: 16px;
    color: #444;
  }
  .cell-title{
    padding-top: 10px;
  }
  .cell-content{
    .previewer-img{
      height: 150px;
      margin: 20px 0 0 20px;
    }
    .text{
      padding-left: 30px;
      padding-bottom: 20px;
      line-height: 20px;
    }
    .phone-blue{
      color: #55a3e7;
    }
  }
}
</style>
