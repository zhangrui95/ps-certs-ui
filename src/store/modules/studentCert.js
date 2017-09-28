import * as types from '../mutation-types'

const state = {
  list: []
}

const getters = {
  done: state => state.done
}

const actions = {
  list ({commit}) {
    // async
    commit(types.SC_LIST, {})
  }
}

const mutations = {
  [types.REC_LIST] (state, {list}) {
    state.list = list
  }
}

export default {
  state, getters, actions, mutations
}
