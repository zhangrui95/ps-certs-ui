<template>
  <div>

  </div>
</template>

<script>
import { Cell } from 'vux'

export default {
  components: {
    Cell,
  },
  created () {
    console.log(this.$store.state)
  }
}
</script>