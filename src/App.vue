<template>
  <div class="app" id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      // deviceready: state => state.app.deviceready,
      demoTop: state => state.scrollTop,
      isLoading: state => state.isLoading,
      direction: state => state.direction
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/common.less';
@import './style/student.less';

</style>
