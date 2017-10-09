<template>
  <div class="flex-page">
    <div class="header-box">重载</div>
    <div class="center-box">{{result}}</div>
    <div class="footer-box">
      <span class="btn" @click="clickDics">重载用户微信配置</span>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  const { mapActions, mapState } = createNamespacedHelpers('studentCert')

  export default {
    computed: {
      ...mapState({
        result: state => state.reload
      })
    },
    methods: {
      ...mapActions({
        reload: 'reload'
      }),
      clickDics: function () {
        this.reload()
      }
    }
  }
</script>
