import VueRouter from 'vue-router'

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
  }
})())

const init = store => {
  router.beforeEach((to, from, next) => {
    window.history.replaceState(store.state.router, '', from.fullPath) // 将状态保存到跳转前的页面
    store.commit('updateRouterState', {})
    store.commit('updateLoadingStatus', { isLoading: true })
    if (to.query.userid) {
      next()
    } else {
      next({...to, query: {...to.query, userid: from.query.userid || 'value', type: from.query.type || 1 } })
    }
  })

  router.afterEach(to => {
    store.commit('updateLoadingStatus', { isLoading: false })
  })

  window.addEventListener('popstate', popstate => { // 监听popstate事件  将history中的状态还原到当前页面
    store.commit('updateRouterState', {...popstate.state })
  })
  return router
}

export default init