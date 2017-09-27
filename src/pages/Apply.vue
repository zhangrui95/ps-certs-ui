<template>
  <div class="page page-list student-page">
    <div class="header-box">{{title}}</div>
    <group class="center-box padding-min">
        <div class="none-flex cell-border cell-margin" v-for="(imgNews, index) in imgTitle">
          <div class="weui-cell__hd" v-html="imgNews.title"></div>
          <ul class="weui-uploader__files">
            <img-browse :imgList="imgNews.imgList" :delShow="delShow" @delImgIndex="delImgIndex" @click.native="ShowImg(index)"></img-browse>
          </ul>
          <up-loading :count="imgNews.count" v-on:addImages="listenToImgs" :index="index" @num="ImgIndex" @ids='Ids'></up-loading>
        </div>
        <x-input title="姓名" v-model="name"></x-input>
        <x-input title="身份证号" v-model="card"></x-input>
        <x-input title="手机号码" v-model="mobile"></x-input>
        <popup-picker title="婚姻状况" ref="picker3" :data="marrayList" v-model="marray" value-text-align="right" placeholder="请选择" @on-change="onChange" show-name></popup-picker>
        <popup-picker title="血型" :data="bloodList" v-model="blood" value-text-align="right" placeholder="请选择" show-name></popup-picker>
        <x-input title="身高(cm)" v-model="height"></x-input>
        <x-input title="体重(kg)" v-model="weight"></x-input>
        <popup-picker title="文化程度" :data="cultureList" v-model="culture" value-text-align="right" placeholder="请选择" show-name></popup-picker>
        <popup-picker title="宗教信仰" :data="religionList" v-model="religion" value-text-align="right" placeholder="请选择" show-name></popup-picker>
        <popup-picker title="兵役状况" :data="militaryList" v-model="military" value-text-align="right" placeholder="请选择" show-name></popup-picker>
        <div class="vux-cell-box">
          <datetime v-model="time" @on-change="change" title="入学时间" :show.sync="visibility" placeholder="请选择" show-name></datetime>
        </div>
        <x-input title="所在院系" v-model="department"></x-input>
        <x-input title="所在专业" v-model="major"></x-input>
        <div class="height-fixed-min"></div>
    </group>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="toastText" position="default"></toast>
    <double-btn :leftBtn="leftBtn" :rightBtn="rightBtn" :click="clickUp" :goOut="goOut"></double-btn>
    <confirm v-model="show" title=" " @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
      <p style="text-align:center;">{{confirmText}}</p>
    </confirm>
    <confirm v-model="shows" title=" " @on-cancel="onCancels" @on-confirm="onConfirms" @on-show="onShow" @on-hide="onHide">
      <p style="text-align:center;">{{confirmTexts}}</p>
    </confirm>
  </div>
</template>

<script>
  import { XInput, PopupPicker, Datetime, Toast, Confirm, Group } from 'vux'
  import DoubleBtn from '../components/DoubleBtn'
  import { post } from '@/utils/ajax'
  import ImgBrowse from '../components/ImgBrowse'
  import UpLoading from '../components/UpLoading'

  export default {
    components: {
      DoubleBtn,
      XInput,
      PopupPicker,
      Datetime,
      Toast,
      Confirm,
      ImgBrowse,
      UpLoading,
      Group
    },
    created () {
      this.title = this.$route.query.type == 1 ? '身份证办理申请登记' : '居住证明办理申请登记'
    },
    data () {
      return {
        num: '',
        delShow: true,
        show: false,
        shows: false,
        confirmText: '',
        confirmTexts: '',
        title: '',
        leftBtn: '取消',
        rightBtn: '提交',
        name: '',
        card: '',
        mobile: '',
        height: '',
        weight: '',
        marray: [],
        marrayList: [[{name: '未婚', value: '1'}, {name: '已婚', value: '2'}, {name: '离异', value: '3'}, {name: '其他', value: '4'}]],
        blood: [],
        bloodList: [[{name: 'A', value: '1'}, {name: 'B', value: '2'}, {name: 'O', value: '3'}, {name: 'AB', value: '4'}, {name: '其他', value: '5'}, {name: '不详', value: '6'}]],
        religion: [],
        religionList: [[{name: '佛教', value: '1'}, {name: '道教', value: '2'}, {name: '天主教', value: '3'}, {name: '基督教', value: '4'}, {name: '伊斯兰教', value: '5'}, {name: '喇嘛教', value: '6'}, {name: '其他', value: '7'}, {name: '无宗教信仰', value: '8'}]],
        culture: [],
        cultureList: [[{name: '本科', value: '1'}, {name: '本科以上', value: '2'}]],
        military: [],
        militaryList: [[{name: '未服兵役', value: '1'}, {name: '退出现役', value: '2'}, {name: '国防生', value: '3'}, {name: '服现役', value: '4'}]],
        time: '',
        visibility: false,
        department: '',
        major: '',
        showPositionValue: false,
        toastText: '',
        selfLis: '',
        cardLis: '',
        proveLis: '',
        imgTitle: [
          {
            title: '<label class="weui-label">自拍正面照</label>',
            count: 1,
            imgList: []
          },
          {title: '<label class="weui-label">在读证明</label>',
            count: 1,
            imgList: []
          },
          {title: '<label class="weui-label student-prove">学生证</label><span class="field-comment">(非学生卡)</span>',
            count: 9,
            imgList: []
          }
        ]
      }
    },
    methods: {
      onChange (index) {
        console.log('val change', index[0])
      },
      ImgIndex: function (num) {
        this.num = num
      },
      listenToImgs: function (data) {
        this.imgTitle[this.num].imgList = data
      },
      change (value) {
        console.log('change', value)
      },
      goOut () {
        this.confirmText = '确定取消当前操作？'
        this.show = true
      },
      clickUp () {
        if (this.selfLis.length === 0 || this.cardLis.length === 0 || (this.$route.query.type == 2 && this.proveLis.length === 0)) {
          this.toastText = '照片不能为空'
          this.showPositionValue = true
        } else if (this.name.length === 0) {
          this.toastText = '请填写姓名'
          this.showPositionValue = true
        } else if (this.card.length === 0) {
          this.toastText = '请填写身份证号'
          this.showPositionValue = true
        } else if (this.mobile.length === 0) {
          this.toastText = '请填写手机号'
          this.showPositionValue = true
        } else if (this.marray.length === 0) {
          this.toastText = '请选择婚姻状况'
          this.showPositionValue = true
        } else if (this.blood.length === 0) {
          this.toastText = '请选择血型'
          this.showPositionValue = true
        } else if (this.height.length === 0) {
          this.toastText = '请填写身高'
          this.showPositionValue = true
        } else if (this.weight.length === 0) {
          this.toastText = '请填写体重'
          this.showPositionValue = true
        } else if (this.culture.length === 0) {
          this.toastText = '请选择文化程度'
          this.showPositionValue = true
        } else if (this.religion.length === 0) {
          this.toastText = '请选择宗教信仰'
          this.showPositionValue = true
        } else if (this.military.length === 0) {
          this.toastText = '请选择兵役情况'
          this.showPositionValue = true
        } else if (this.time.length === 0) {
          this.toastText = '请选择入学时间'
          this.showPositionValue = true
        } else if (this.department.length === 0) {
          this.toastText = '请填写所在院系'
          this.showPositionValue = true
        } else if (this.major.length === 0) {
          this.toastText = '请填写所在专业'
          this.showPositionValue = true
        } else {
          this.confirmTexts = '是否确认提交申请？'
          this.shows = true
        }
      },
      onCancel () {
        console.log('on cancel')
      },
      onCancels () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        this.$wechat.closeWindow()
      },
      onConfirms () {
        post('api/studentCert/save.json',
          {
            'type': this.$route.query.type,
            'info.marray': this.marray[0],
            'info.blood': this.blood[0],
            'info.education': this.culture[0],
            'info.military': this.military[0],
            'info.religion': this.religion[0],
            'info.enterSchoolTime': this.time,
            'name': this.name,
            'info.card': this.card,
            'info.mobile': this.mobile,
            'info.height': this.height,
            'info.weight': this.weight,
            'info.faculty': this.department,
            'info.specialty': this.major,
            'selfIds': this.selfLis,
            'cardIds': this.cardLis.join(','),
            'proveIds': this.proveLis
          }
        ).then(function (data) {
        })
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      ShowImg (index) {
        this.num = index
      },
      Ids (ids) {
        if (this.num === 0) {
          this.selfLis = ids.join(',')
        } else if (this.num === 2) {
          this.cardLis = ids
        } else {
          this.proveLis = ids.join(',')
        }
      },
      delImgIndex (delIndex) {
        if (this.num === 2) {
          this.cardLis.splice(delIndex, 1)
        }
      }
    }
  }
</script>

<style lang="less">
  .student-page{
    .weui-cells{
      margin-top: 5px;
      font-size: 16px;
    }
    .padding-min{
      padding-top: 5px;
    }
    .none-flex{
      display: flex;
      position: relative;
    }
    .cell-border{
      border-bottom: 1px dashed #ddd;
      padding: 15px 5px;
    }
    .cell-margin{
      min-height:20px;
      height:auto;
      background: #FFFFFF;
      position: relative;
    }
    .weui-label{
      width:100px;
      font-size: 18px;
      line-height: 55px;
    }
    .weui-uploader__files{
      width: 100%;
    }
    .img-uploader-box{
      margin: 0 auto;
      border: 5px solid #FFFFFF;
      background: #ddd;
      height: 45px;
      width: 45px;
      position: relative;
      top: 0;
      right: 0;
      flex: 0 0 45px;
    }
    .weui-uploader__input{
      z-index: 9999;
    }
    .change-upload {
      width: 25px;
      height: 25px;
      cursor: pointer;
      z-index: 500;
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .weui-label.student-prove{
      height:24px;
      line-height: 34px;
    }
    .field-comment{
      color: #605fbd;
      font-size: 14px;
    }
    .height-fixed-min{
      height: 50px;
      weight:100%;
    }
    .vux-x-input{
      border-bottom: 1px dashed #ddd;
      padding: 15px 5px;
    }
    .vux-cell-box{
      border-bottom: 1px dashed #ddd;
      padding: 15px 5px;
      .weui-cell{
        padding: 0;
      }
      &:before{
        border: none;
      }
    }
    .vux-datetime{
      p{
        font-size: 18px;
        color: #333;
      }
    }
    .vux-datetime.weui-cell{
      padding: 12.5px 0;
    }
    .vux-cell-box{
      &:before{
        border-top: none;
      }
    }
    .weui-cell:before{
      border-top: none;
    }
    .weui-input{
      text-align: right;
    }
    .weui-dialog__btn_primary{
      color: #5f60bd;
    }
  }
</style>
