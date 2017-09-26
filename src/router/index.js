import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

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
]

Vue.use(VueRouter)

let router = new VueRouter((() => {
    let routes = []
    pages.forEach(page => {
        routes.push({
            path: `/${page}`,
            component: require(`../pages/${page}`)
        })
    })
    return {
        mode: 'history',
        routes,
    }
})())

router.beforeEach(function(to, from, next) {
    window.history.replaceState(store.state.router, '', from.fullPath)
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
})

window.addEventListener('popstate', function(popstate) {
    store.commit('updateRouterState', {...popstate.state, isReverse: true })
});

export default router