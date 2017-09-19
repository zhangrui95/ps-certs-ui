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
        type: 'leader',
        menu: [{
          icon: require('../assets/icon6.png'),
          label: '企业底数清',
          link: '/List',
          num: ''
        }, {
          icon: require('../assets/icon1.png'),
          label: '设置值班民警',
          link: '/SetUp',
          num: ''

        }, {
          icon: require('../assets/icon2.png'),
          label: '未带身份证入住',
          link: '/NoCard',
          num: '8'
        }, {
          icon: require('../assets/icon3.png'),
          label: '从业人员上报',
          link: '/EmployeeChoice',
          num: ''
        }, {
          icon: require('../assets/icon10.png'),
          label: '消防安全',
          link: '',
          num: ''
        }, {
          icon: require('../assets/icon7.png'),
          label: '出租屋管理',
          link: '',
          num: ''
        }, {
          icon: require('../assets/icon12.png'),
          label: '散装油交易登记',
          link: '',
          num: ''
        }, {
          icon: require('../assets/icon11.png'),
          label: '所内管理',
          link: '',
          num: ''
        }]
      }
    },
    methods: {
    }
  }
</script>

