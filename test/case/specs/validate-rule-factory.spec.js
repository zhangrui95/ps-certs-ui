import chai from 'chai'
import factory from '../../../src/plugins/validate-plugin/rule-factory'
import testList from './test-data'

const expect = chai.expect

describe('测试 factory', () => {
  testList.forEach(function (item) {
    it('测试' + item.rule + '：' + item.value + ' factory返回：' + item.ret, () => {
      let fn = function (item) {
        const rule = factory.getRule(item.rule)
        expect(rule(item.value))
          .to.equal(true)
      }
      return fn
    })
  })
})
