import { postx } from '../utils/ajax'

export const list = async (params = {}) => {
  const ret = await postx('/example/api/studentCert.json', params)
  return ret
}
