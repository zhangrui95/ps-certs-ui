<template>
  <div class="flex-page">
    <drag-box class="drag-box" :clickPop="popShow">
      <img src="../assets/Iconset.png" class="choice-img">
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
      return this.$store.state.listData
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
    top: 78%;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #5f60bd;
    border-radius: 50px;
    z-index: 100;
  }
  .choice-img{
    width: 24px;
    margin: 14px 0 0 14px;
  }
</style>
