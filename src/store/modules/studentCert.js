import * as types from '../mutation-types'

const state = {
  list: []
}

const getters = {
  doneM: state => state.done
}

const actions = {
  listM ({commit}) {
    // async
    commit(types.SC_LIST, {})
  }
}

const mutations = {
  [types.REC_LIST_M] (state, {list}) {
    state.list = list
  }
}

export default {
  state, getters, actions, mutations
}
