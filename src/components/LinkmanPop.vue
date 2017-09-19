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
          id: 'linkName',
          placeholder: '联系人姓名'
        }, {
          name: '手机号码',
          id: 'linkPhone',
          placeholder: '11位手机号码'

        }, {
          name: '邮箱',
          id: 'E-mail',
          placeholder: '邮箱账号'

        }, {
          name: '职位',
          id: 'Work',
          placeholder: '工作职位'

        }]
      }
    },
    props: [
      'show'
    ]
  }
</script>
