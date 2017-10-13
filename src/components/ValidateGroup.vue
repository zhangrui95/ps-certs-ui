<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    methods: {
      validateGroup () {
        let els = this.$children
        for (let i = 0; i< els.length; i++){
          if (els[i].mixinValidate()) {
            return false
          }
        }
        return true
      }
    }
  }
</script>
