import { postx } from '../utils/ajax'

export default {
  list: async function (co, params = {}) {
    console.log('list co', co)
    const ret = await postx('/example/api/studentCert.json', params)
    console.log('list ret', ret)
    // let data = null yield
    // ret.then(response => data = response.data).catch(e => e)
    // console.log('list data', data)
    co.count = ret.data.count
    return ret
  }
}
