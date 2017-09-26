import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import { post } from '@/utils/ajax'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        isLoading: false,
        router: {}
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateRouterState(state, payload) {
            state.router = payload
        },
    }
})

export default store