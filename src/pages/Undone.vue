<template>
  <div class="flex-page student-page">
    <div class="header-box">未办理</div>
    <div class="center-box">
      <detail-cell v-for="(group, index) in photoList" :key="index" :title="group.name" class="previewer-box">
        <span v-for="(item, itemIndex) in group.list" :key="itemIndex">
          <img class="previewer-img previewer-demo-img" :src="item.src" @click="show(index, itemIndex)">
        </span>
      </detail-cell>
      <detail-cell v-for="item in listDetail" :key="item.name" :title="item.name" :detail="item.value"></detail-cell>
    </div>
    <div class="footer-box">
      <span class="btn bg-gray" @click="back">退回</span>
      <span class="btn" @click="submit">办理完成</span>
    </div>
    <previewer v-for="group in photoList" :key="group.name" :list="group.list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { Previewer, dateFormat, Group } from 'vux'
  import DetailCell from '../components/DetailCell'
  import * as api from '@/api/studentCert'

  const { mapActions, mapState } = createNamespacedHelpers('studentCert')

  export default {
    components: {
      Previewer, DetailCell, Group
    },
    data () {
      return {
        textList: [],
        showList: 0,
        options: {},
        tag: true
      }
    },
    computed: {
      ...mapState({
        listDetail: state => state.detail,
        photoList: state => state.photo
      })
    },
    methods: {
      ...mapActions({
        detail: 'detail',
        done: 'done'
      }),
      show (index, itemIndex) {
        this.showList = index
        this.$refs.previewer[index].show(itemIndex)
      },
      back () {
        let id = this.$route.query.id
        this.$router.push({path: '/Back', query: {id: id}})
      },
      submit () {
        let that = this
        this.$vux.confirm.show({
          title: '是否确认办理完成？',
          onConfirm () {
            that.confirm()
          }
        })
      },
      async confirm () {
        if (this.tag) {
          let rest = await api.done()
          if (rest.data.state !== 0) {
            this.$vux.toast.text('提交失败')
            this.tag = true
          } else {
            this.$vux.alert.show({
              title: '办理完成',
              content: this.$route.query.type == 1 ? '请及时通知申请人领取个人信息表' : '请及时通知申请人领取证明表',
              onHide: () => {
                this.$router.go(-1)
              }
            })
            this.tag = false
          }
        }
      }
    },
    created: function () {
      this.detail()
      this.options = {
        getThumbBoundsFn: (index) => {
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
  .bd-right{
    line-height: 53px;
    text-align: right;
    flex: 1;
  }
  .previewer-demo-img{
    width: 45px;
    height: 45px;
    float: right;
    margin: 5px;
  }
  @media screen and (min-width: 800px) {
    .flex-page{
      overflow-y: scroll;
    }
    .detail-cell {
      width: 46%;
      float: left;
      margin: 0 1%;
    }
    .center-box{
      flex: inherit;
      overflow: visible;
    }
    .footer-box{
      border-top: 0;
      width: 50%;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 1360px) {
    .flex-page{
      overflow-y: scroll;
    }
    .detail-cell {
      width: 30%;
      float: left;
      margin: 0 1%;
    }
    .center-box{
      flex: inherit;
      overflow: visible;
    }
    .footer-box{
      border-top: 0;
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
