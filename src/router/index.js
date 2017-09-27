import VueRouter from 'vue-router'
import { querystring } from 'vux'

import routerStringifyQuery from './stringifyQuery'

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
      component: () => import(`../pages/${page}`)
    })
  })
  return {
    routes,
    base: 'example',
    mode: 'history',
    stringifyQuery (obj) { // 将userid以及type加到locastion.search
      return routerStringifyQuery({
        userid: querystring.parse()['userid'],
        type: querystring.parse()['type'],
        ...obj
      })
    }
  }
})())

const init = store => {
  router.beforeEach((to, from, next) => {
    window.history.replaceState(store.state.router, '', from.fullPath) // 将状态保存到跳转前的页面
    store.commit('updateRouterState', {})
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
  })

  router.afterEach(to => {
    store.commit('updateLoadingStatus', { isLoading: false })
  })

  window.addEventListener('popstate', popstate => { // 监听popstate事件  将history中的状态还原到当前页面
    store.commit('updateRouterState', { ...popstate.state })
  })
  return router
}

export default init
