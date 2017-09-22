<template>
  <div class="page detail">
    <div class="header-box">
      <span>{{name}}</span>
      <span>{{createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
    </div>
    <div class="center-box">
      <div class="cell">
        <div class="cell-title">自拍正面照</div> 
        <div class="cell-content">
          <span v-for="(item, index) in list" :key="index">
            <img class="previewer-img"  v-if="item.type==1" :src="item.src" @click="show(index)">
          </span>
        </div>
      </div>
      <div class="cell">
        <div class="cell-title">在读证明</div> 
        <div class="cell-content">
          <span v-for="(item, index) in list" :key="index">
            <img class="previewer-img"  v-if="item.type==3" :src="item.src" @click="show(index)">
          </span>
        </div>
      </div>
      <div class="cell">
        <div class="cell-title">学生证</div> 
        <div class="cell-content">
          <span v-for="(item, index) in list" :key="index">
            <img class="previewer-img"  v-if="item.type==2" :src="item.src" @click="show(index)">
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
    <previewer :list="list" ref="previewer" :options="options"></previewer>
    <previewer :list="list" ref="previewer" :options="options"></previewer>
    <previewer :list="list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
import { Previewer } from 'vux'
import ListView from '@/components/ListView'
import TopNav from '@/components/TopNav'
import DragBox from '@/components/DragBox'
import { post } from '@/utils/ajax'

export default {
  components: {
    Previewer,
    TopNav, ListView, DragBox
  },
  data () {
    return {
      name: '',
      createTime: '',
      back: false,
      remark: '',
      mobile: '',
      list: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    show (index) {
      console.log(index)
      this.$refs.previewer.show(index)
    }
  },
  created () {
    post('/example/api/studentCert/detail.json',{id: this.$route.query.id}).then(data => {
        this.name = data.data.name
        this.createTime = data.data.createTime
        this.back = data.data.result === -1
        this.remark = data.data.remark
        this.mobile = data.data.mobile
        let list = data.data.photos.map(item => {
          return  {...item, src: "/example/api/studentCert/photo?id="+item.id}
        })
        this.list = [
          ...list.filter(item => item.type == 1),
          ...list.filter(item => item.type == 3),
          ...list.filter(item => item.type == 2),
        ]
    })
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
