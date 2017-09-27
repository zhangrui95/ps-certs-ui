<template>
  <div class="page page-list student-page">
    <div class="header-box">未办理</div>
    <div class="center-box">
      <detail-cell v-for="(group, index) in photoList" :key="index" :title="group.name" class="previewer-box">
        <span v-for="(item, itemIndex) in group.list" :key="itemIndex">
          <img class="previewer-img previewer-demo-img" :src="item.src" @click="show(index, itemIndex)">
        </span>
      </detail-cell>
      <detail-cell v-for="item in textList" :key="item.name" :title="item.name" :detail="item.value"></detail-cell>
      <div class="height-fixed-min"></div>
    </div>
    <div class="btn-box">
      <span class="btn bg-gray" @click="back">退回</span>
      <span class="btn" @click="submit">办理完成</span>
    </div>
    <previewer v-for="group in photoList" :key="group.name" :list="group.list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
  import { Previewer, dateFormat } from 'vux'
  import DetailCell from '../components/DetailCell'
  import { post } from '@/utils/ajax'

  export default {
    components: {
      Previewer, DetailCell
    },
    data () {
      return {
        photoList: [],
        textList: [],
        showList: 0,
        options: {}
      }
    },
    methods: {
      show (index, itemIndex) {
        this.showList = index
        this.$refs.previewer[index].show(itemIndex)
      },
      back () {
        this.$router.back()
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
      confirm () {
        post('api/studentCert/done.json').then(data => {
          if (data.state === 0) {
            this.$vux.toast.show({text:'提交成功'})
          } else {
            this.$vux.toast.show({text:'提交失败'})
          }
        })
      }
    },
    created: function () {
      post('/example/api/studentCert/detail.json').then(data => {
        let { photos, name, info } = data.data
        photos = photos.map(item => {
          return  {...item, src: "api/studentCert/photo?id="+item.id}
        })
        this.photoList = [{
            name: '自拍正面照',
            list: photos.filter(item => item.type == 1),
          }, {
            name: '在读证明',
            list: photos.filter(item => item.type == 3),
          }, {
            name: '学生证',
            list: photos.filter(item => item.type == 2),
          }
        ]
        this.textList = [
          { name: '姓名', value: name },
          { name: '身份证号', value: info.card },
          { name: '手机号', value: info.mobile },
          { name: '婚姻状况', value: ['未婚', '已婚', '离异', '其他'][info.marray-1] },
          { name: '血型', value: ['A', 'B', 'O', 'AB', '其他', '不详'][info.blood-1] },
          { name: '身高(cm)', value: info.height },
          { name: '体重(kg)', value: info.weight },
          { name: '文化程度', value: ['本科', '本科以上'][info.education-1] },
          { name: '宗教信仰', value: ['佛教', '道教', '天主教', '基督教', '伊斯兰教', '喇嘛教', '其他', '无宗教信仰'][info.religion-1] },
          { name: '兵役状况', value: ['未服兵役', '退出现役', '国防生', '服现役'][info.education-1] },
          { name: '入学时间', value: dateFormat(info.enterSchoolTime) },
          { name: '所在院系', value: info.faculty },
          { name: '所在专业', value: info.specialty },
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

<style>
  .bd-right{
    line-height: 53px;
    text-align: right;
  }
</style>
