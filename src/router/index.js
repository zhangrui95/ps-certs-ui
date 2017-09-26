import Vue from 'vue'
import VueRouter from 'vue-router'
import { querystring } from 'vux'
import store from '@/store/index'

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
]

Vue.use(VueRouter)

let router = new VueRouter((() => {
    let routes = [{
        path: '/',
        redirect: '/dev'
    }]
    pages.forEach(page => {
        routes.push({
            path: `/${page}`,
            component: require(`../pages/${page}`)
        })
    })
    return {
        routes,
        base: 'example',
        mode: 'history',
        stringifyQuery(obj) { // 将userid以及type加到locastion.search
            return routerStringifyQuery({
                userid: querystring.parse()['userid'],
                type: querystring.parse()['type'],
                ...obj,
            })
        },
    }
})())

router.beforeEach(function(to, from, next) {
    window.history.replaceState(store.state.router, '', from.fullPath) // 将状态保存到跳转前的页面
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
})

window.addEventListener('popstate', function(popstate) { //监听popstate事件  将history中的状态还原到当前页面
    store.commit('updateRouterState', {...popstate.state, isReverse: true })
});

export default router