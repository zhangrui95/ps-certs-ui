<template>
  <pop :news="news" :show="show"></pop>
</template>

<script>
  import Pop from './Pop'
  export default {
    components: {
      Pop
    },
    data () {
      return {
        news: [{
          name: '姓名',
          id: 'legal-person-name',
          placeholder: '法人/负责人姓名'
        }, {
          name: '手机号码',
          id: 'legal-phone',
          placeholder: '11位手机号码'

        }, {
          name: '电话号码',
          id: 'legal-company-tel-num',
          placeholder: '企业电话号码'

        }, {
          name: '身份证号',
          id: 'legal-company-tel-num',
          placeholder: '法人/负责人身份证号码'

        }]
      }
    },
    props: [
      'show'
    ],
    methods: {
    }
  }
</script>
