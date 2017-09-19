<template>
  <grid>
    <router-link :to="opt.hash" v-for="opt in opts" :key="opt.id">
      <grid-item :label="opt.name">
        <img slot="icon" :src="'../static/'+opt.icon" alt="">
        <badge v-if="opt.num" :text="opt.num"></badge>
      </grid-item>
    </router-link>
  </grid>
</template>

<script>
import { Grid, GridItem, Badge } from 'vux'

export default {
  components: {
    Grid, GridItem, Badge,
  },
  props: {
    opts: Array
  }
}
</script>

<style scoped lang="less">
  .weui-grid{
    padding: 35px 10px;
  }
  .vux-badge{
    position: absolute;
    top: 28px;
    left: 50%;
    margin-left: 10px;
  }
</style>
