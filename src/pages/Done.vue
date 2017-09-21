<template>
  <div class="flex-page">
    <drag-box class="drag-box" :clickPop="popShow">
    </drag-box>
    <list-view url="/example/api/studentCert.json">
    </list-view>
    <filtrate-pop :show="show" :PopHide="PopHide"></filtrate-pop>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import DragBox from '@/components/DragBox'
import FiltratePop from '@/components/FiltratePop'
import { post } from '@/utils/ajax'

export default {
  components: {
    ListView, DragBox, FiltratePop
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    listData () {
      return this.$store.state.vux.listData
    }
  },
  created () {

  },
  methods: {
    popShow () {
      this.show = true
    },
    PopHide: function () {
      this.show = false
    }
  }
}
</script>
<style lang="less">
  .drag-box{
    position: fixed;
    top: 70%;
    left: 60%;
    width: 50px;
    height: 50px;
    background: red;
    z-index: 100;
  }
</style>
