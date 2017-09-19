import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

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

export default store