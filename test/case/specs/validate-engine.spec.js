import chai from 'chai'
import engine from '../../../src/plugins/validate-plugin/engine'

const expect = chai.expect

describe('test engine', () => {
  it('should card rule function', () => {
    const ret = engine.validate({rule: 'card', value: '1'})
    expect(ret)
      .to.equal(false)
  })
  it('should card rule true', () => {
    const ret = engine.validate({rule: 'card', value: '2'})
    expect(ret)
      .to.equal(true)
  })
})
