<template>
  <div class="btn-box">
    <router-link :to="goLink"><a class="btn" @click="clickDics">{{btn}}</a></router-link>
  </div>
</template>

<script>
  export default {
    props: [
      'btn',
      'goLink',
      'clickDics'
    ]
  }
</script>
