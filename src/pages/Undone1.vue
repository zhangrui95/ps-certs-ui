<template>
  <div class="page page-list student-page">
    <div class="header-box">未办理</div>
    <div class="center-box padding-min">
      <div class="none-flex cell-border cell-margin cell-border-padding"  v-for="imgNews in imgTitle">
        <div class="weui-cell__hd"><label class="weui-label label-line-height">{{imgNews.title}}</label></div>
        <div class="weui-cell__bd bd-right font-color blur label-line-height">
          <img-browse :imgList="imgNews.imgList" :delShow="delShow"></img-browse>
        </div>
      </div>
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
    <confirm v-model="show"
             title=" "
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">{{confirmText}}</p>
    </confirm>
  </div>
</template>

<script>
  import { Previewer, TransferDom, dateFormat, Confirm } from 'vux'
  import DetailCell from '../components/DetailCell'
  import DoubleBtn from '../components/DoubleBtn'
  import ImgBrowse from '../components/ImgBrowse.vue'
  import qs from 'qs'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      DetailCell,
      DoubleBtn,
      ImgBrowse,
      dateFormat,
      Confirm
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
        confirmText: '',
        show: false,
        delShow: false,
        imgTitle: [
          {
            title: '自拍正面照',
            imgList: []
          },
          {title: '在读证明',
            imgList: []
          },
          {title: '学生证',
            imgList: []
          }]
      }
    },
    created: function () {
      this.$http.post('api/studentCert/detail.json', {id: this.$route.query.id}).then(response => {
        let item = response.data.data
        let src1 = []
        let src2 = []
        let src3 = []
        for (let i in item.photos) {
          if (item.photos[i].type === 1) {
            let img1 = {}
            img1.src = 'api/studentCert/photo?id=' + item.photos[i].id
            src1.push(img1)
            this.imgTitle[0].imgList = src1
          } else if (item.photos[i].type === 2) {
            let img2 = {}
            img2.src = 'api/studentCert/photo?id=' + item.photos[i].id
            src2.push(img2)
            this.imgTitle[2].imgList = src2
          } else if (item.photos[i].type === 3) {
            let img3 = {}
            img3.src = 'api/studentCert/photo?id=' + item.photos[i].id
            src3.push(img3)
            this.imgTitle[1].imgList = src3
          }
        }
        this.name = item.name
        this.card = item.info.card
        this.mobile = item.info.mobile
        this.height = item.info.height
        this.weight = item.info.weight
        this.time = dateFormat(new Date(item.info.enterSchoolTime), 'YYYY-MM-DD')
        this.faculty = item.info.faculty
        this.specialty = item.info.specialty
        let mar = ''
        let blood = ''
        let education = ''
        let religion = ''
        let military = ''
        switch (item.info.marray) {
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
        switch (item.info.blood) {
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
        switch (item.info.education) {
          case 1:education = '本科'
            break
          case 2:education = '本科以上'
            break
          default:
        }
        this.education = education
        switch (item.info.religion) {
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
        switch (item.info.military) {
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
      goOut () {
        let id = this.$route.params.id
        this.$router.push({path: '/Back', query: {id: id}})
      },
      clickUp () {
        this.confirmText = '是否确认办理完成？'
        this.show = true
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm () {
        this.$http.post('api/studentCert/done.json', qs.stringify({'userid': '', 'type': '', 'id': ''})
        ).then(response => {
          if (response.data.state === 0) {
          } else {
          }
        })
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
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
