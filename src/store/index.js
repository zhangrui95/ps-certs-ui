import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import { sync } from 'vuex-router-sync'
import router from '../router/index'

Vue.use(Vuex)

let store = new Vuex.Store({
    modules: {
        i18n: vuexI18n.store
    }
})

store.registerModule('vux', {
    state: {
        demoScrollTop: 0,
        isLoading: false,
        direction: 'forward'
    },
    mutations: {
        updateDemoPosition(state, payload) {
            state.demoScrollTop = payload.top
        },
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        }
    },
    actions: {
        updateDemoPosition({ commit }, top) {
            commit({ type: 'updateDemoPosition', top: top })
        }
    }
})

Vue.use(vuexI18n.plugin, store)
sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function(to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true })

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', { direction: 'forward' })
        } else {
            store.commit('updateDirection', { direction: 'reverse' })
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', { direction: 'forward' })
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        next()
    }
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
        // if (process.env.NODE_ENV === 'production') {
        //   ga && ga('set', 'page', to.fullPath)
        //   ga && ga('send', 'pageview')
        // }
})

export default store