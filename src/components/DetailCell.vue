<template>
  <div class="detail-cell">
    {{title}}<div class="detail">{{detail}}<slot></slot>
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

<style scoped lang="less">
  .detail-cell{
    display: flex;
    padding: 10px 5px;
    background: #FFFFFF;
    border-bottom: 1px dashed #ddd;
    font-size: 18px;
    line-height: 55px;
    color: #444;
    .detail{
      flex: 1;
      color: #444;
      text-align: right;
    }
  }
</style>
