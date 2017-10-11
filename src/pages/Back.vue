<template>
  <div class="flex-page page-list student-page student-page-back">
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
    <div class="footer-box">
      <span class="btn" @click="clickDics">发送</span>
    </div>
  </div>
</template>

<script>
  import { Checklist } from 'vux'
  import * as api from '@/api/studentCert'

  export default {
    components: {
      Checklist
    },
    methods: {
      change (val) {
        this.val = val
      },
      clickDics: async function () {
        if (this.tag) {
          if (this.textArea.length !== 0 || this.val.length !== 0) {
            let rest = await api.fail()
            if (rest.data.state === 0) {
              this.$vux.toast.show({
                text: '发送成功',
                onHide: () => {
                  this.$router.go(-2)
                }
              })
              this.tag = false
            } else {
              this.$vux.toast.text('发送失败，请重新操作')
              this.tag = true
            }
          } else {
            this.$vux.toast.text('请选择存在问题项或填写备注')
            this.tag = true
          }
        }
      }
    },
    data () {
      return {
        labelPosition: '',
        textArea: '',
        error: '',
        commonList: [ '自拍正面照', '在读证明', '学生证照片', '姓名', '身份证号', '手机号码', '血型', '身高', '体重', '婚姻状况', '宗教信仰', '文化程度', '兵役状况', '入学时间', '所在院系', '所在专业' ],
        checklist001: [],
        val: [],
        tag: 'true'
      }
    }
  }
</script>

<style lang="less">
  .student-page-back{
    .weui-cells{
      &:before{
        border-top:0 ;
      }
    }
    .weui-cell{
      width: 46%;
      float: left;
      font-size: 16px;
      padding: 10px 5px;
      border-bottom: 1px dashed #ddd;
      &:before{
        border-top:0 ;
      }
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked{
      &:before{
        color: #605fbd;
      }
    }
  }
  .choice-problem {
    color: #444;
    font-weight: 900;
    width: 90%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }
  .text-area {
    width: 86%;
    margin: 0 5%;
    border-radius: 5px;
    border: 1px solid #b5b5b5;
    font-size: 16px;
    padding: 5px 2%;
    font-family: "Microsoft YaHei", "\5B8B\4F53", "Arial", "Helvetica", "sans-serif";
  }
  .list-all-checkbox {
    width: 90%;
    overflow: hidden;
    margin: 0 auto;
  }
</style>
