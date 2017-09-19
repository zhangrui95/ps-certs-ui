<template>
  <div>
    <previewer :list="[{src:detail.photo}]" ref="previewer" :options="options"></previewer>
    <img class="previewer-img" :src="detail.photo" width="100" @click="show">
    <group>
      <cell v-for="cell in detail.list" v-if="!cell.hide" :key="cell.title" :title="cell.title" :value="cell.value"></cell>
    </group>
  </div>
</template>

<script>
import { Previewer, Group, Cell } from 'vux'
export default {
  components: {
    Previewer, Group, Cell
  },
  props: ['detail'],
  data () {
    return {
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    show () {
      this.$refs.previewer.show(0)
    }
  },
}
</script>

<style scoped lang="less">
  .previewer-img{
    display: block;
    width: 130px;
    height: 180px;
    border: 2px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    margin: 30px auto;
  }
</style>
