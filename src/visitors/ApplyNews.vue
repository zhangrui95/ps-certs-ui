<template>
  <div class="page page-list student-page">
    <div class="header-box" id="title">{{title}}</div>
    <div class="center-box padding-min">
      <div class="none-flex cell-border cell-margin" v-for="title in imgTitle">
        <div class="weui-cell__hd" v-html="title"></div>
        <ul class="weui-uploader__files" id="uploaderImg"></ul>
        <div class="img-uploader-box">
          <input id="uploaderInput" class="weui-uploader__input" type="button"/>
          <img class="change-upload" src="../assets/photo.png" id="checkUploader"/>
        </div>
      </div>
      <x-input title="姓名" v-model="name"></x-input>
      <x-input title="身份证号" v-model="card"></x-input>
      <x-input title="手机号码" v-model="mobile"></x-input>
      <popup-picker title="婚姻状况" :data="marrayList" v-model="marray" value-text-align="right" placeholder="请选择"></popup-picker>
      <popup-picker title="血型" :data="bloodList" v-model="blood" value-text-align="right" placeholder="请选择"></popup-picker>
      <x-input title="身高(cm)" v-model="height"></x-input>
      <x-input title="体重(kg)" v-model="weight"></x-input>
      <popup-picker title="文化程度" :data="cultureList" v-model="culture" value-text-align="right" placeholder="请选择"></popup-picker>
      <popup-picker title="宗教信仰" :data="religionList" v-model="religion" value-text-align="right" placeholder="请选择"></popup-picker>
      <popup-picker title="兵役状况" :data="militaryList" v-model="military" value-text-align="right" placeholder="请选择"></popup-picker>
      <div class="vux-cell-box">
        <datetime v-model="time" @on-change="change" title="入学时间" :show.sync="visibility" placeholder="请选择"></datetime>
      </div>
      <popup-picker title="所在学校" :data="schoolList" v-model="school" value-text-align="right" placeholder="请选择"></popup-picker>
      <x-input title="所在院系" v-model="department"></x-input>
      <x-input title="所在专业" v-model="major"></x-input>
      <div class="height-fixed-min"></div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="toastText" position="default"></toast>
    <double-btn :leftBtn="leftBtn" :rightBtn="rightBtn" :click="clickUp" :goOut="goOut"></double-btn>
    <confirm v-model="show"
             title=" "
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">{{confirmText}}</p>
    </confirm><confirm v-model="shows"
             title=" "
             @on-cancel="onCancels"
             @on-confirm="onConfirms"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">{{confirmTexts}}</p>
    </confirm>
  </div>
</template>

<script>
  import { XInput, PopupPicker, Datetime, Toast, Confirm } from 'vux'
  import DoubleBtn from './DoubleBtn'
  import qs from 'qs'

  export default {
    components: {
      DoubleBtn,
      XInput,
      PopupPicker,
      Datetime,
      Toast,
      Confirm
    },
    data () {
      return {
        show: false,
        shows: false,
        confirmText: '',
        confirmTexts: '',
        title: '居住证明办理申请登记',
        leftBtn: '取消',
        rightBtn: '提交',
        name: '',
        card: '',
        mobile: '',
        height: '',
        weight: '',
        marray: [],
        marrayList: [['未婚','已婚','离异','其他']],
        blood: [],
        bloodList: [['A','B','O','AB','其他','不详']],
        religion: [],
        religionList: [['佛教','道教','天主教','基督教','伊斯兰教','喇嘛教','其他','无宗教信仰']],
        culture: [],
        cultureList: [['本科','本科以上']],
        military: [],
        militaryList: [['未服兵役','退出现役','国防生','服现役']],
        school: [],
        schoolList: [],
        time: '',
        visibility: false,
        department: '',
        major: '',
        showPositionValue: false,
        toastText: '',
        imgTitle: ['<label class="weui-label">自拍正面照</label>','<label class="weui-label">在读证明</label>','<label class="weui-label student-prove">学生证</label><span class="field-comment">(非学生卡)</span>']
      }
    },
    created: function () {
      this.$http.post('/example/api/company/university.json').then(response => {
        var list = []
        for(let i in response.data.list){
          let name = response.data.list[i].name
          list.push(name)
        }
        this.schoolList.push(list)
      })
    },
    methods: {
      change (value) {
        console.log('change', value)
      },
      goOut () {
        this.confirmText = '确定取消当前操作？'
        this.show = true
      },
      clickUp () {
        if (this.name.length === 0) {
          this.toastText = '请填写姓名'
          this.showPositionValue = true
        }else if (this.card.length === 0) {
          this.toastText = '请填写身份证号'
          this.showPositionValue = true
        }else if (this.mobile.length === 0) {
          this.toastText = '请填写手机号'
          this.showPositionValue = true
        }else if (this.marray.length === 0) {
          this.toastText = '请选择婚姻状况'
          this.showPositionValue = true
        }else if (this.blood.length === 0) {
          this.toastText = '请选择血型'
          this.showPositionValue = true
        }else if (this.height.length === 0) {
          this.toastText = '请填写身高'
          this.showPositionValue = true
        }else if (this.weight.length === 0) {
          this.toastText = '请填写体重'
          this.showPositionValue = true
        }else if (this.culture.length === 0) {
          this.toastText = '请选择文化程度'
          this.showPositionValue = true
        }else if (this.religion.length === 0) {
          this.toastText = '请选择宗教信仰'
          this.showPositionValue = true
        }else if (this.military.length === 0) {
          this.toastText = '请选择兵役情况'
          this.showPositionValue = true
        }else if (this.time.length === 0) {
          this.toastText = '请选择入学时间'
          this.showPositionValue = true
        } else if (this.school.length === 0) {
          this.toastText = '请选择所在学校'
          this.showPositionValue = true
        } else if (this.department.length === 0) {
          this.toastText = '请填写所在院系'
          this.showPositionValue = true
        }else if (this.major.length === 0) {
          this.toastText = '请填写所在专业'
          this.showPositionValue = true
        }else {
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
        wx.closeWindow()
      },
      onConfirms () {
        this.$http.post('/example/api/studentCert/save.json', qs.stringify({'info.marray': this.marray})
        ).then(function (data) {
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
