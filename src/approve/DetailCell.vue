<template>
  <div class="none-flex cell-border cell-margin cell-border-padding">
    <div class="weui-cell__hd"><label class="weui-label label-line-height">{{title}}</label></div>
    <div class="weui-cell__bd bd-right font-color blur label-line-height" v-html="detail">
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'title',
      'detail'
    ]
  }
</script>
