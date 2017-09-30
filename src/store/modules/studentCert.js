import * as types from '../mutation-types'
import * as api from '../../api/studentCert'

const state = {
  list: [],
  stat: []
}

const getters = {
  doneM: state => state.done
}

const actions = {
  async list ({commit}, params) {
    const resp = await api.list(params)
    commit(types.SC_LIST, resp.data)
  },
  async groupByState ({commit}, params) {
    const resp = await api.groupByState(params)
    commit(types.SC_STAT, resp.data)
  }
}

const mutations = {
  [types.SC_LIST] (state, {list}) {
    state.list = list
  },
  [types.SC_STAT] (state, stat) {
    state.stat = [
      { text: '未办理', num: stat.init },
      { text: '未通知', num: stat.done, link: '/NoInform' },
      { text: '已完成', num: stat.notify, link: '/Done' }
    ]
  }
}

const namespaced = true

export default {
  namespaced, state, getters, actions, mutations
}
