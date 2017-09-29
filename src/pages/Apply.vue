<template>
  <div class="flex-page student-page">
    <div class="header-box">{{title}}</div>
    <div class="center-box padding-min">
      <div class="none-flex cell-border cell-margin" v-for="(imgNews, index) in imgTitle" :key="index">
        <div class="weui-cell__hd" v-html="imgNews.title"></div>
        <ul class="weui-uploader__files">
          <img-browse :imgList="imgNews.imgList" :delShow="delShow" @delImgIndex="delImgIndex" @click.native="ShowImg(index)"></img-browse>
        </ul>
        <up-loading :count="imgNews.count" v-on:addImages="listenToImgs" :index="index" @num="ImgIndex" @ids='Ids'>
          <div class="img-uploader-box">
            <input class="weui-uploader__input" type="button"/>
            <img class="change-upload" src="../assets/photo.png"/>
          </div>
        </up-loading>
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
    </div>
    <div class="footer-box">
      <span class="btn bg-gray" @click="goOut">取消</span>
      <span class="btn" @click="clickUp">提交</span>
    </div>
  </div>
</template>

<script>
  import { XInput, PopupPicker, Datetime, Group } from 'vux'
  import ImgBrowse from '../components/ImgBrowse'
  import UpLoading from '../components/UpLoading'
  import { post } from '@/utils/ajax'
  import * as valid from '@/utils/valid'

  export default {
    components: {
      XInput, PopupPicker, Datetime, Group,
      ImgBrowse, UpLoading
    },
    created () {
      this.title = this.$route.query.type == 1 ? '身份证办理申请登记' : '居住证明办理申请登记'
    },
    data () {
      return {
        num: '',
        delShow: true,
        title: '',
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
      change (value) {
        console.log('change', value)
      },
      ImgIndex: function (num) {
        this.num = num
      },
      listenToImgs: function (data) {
        this.imgTitle[this.num].imgList = data
      },
      goOut () {
        let that = this
        this.$vux.confirm.show({
          title: '确定取消当前操作？',
          onConfirm () {
            that.$wechat.closeWindow()
          }
        })
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
      },
      clickUp () {
        let infoArray = [
          [this.selfLis[0] && this.cardLis[0] && this.proveLis[0], '照片不能为空'],
          [this.name, '请填写姓名'],
          [this.card, '请填写身份证号'],
          [valid.card(this.card), '请填写正确的身份证号'],
          [this.mobile, '请填写手机号'],
          [valid.mobile(this.mobile), '请填写正确的手机号'],
          [this.marray[0], '请选择婚姻状况'],
          [this.blood[0], '请选择血型'],
          [this.height, '请填写身高'],
          [valid.height(this.height), '请填写正确的身高'],
          [this.weight, '请填写体重'],
          [valid.weight(this.weight), '请填写正确的体重'],
          [this.culture[0], '请选择文化程度'],
          [this.religion[0], '请选择宗教信仰'],
          [this.military[0], '请选择兵役情况'],
          [this.time[0], '请选择入学时间'],
          [this.department, '请填写所在院系'],
          [this.major, '请填写所在专业']
        ]
        if (valid.array(infoArray)) {
          let that = this
          this.$vux.confirm.show({
            title: '是否确认提交申请？',
            onConfirm () {
              that.onConfirm()
            }
          })
        }
      },
      onConfirm () {
        post('api/studentCert/save.json?userid=' + this.$route.query.userid,
          {
            info:{
              marray: this.marray[0],
              blood: this.blood[0],
              education: this.culture[0],
              military: this.military[0],
              religion: this.religion[0],
              enterSchoolTime: this.time,
              card: this.card,
              mobile: this.mobile,
              height: this.height,
              weight: this.weight,
              faculty: this.department,
              specialty: this.major,
            },
            name: this.name,
            selfIds: this.selfLis,
            cardIds: this.cardLis.join(','),
            proveIds: this.proveLis
          }
        ).then(data => {
          if (data.state === 0) {
            this.$vux.alert.show({
              title: '提交成功',
              content: this.$route.query.type == 1 ? '请注意查看系统通知领取个人信息表' : '请注意查看系统通知领取居住证明'
            })
          } else {
            this.$vux.toast.text('提交失败！')
          }
        })
      }
    }
  }
</script>

