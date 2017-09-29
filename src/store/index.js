import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    isLoading: false,
    router: {} // 将要保存到history中的state
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateRouterState(state, payload) {
      state.router = {...state.router, ...payload }
    }
  }
})

export default store