<template>
  <div class="btn-box">
    <a class="btn" @click="clickDics">{{btn}}</a>
  </div>
</template>

<script>
  export default {
    props: [
      'btn',
      'clickDics'
    ]
  }
</script>
