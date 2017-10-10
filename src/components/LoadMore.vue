<template>
  <div class="pullup-wrapper">
    <div class="after-trigger" v-if="showLoading">
      {{tip}}<inline-loading></inline-loading>
    </div>
    <div class="before-trigger" v-else>
      <span>{{tip}}</span>
    </div>
  </div>
</template>

<script>
  import { InlineLoading } from 'vux'

  export default {
    name: 'load-more',
    components: {
      InlineLoading
    },
    props: {
      showLoading: {
        type: Boolean,
        'default': true
      },
      tip: String
    }
  }
</script>

<style lang="less">
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
</style>
