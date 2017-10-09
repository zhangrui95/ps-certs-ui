import { postx } from '../utils/ajax'

export const list = async (params = {}) => {
  const ret = await postx('api/studentCert.json', params)
  return ret
}

export const groupByState = async (params = {}) => {
  const ret = await postx('api/studentCert/groupByState.json', params)
  return ret
}

export const detail = async (params = {}) => {
  const ret = await postx('api/studentCert/detail.json', params)
  return ret
}

export const notifyUsers = async (params = {}) => {
  const ret = await postx('api/studentCert/notifyUsers.json', params)
  return ret
}

export const fail = async (params = {}) => {
  const ret = await postx('api/studentCert/fail.json', params)
  return ret
}

export const save = async (params = {}) => {
  const ret = await postx('api/studentCert/save.json', params)
  return ret
}

export const reload = async (params = {}) => {
  const ret = await postx('api/app/reload.json', params)
  return ret
}

export const done = async (params = {}) => {
  const ret = await postx('api/studentCert/done.json', params)
  return ret
}
