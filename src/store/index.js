import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import studentCert from './modules/studentCert'

const isProduction = process.env.NODE_ENV === 'production'

const store = new Vuex.Store({
  state: {
    isLoading: false,
    router: {} // 将要保存到history中的state
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateRouterState (state, payload) {
      state.router = payload
    }
  },
  modules: {
    studentCert
  },
  actions,
  getters,
  strict: !isProduction
})

export default store
