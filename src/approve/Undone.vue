<template>
  <div class="page page-list student-page">
    <div class="header-box">未办理</div>
    <div class="center-box padding-min">
      <detail-cell title="自拍正面照" :detail="selfImg"></detail-cell>
      <detail-cell title="在读证明"></detail-cell>
      <detail-cell title="学生证"></detail-cell>
      <detail-cell title="姓名" :detail="name"></detail-cell>
      <detail-cell title="身份证号" :detail="card"></detail-cell>
      <detail-cell title="手机号" :detail="mobile"></detail-cell>
      <detail-cell title="婚姻状况" :detail="mar"></detail-cell>
      <detail-cell title="血型" :detail="blood"></detail-cell>
      <detail-cell title="身高(cm)" :detail="height"></detail-cell>
      <detail-cell title="体重(kg)" :detail="weight"></detail-cell>
      <detail-cell title="文化程度" :detail="education"></detail-cell>
      <detail-cell title="宗教信仰" :detail="religion"></detail-cell>
      <detail-cell title="兵役状况" :detail="military"></detail-cell>
      <detail-cell title="入学时间" :detail="time"></detail-cell>
      <detail-cell title="所在院系" :detail="faculty"></detail-cell>
      <detail-cell title="所在专业" :detail="specialty"></detail-cell>
      <div class="height-fixed-min"></div>
    </div>
    <double-btn :leftBtn="leftBtn" :rightBtn="rightBtn" :click="clickUp" :goOut="goOut"></double-btn>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  import DetailCell from './DetailCell'
  import DoubleBtn from '../visitors/DoubleBtn'
  import { formatDate } from '../components/DateChange.js'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      DetailCell,
      DoubleBtn
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
      }
    },
    data () {
      return {
        name: '',
        card: '',
        mobile: '',
        height: '',
        weight: '',
        time: '',
        faculty: '',
        specialty: '',
        mar: '',
        blood: '',
        education: '',
        religion: '',
        military: '',
        leftBtn: '退回',
        rightBtn: '办理完成',
        selfImg: '<img class="previewer-demo-img detail-img only-img" src="https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg" width="100" @click="show(index)">' +
        '      <div v-transfer-dom>' +
        '      <previewer :list="" ref="previewer" :options="options"></previewer>' +
        '      </div>',
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
        }
      }
    },
    created: function () {
      this.$http.post('/example/api/studentCert/detail.json').then(response => {
        let item = response.data.data;
        this.name = item.name
        this.card = item.info.card
        this.mobile = item.info.mobile
        this.height = item.info.height
        this.weight = item.info.weight
        this.time = formatDate(new Date(item.info.enterSchoolTime), 'yyyy-MM-dd')
        this.faculty = item.info.faculty
        this.specialty = item.info.specialty
        let mar = ''
        let blood = ''
        let education = ''
        let religion = ''
        let military = ''
        switch(item.info.marray){
          case 1:mar = '未婚'
            break
          case 2:mar = '已婚'
            break
          case 3:mar = '离异'
            break
          case 4:mar = '其他'
            break
          default:
        }
        this.mar = mar
        switch(item.info.blood){
          case 1:blood = 'A'
            break
          case 2:blood = 'B'
            break
          case 3:blood = 'O'
            break
          case 4:blood = 'AB'
            break
          case 5:blood = '其他'
            break
          case 6:blood = '不详'
            break
          default:
        }
        this.blood = blood
        switch(item.info.education){
          case 1:education = '本科'
            break
          case 2:education = '本科以上'
            break
          default:
        }
        this.education = education
        switch(item.info.religion){
          case 1:religion = '佛教'
            break
          case 2:religion = '道教'
            break
          case 3:religion = '天主教'
            break
          case 4:religion = '基督教'
            break
          case 5:religion = '伊斯兰教'
            break
          case 6:religion = '喇嘛教'
            break
          case 7:religion = '其他'
            break
          case 8:religion = '无宗教信仰'
            break
          default:
        }
        this.religion = religion
        switch(item.info.military){
          case 1:military = '未服兵役'
            break
          case 2:military = '退出现役'
            break
          case 3:military = '国防生'
            break
          case 4:military = '服现役'
            break
          default:
        }
        this.military = military
      })
    },
    methods: {
      goOut() {
        let id = this.$route.params.id
        this.$router.push({path: '/Back', query:{id: id}})
      },
      clickUp() {
      }
    }
  }
</script>
