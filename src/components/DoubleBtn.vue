<template>
  <div class="btn-box">
    <a class="btn-min btn-min-gray" href="javascript:" id="out" v-text="leftBtn" @click="goOut"></a>
    <a class="btn-min" href="javascript:" v-text="rightBtn" @click="click"></a>
  </div>
</template>

<script>
  export default {
    props: [
      'leftBtn',
      'rightBtn',
      'click',
      'goOut'
    ]
  }
</script>

<style lang="less">
  .btn-min{
    width: 40%;
    color: #fff;
    background: #605fbd;
    border-radius: 5px;
    line-height: 46px;
    font-size: 18px;
    text-align: center;
    float: left;
    font-family: "Microsoft YaHei", "\5b8b\4f53", "Arial", "Helvetica", "sans-serif";
    height: 46px;
    margin-left: 7%;
  }
  .btn-min-gray{
    background: #979797;
  }
</style>
