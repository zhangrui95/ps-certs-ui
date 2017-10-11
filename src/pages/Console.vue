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
  import * as api from '@/api/studentCert'

  export default {
    data () {
      return {
        result: ''
      }
    },
    methods: {
      async clickDics () {
        let rest = await api.reload()
        this.result = rest.data.state
      }
    }
  }
</script>
