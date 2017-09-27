<template>
  <div class="page page-list">
    <div class="header-box">重载</div>
    <div class="center-box">{{result}}</div>
    <btn btn="重载用户微信配置" :clickDics="clickDics"></btn>
  </div>
</template>

<script>
  import Btn from '../components/Btn'
  import { post } from '@/utils/ajax'

  export default {
    components: {
      Btn
    },
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
