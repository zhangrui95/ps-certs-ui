<template>
  <div class="flex-page">
    <drag-box class="drag-box">
    </drag-box>
    <list-view url="/example/api/studentCert.json">
    </list-view>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import DragBox from '@/components/DragBox'
import { post } from '@/utils/ajax'

export default {
  components: {
    ListView, DragBox
  },
  data () {
    return {

    }
  },
  computed: {
    listData () {
      return this.$store.state.vux.listData
    }
  },
  created () {
    
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
