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
