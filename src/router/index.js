import VueRouter from 'vue-router'
import routerStringifyQuery from './stringifyQuery'
import { querystring } from 'vux'

const pages = [
  'Dev',
  'Student',
  'Approve',
  'Apply',
  'NoInform',
  'Done',
  'Undone',
  'Back',
  'Detail',
  'Console'
]

const router = new VueRouter((() => {
  const routes = [{
    path: '/',
    redirect: '/dev'
  }]
  pages.forEach(page => {
    routes.push({
      path: `/${page}`,
      component: () =>
        import (`../pages/${page}`)
    })
  })
  return {
    routes,
    base: 'example',
    mode: 'history',
    stringifyQuery(obj) {
      const { userid, type } = querystring.parse()
      return routerStringifyQuery({ userid, type, ...obj, })
    }
  }
})())

const init = store => {
  router.beforeEach((to, from, next) => {
    window.history.replaceState(store.state.router, '', from.fullPath) // 将状态保存到跳转前的页面
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
  })

  router.afterEach(to => {
    store.commit('updateRouterState', { scrollY: 0, params: {}, listData: [] })
    store.commit('updateLoadingStatus', { isLoading: false })
  })

  window.addEventListener('popstate', popstate => { // 监听popstate事件  将history中的状态还原到当前页面
    store.commit('updateRouterState', {...popstate.state })
  })
  return router
}

export default init