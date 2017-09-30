import { postx } from '../utils/ajax'

export const list = async (params = {}) => {
  const ret = await postx('api/studentCert.json', params)
  return ret
}

export const groupByState = async (params = {}) => {
  const ret = await postx('api/studentCert/groupByState.json', params)
  return ret
}
