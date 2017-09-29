import Vuex from 'vuex'
import modules from './modules'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const isProduction = process.env.NODE_ENV === 'production'

const store = new Vuex.Store({
  state: {
    isLoading: false,
    demoList: {},
    router: {} // 将要保存到history中的state
  },
  modules,
  mutations,
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
