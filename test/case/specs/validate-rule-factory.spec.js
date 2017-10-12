import chai from 'chai'
import factory from '../../../src/plugins/validate-plugin/rule-factory'

const expect = chai.expect

describe('test factory', () => {
  it('should card rule function', () => {
    const rule = factory.getRule('card')
    expect(typeof rule)
      .to.equal('function')
  })
  it('should card rule false', () => {
    const rule = factory.getRule('card')
    expect(rule('1'))
      .to.equal(false)
  })
  it('should card rule true', () => {
    const rule = factory.getRule('card')
    expect(rule('2'))
      .to.equal(true)
  })
})
