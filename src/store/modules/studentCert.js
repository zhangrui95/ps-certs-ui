import * as types from '../mutation-types'
import * as api from '../../api/studentCert'
import { dateFormat } from 'vux'
import Vue from 'vue'

const state = {
  list: {currLen: 0, count: 0, list: []},
  stat: [],
  detail: [],
  photo: [],
  data: [],
  notify: 0,
  fail: [],
  save: [],
  reload: [],
  done: []
}

const getters = {
  doneM: state => state.done
}

const actions = {
  async list ({ commit, state }, params) {
    try {
      if (params.offset === 0) {
        commit(types.SC_LIST, {currLen: 0, count: 0, list: []})
      }
      const resp = await api.list({ ...params })
      const count = resp.data.count || 0
      const list = resp.data.list || []
      const currLen = list.length
      commit(types.SC_LIST, { currLen, count, list: [...state.list.list, ...list] })
    } catch (e) {
      Vue.$vux.alert.show('load error')
      commit(types.SC_LIST, state.list)
    }
  },
  async groupByState ({ commit }, params) {
    const resp = await api.groupByState(params)
    commit(types.SC_STAT, resp.data)
  },
  async detail ({commit}, params) {
    const resp = await api.detail(params)
    commit(types.SC_DETAIL, resp.data)
  },
  async notifyUsers ({commit}, params) {
    const resp = await api.notifyUsers(params)
    commit(types.SC_NOTIFYUSERS, resp.data)
  },
  async fail ({commit}, params) {
    const resp = await api.fail(params)
    commit(types.SC_FAIL, resp.data)
  },
  async save ({commit}, params) {
    const resp = await api.save(params)
    commit(types.SC_SAVE, resp.data)
  },
  async reload ({commit}, params) {
    const resp = await api.reload(params)
    commit(types.CL_RELOAD, resp.data)
  },
  async done ({commit}, params) {
    const resp = await api.done(params)
    commit(types.SC_DONE, resp.data)
  }
}

const mutations = {
  [types.SC_LIST] (state, list) {
    state.list = {...list}
  },
  [types.SC_STAT] (state, stat) {
    state.stat = [
      { text: '未办理', num: stat.init },
      { text: '未通知', num: stat.done, link: '/NoInform' },
      { text: '已完成', num: stat.notify, link: '/Done' }
    ]
  },
  [types.SC_DETAIL] (state, {data}) {
    state.data = data
    state.detail = [
      { name: '姓名', value: data.name },
      { name: '身份证号', value: data.info.card },
      { name: '手机号', value: data.info.mobile },
      { name: '婚姻状况', value: ['未婚', '已婚', '离异', '其他'][data.info.marray - 1] },
      { name: '血型', value: ['A', 'B', 'O', 'AB', '其他', '不详'][data.info.blood - 1] },
      { name: '身高(cm)', value: data.info.height },
      { name: '体重(kg)', value: data.info.weight },
      { name: '文化程度', value: ['本科', '本科以上'][data.info.education - 1] },
      { name: '宗教信仰', value: ['佛教', '道教', '天主教', '基督教', '伊斯兰教', '喇嘛教', '其他', '无宗教信仰'][data.info.religion - 1] },
      { name: '兵役状况', value: ['未服兵役', '退出现役', '国防生', '服现役'][data.info.education - 1] },
      { name: '入学时间', value: dateFormat(data.info.enterSchoolTime, 'YYYY-MM-DD') },
      { name: '所在院系', value: data.info.faculty },
      { name: '所在专业', value: data.info.specialty }
    ]
    let { photos } = data
    photos = photos.map(item => {
      return {...item, src: 'api/studentCert/photo?id=' + item.id}
    })
    state.photo = [{
      name: '自拍正面照',
      list: photos.filter(item => item.type === 1)
    }, {
      name: '在读证明',
      list: photos.filter(item => item.type === 3)
    }, {
      name: '学生证',
      list: photos.filter(item => item.type === 2)
    }
    ]
  },
  [types.SC_NOTIFYUSERS] (state, notify) {
    state.notify = notify
  },
  [types.SC_FAIL] (state, fail) {
    state.fail = fail
  },
  [types.SC_SAVE] (state, save) {
    state.save = save
  },
  [types.CL_RELOAD] (state, reload) {
    state.reload = reload
  },
  [types.SC_DONE] (state, done) {
    state.done = done
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
