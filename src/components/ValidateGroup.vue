<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    methods: {
      valid () {
        let els = this.$children
        for (let i = 0; i< els.length; i++){
          if (els[i].rule && !els[i].onValid()) {
            return false
          }
        }
        return true
      }
    }
  }
</script>
