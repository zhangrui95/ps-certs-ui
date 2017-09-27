<template>
  <div class="none-flex cell-border cell-margin cell-border-padding">
    <div class="weui-cell__hd"><label class="weui-label label-line-height">{{title}}</label></div>
    <div class="weui-cell__bd bd-right font-color blur label-line-height">
      {{detail}}<slot></slot>  
    </div>
  </div>
</template>

<script>
  import ImgBrowse from '../components/ImgBrowse.vue'
  export default {
    components: {
      ImgBrowse
    },
    props: [
      'title',
      'detail'
    ]
  }
</script>

<style lang="less">
  .student-page{
    .cell-border-padding{
      padding: 10px 0px;
      width: 90%;
      margin-left: 5%;
    }
  }
</style>
