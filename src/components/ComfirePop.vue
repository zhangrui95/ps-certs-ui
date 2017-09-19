<template>
  <div>
    <confirm v-model="show">
      <p style="text-align:center;">{{title}}</p>
    </confirm>
  </div>
</template>

<script>
  import { Confirm, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch
    },
    data () {
      return {
        show: false
      }
    },
    methods: {

    }
  }
</script>

