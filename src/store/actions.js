import * as types from './mutation-types'
import * as service from '../api/studentCert'

export const demoList = async ({commit}, params) => {
  const resp = await service.list(params)
  console.log('demoList ret', resp)
  commit(types.DEMO_LIST, resp.data)
}
