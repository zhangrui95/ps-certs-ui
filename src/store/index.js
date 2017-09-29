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

// hot reload
// if (module.hot) {
//   module.hot.accept(['./actions', './getters', './modules/studentCert'], () => {
//     store.hotUpdate({
//       actions: () => import('./actions'),
//       getters: () => import('./getters'),
//       modules: {
//         studentCert: () => import('./modules/studentCert')
//       }
//     })
//   })
// }

export default store
