<template>
  <div class="detail">
    <div class="page_choice">
      <div class="head-title">基本信息</div>
      <x-input title="企业名称" v-model="value1" label-align="right" placeholder="请输入企业名称"></x-input>
      <x-input title="企业地址" v-model="value2" placeholder="请输入企业地址"></x-input>
      <x-input title="写字楼/商场" v-model="value3" placeholder="请输入写字楼"></x-input>
      <popup-picker title="企业分类" :data="list" v-model="value4" value-text-align="right" placeholder="请选择"></popup-picker>
      <popup-picker title="辖区民警" :data="polices" v-model="value5" value-text-align="right" placeholder="请选择"></popup-picker>
      <popup-picker title="企业组别" :data="types" v-model="value6" value-text-align="right" placeholder="请选择"></popup-picker>
      <popup-picker title="消防等级" :data="fires" v-model="value7" value-text-align="right" placeholder="请选择"></popup-picker>
      <div class="head-title">法人/负责人</div>
      <div class="none-flex cell-border cell-margin head-title-border" id="legal-person">
        <div class="weui-cell__hd"><label class="weui-label" id="legal-name"></label></div>
        <div id="add-legal">
          <div class="add-legal-person" @click="addLegal"><span class="add-icon">+</span>新增法人/负责人</div></div>
        <div class="weui-cell__bd bd-right" style="margin-right: 25px;">
          <span id="mobile-num"></span>
          <span id="symbol" style="display: none;">/</span>
          <span id="tel-num"></span>
        </div>
      </div>
      <div class="head-title">联系人</div>
      <div class="add-line" id="add-linkman" @click="addLink"><span class="add">+</span>新增联系人</div>
    </div>
    <btn :btn="btn" :goLink="goLink" :clickDics="clickDics"></btn>
    <legal-pop :show="showLegal"></legal-pop>
    <linkman-pop :show="showLink"></linkman-pop>
  </div>
</template>

<script>
  import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, XAddress, XTextarea, XSwitch } from 'vux'
  import qs from 'qs'
  import Btn from '../components/Btn'
  import LegalPop from '../components/LegalPop'
  import LinkmanPop from '../components/LinkmanPop'

  export default {
    components: {
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch,
      Btn,
      LegalPop,
      LinkmanPop
    },
    data () {
      return {
        btn: '保存',
        goLink: '',
        value1: '',
        value2: '',
        value3: '',
        value4: [],
        value5: [],
        value6: [],
        value7: [],
        list: [['软件', '饭店', '幼儿园']],
        polices: [['丽丽', '芳芳']],
        types: [['普通', '其他']],
        fires: [['非重点消防单位', '重点消防单位']],
        numberValue: 0,
        showLegal: false,
        isShow: true,
        showLink: false
      }
    },
    methods: {
      addLegal: function (isShow) {
        this.showLegal = isShow
      },
      addLink: function (isShow) {
        this.showLink = isShow
      },
      clickDics: function () {
        this.$http.post('/example/api/company/save.json', qs.stringify({name: this.value1, address: this.value2, officeBuilding: this.value3, type: this.value4, police: this.value5, groupType: this.value6, fireState: this.value7})
        ).then(function (data) {

        })
      }
    }
  }
</script>

<style  lang="less">
  .weui-input{
    text-align: right;
  }
  .detail{
    overflow-y: hidden;
    height: 100%;
    .weui-cell{
      padding:18px 15px;
    }
    .weui-cell_access .weui-cell__ft:after{
      margin-top: -3px;
    }
  }
</style>
