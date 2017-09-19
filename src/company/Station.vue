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
          icon: require('../assets/icon3.png'),
          label: '从业人员上报',
          link: '/EmployeeUp',
          num: ''
        },
        {
          icon: require('../assets/icon12.png'),
          label: '散装油交易登记',
          link: '/',
          num: ''

        }
        ]
      }
    },
    methods: {
    }
  }
</script>
