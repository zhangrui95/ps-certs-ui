<template>
  <div class="page page-list student-page student-page-back">
    <div class="header-box">退回原因</div>
    <div class="center-box padding-min">
      <div class="choice-problem">选择存在问题项</div>
      <div class="list-all-checkbox">
        <checklist :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
        <div class="choice-problem">备注</div>
        <textarea rows="5" class="text-area" id="text" v-model="textArea"></textarea>
        <div class="height-fixed-min"></div>
      </div>
    </div>
    <btn :btn="btn" :goLink="goLink" :clickDics="clickDics"></btn>
    <toast v-model="show1" @on-change="changes">发送成功</toast>
    <toast v-model="show2" type="text">请选择存在问题项或填写备注</toast>
  </div>
</template>

<script>
  import { Checklist, Toast } from 'vux'
  import Btn from '../components/Btn'
  import qs from 'qs'

  export default {
    components: {
      Checklist,
      Btn,
      Toast
    },
    methods: {
      change (val) {
        this.val = val
      },
      changes () {

      },
      clickDics: function () {
        if(this.textArea.length!==0||this.val.length!==0){
          let id = this.$route.query.id
          this.$http.post('/example/api/studentCert/fail.json', qs.stringify({userid:'',type:2,id:id,items:this.val,remark:this.textArea})
          ).then(response => {
            if(response.data.state === 0){
              this.show1 = true
//              this.$router.push({path:'/Approve'})
            }
          })
        }else{
          this.show2 = true
        }
      },
    },
    data () {
      return {
        btn: '发送',
        labelPosition: '',
        show1: false,
        show2: false,
        goLink: '',
        textArea: '',
        error: '',
        commonList: [ '自拍正面照', '在读证明', '学生证照片', '姓名', '身份证号', '手机号码', '血型', '身高', '体重', '婚姻状况', '宗教信仰', '文化程度', '兵役状况', '入学时间', '所在院系', '所在专业' ],
        checklist001: [],
        val: []
      }
    }
  }
</script>

<style lang="less">
  .student-page-back{
    .weui-cell{
      width: 46%;
      float: left;
      font-size: 16px;
      padding: 10px 5px;
      border-bottom: 1px dashed #ddd;
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked{
      &:before{
        color: #605fbd;
      }
    }
  }
</style>
