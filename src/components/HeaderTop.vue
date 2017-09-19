<template>
    <div class="header-bg">
      <span v-if="type=='leader'">{{$t('header_spinner')}}：<span></span></span>
      <span v-else="type=='police'" id="imgandname"><img src="../assets/head.jpg" class="police-header-img"><span class="head-name">苏素素</span></span>
      <img src="../assets/index-icon.png" class="police-title-img"/>
    </div>
</template>

<i18n>
header_spinner:
  en: Today Police
  zh-CN: 今日值班民警
</i18n>

<script>
  export default {
    data () {
      return {

      }
    },
    props: [
      'type'
    ],
    methods: {
      onItemClick () {
        console.log('on item click')
      }
    }
  }
</script>
