<template>
  <div class="list-wrap">
    <slot v-for="(item, index) in list" :item="item" :index="index"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        'default': []
      }
    }
  }
</script>
