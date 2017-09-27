<template>
  <div class="page page-list">
    <div class="header-box">重载</div>
    <div class="center-box">{{result}}</div>
    <div class="btn-box">
      <span class="btn" @click="clickDics">重载用户微信配置</span>
    </div>
  </div>
</template>

<script>
  import { post } from '@/utils/ajax'

  export default {
    data () {
      return {
        result: ''
      }
    },
    methods: {
      clickDics: function () {
        post('/example/api/app/reload.json').then(data => {
            this.result = JSON.stringify(data)
        })
      }
    }
  }
</script>
