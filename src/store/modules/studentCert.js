import * as types from '../mutation-types'
import * as api from '../../api/studentCert'

const state = {
  list: []
}

const getters = {
  doneM: state => state.done
}

const actions = {
  async list ({commit}) {
    const resp = await api.list({state: 2})
    commit(types.SC_LIST, resp.data)
  }
}

const mutations = {
  [types.SC_LIST] (state, {list}) {
    state.list = list
  }
}

const namespaced = true

export default {
  namespaced, state, getters, actions, mutations
}
