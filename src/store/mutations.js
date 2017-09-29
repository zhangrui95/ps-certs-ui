import * as types from './mutation-types'

const mutations = {
  updateLoadingStatus: (state, payload) => {
    state.isLoading = payload.isLoading
  },
  updateRouterState: (state, payload) => {
    state.router = { ...state.router, ...payload }
  },
  [types.DEMO_LIST]: (state, list) => {
    console.log('demo state', state)
    console.log('demo list', list)
    state.demoList = list
  }
}

export default mutations
