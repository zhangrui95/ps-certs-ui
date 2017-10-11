import chai from 'chai'
import engine from '../../../src/plugins/validate-plugin/engine'
import testList from './test-data'

const expect = chai.expect

describe('测试engine', () => {
  testList.forEach(function (item) {
    it('测试' + item.rule + '：' + item.value + ' validator 应该返回：' + item.ret, () => {
      let fn = function (item) {
        const ret = engine.validate({rule: item.rule, value: item.value})
        expect(ret)
          .to.equal(item.ret)
      }
      return fn
    })
  })
})
