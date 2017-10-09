<template>
  <div>
    <slot v-for="(item, index) in list" :item="item" :index="index"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        'default': []
      },
      groupBy: {
        type: Function
      },
      listInOrder: {
        type: Boolean,
        'default': false
      }
    }
  }
</script>
