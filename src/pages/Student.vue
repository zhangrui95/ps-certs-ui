<template>
  <div class="page page-list">
    <div class="header-box" id="title">{{title}}</div>
    <div class="center-box" id="center-box" v-html="text"></div>
    <btn :btn="btn" :clickDics="clickDics"></btn>
  </div>
</template>

<script>
  import Btn from '../components/Btn'

  export default {
    components: {
      Btn
    },
    data () {
      return {
        title: '在校大学生身份证办理说明',
        text: '<span class="num"> 1、</span>准备好在读证明的电子版照片。在读证明请到学校有关部门开具并加盖学校相关部门公章，然后扫描或拍照成电子版照片。照片要清晰、完整。<br/>'+
        '<span class="num"> 2、</span>准备好学生证电子版照片。需将学生证学生信息页<span class="color-font">（含照片、学校钢印、个人信息）</span>扫描或拍照成电子版照片。如上述学生证信息不在同一页，可上传多张。照片要清晰、完整。<br/>'+
        '<span class="num"> 3、</span>准备好一张个人正面自拍照电子版<span class="color-font">（PS：彩色、免冠、近照，不要P图哦~）</span>。<br/>'+
        '<span class="num"> 4、</span>准备好在读证明、学生证、个人正面自拍照电子照片后，点击下方按钮开始填报申请表。<br/>'+
        '<span class="num"> 5、</span>申请提交后，请不要取消关注本公众号。系统会在10个工作日内给您发送申请办理结果。如办理成功，请按照通知内容在指定地点指定时间领取居住证明。<br/>'+
        '<div class="height-fixed-min"></div>',
        btn: '开始申请'
      }
    },
    methods: {
      clickDics: function () {
        this.$router.push({path: '/Apply'})
      }
    }
  }
</script>

<style lang="less">
  .header-box{
    width: 90%;
    height: 60px;
    line-height: 60px;
    color: #fff;
    background: #605fbd;
    font-size: 18px;
    padding:0 5%;
  }
  .center-box{
    width: 90%;
    margin: 0 5%;
    line-height: 30px;
    font-size: 16px;
    color: #444;
    padding-top: 20px;
    overflow-y: scroll;
    height: 80%;
    overflow-x: hidden;
  }
  .btn-box{
    width: 100%;
    padding-top:15px;
    background: #FFFFFF;
    border-top:1px solid #eee;
    position: absolute;
    height: 60px;
    bottom: 0;
  }
  .btn{
    width: 90%;
    margin: 0 auto;
    background: #605fbd;
    border-radius: 5px;
    display:block ;
    height: 46px;
    color: #FFFFFF;
    font-size: 18px;
    font-family: "Microsoft YaHei", "\5b8b\4f53", "Arial", "Helvetica", "sans-serif";
    text-align: center;
    line-height: 46px;
    margin:auto;
    &:active{
      background: #6c6bbd;
    }
  }
</style>
