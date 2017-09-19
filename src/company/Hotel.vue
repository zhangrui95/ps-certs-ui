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
        icon: require('../assets/icon2.png'),
        label: '未带身份证入住',
        link: '/NoIdCard',
        num: ''

      }, {
        icon: require('../assets/icon3.png'),
        label: '从业人员上报',
        link: '/EmployeeUp',
        num: ''
      }]
    }
  },
  methods: {
  }
}
</script>
