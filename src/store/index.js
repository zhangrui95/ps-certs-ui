import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import router from '../router/index'
import { post } from '@/utils/ajax'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        isLoading: false,
        direction: 'forward',
        scrollTop: 0,
        filtrate: {},
        listData: [],
        listDataIsNoMore: false,
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        },
        updateScrollTop(state, payload) {
            state.scrollTop = payload
        },
        updateFiltrate(state, payload) {
            state.filtrate = {...state.filtrate, ...payload }
        },
        updateListData(state, payload) {
            state.listData = [...state.listData, ...payload]
        },
        clearListData(state) {
            state.listData = []
        },
        updateListDataIsNoMore(state) {
            state.listDataIsNoMore = true
        }
    },
    actions: {
        updateListData({ commit, state }, payload) {
            post(payload.url, {
                max: 10,
                offset: state.listData.length,
                ...state.filtrate
            }).then(data => {
                let bol = true
                if (data.list.length > 0) {
                    commit('updateListData', data.list)
                } else {
                    commit('updateListDataIsNoMore')
                }
                payload.cb && payload.cb(data)
            })
        }
    },
})

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function(to, from, next) {
    store.commit('clearListData')
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
        store.commit('clearListData')
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