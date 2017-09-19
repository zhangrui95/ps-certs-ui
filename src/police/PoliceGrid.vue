<template>
  <div>
    <header-top :type="type"></header-top>
    <grid-list :menu="menu"></grid-list>
  </div>
</template>

<script>
  import GridList from '../components/GridList'
  import HeaderTop from '../components/HeaderTop'

  export default {
    components: {
      GridList,
      HeaderTop
    },
    data () {
      return {
        type: 'police',
        menu: [{
          icon: require('../assets/icon9.png'),
          label: '企业统计',
          link: '/List',
          num: ''
        }, {
          icon: require('../assets/icon2.png'),
          label: '未带身份证入住',
          link: '/NoCard',
          num: '10'

        }, {
          icon: require('../assets/icon3.png'),
          label: '从业人员上报',
          link: '/PoliceComList',
          num: '31'
        }, {
          icon: require('../assets/icon8.png'),
          label: '从业人员统计',
          link: '/EmployeeChoice',
          num: ''
        }, {
          icon: require('../assets/icon10.png'),
          label: '消防安全',
          link: '/Fire',
          num: ''
        }, {
          icon: require('../assets/icon7.png'),
          label: '出租屋管理',
          link: '',
          num: ''
        }, {
          icon: require('../assets/icon11.png'),
          label: '所内管理',
          link: '',
          num: ''
        }, {
          icon: require('../assets/icon13.png'),
          label: '居住证明办理',
          link: '/Approve',
          num: ''
        }]
      }
    },
    methods: {
    }
  }
</script>

