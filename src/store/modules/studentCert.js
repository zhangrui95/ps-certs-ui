import * as types from '../mutation-types'
import * as api from '../../api/studentCert'

const state = {
  list: [],
  stat: [],
  count: 0
}

const getters = {
  doneM: state => state.done
}

const actions = {
  async list({ commit, state }, params) {
    const offset = state.list.length
    const resp = await api.list({ max: 10, offset, ...params })
    if (offset > 0) {
      commit(types.SC_LIST, { count: resp.data.count, list: [...state.list, ...resp.data.list] })
    } else {
      commit(types.SC_LIST, resp.data)
    }

  },
  async groupByState({ commit }, params) {
    const resp = await api.groupByState(params)
    commit(types.SC_STAT, resp.data)
  }
}

const mutations = {
  [types.SC_LIST](state, { list, count }) {
    state.list = list
    state.count = count
  },
  [types.SC_STAT](state, stat) {
    state.stat = [
      { text: '未办理', num: stat.init },
      { text: '未通知', num: stat.done, link: '/NoInform' },
      { text: '已完成', num: stat.notify, link: '/Done' }
    ]
  }
}

const namespaced = true

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}