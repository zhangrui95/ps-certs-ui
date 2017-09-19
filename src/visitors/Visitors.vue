<template>
  <div>
    <grid-list :menu="menu"></grid-list>
  </div>
</template>

<script>
  import GridList from '../components/GridList'

  export default {
    components: {
      GridList
    },
    data () {
      return {
        menu: [{
          icon: require('../assets/icon14.png'),
          label: '绑定时间',
          link: '/',
          num: ''

        }, {
          icon: require('../assets/icon13.png'),
          label: '居住证明办理',
          link: '/ProveApply',
          num: ''
        }]
      }
    },
    methods: {
    }
  }
</script>
