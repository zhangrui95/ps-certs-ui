<template>
  <div class="flex-page detail">
    <div class="header-box">
      <span v-text="dataNews.name"></span>
      <span>{{dataNews.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
    </div>
    <div class="center-box">
      <div class="cell" v-for="(group, index) in photoList" :key="index">
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
          <a class="text phone-blue" href="tel:13012345678">{{dataNews.mobile}}</a>
        </div>
      </div>
      <div class="cell" v-if="dataNews.result === -1">
        <div class="cell-title">退回原因</div>
        <div class="cell-content">
          <span class="text">{{dataNews.remark}}</span>
        </div>
      </div>
    </div>
    <previewer v-for="(group, index) in photoList" :key="index" :list="group.list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
import { Previewer } from 'vux'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapState } = createNamespacedHelpers('studentCert')

export default {
  components: {
    Previewer
  },
  data () {
    return {
      showList: 0,
      options: {}
    }
  },
  computed: {
    ...mapState({
      listDetail: state => state.detail,
      photoList: state => state.photo,
      dataNews: state => state.data
    })
  },
  methods: {
    ...mapActions({
      detail: 'detail'
    }),
    show (index, itemIndex) {
      this.showList = index
      this.$refs.previewer[index].show(itemIndex)
    }
  },
  created () {
    this.detail()
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
