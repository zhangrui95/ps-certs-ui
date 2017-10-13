import chai from 'chai'

const expect = chai.expect

describe('Mocha framwwork', () => {
  it('Mocha should can run', () => {
    const w = '1'
    expect(w)
      .to.equal('1')
  })
})
