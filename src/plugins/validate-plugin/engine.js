import factory from './rule-factory'

// const rulesMap = Object.extend({}, rules)

const engine = {
  validate (opt) {
    const rule = factory.getRule(opt.rule)
    if (rule) {
      return rule(opt.value)
    } else {
      throw new Error(`rule ${opt.rule} not found`)
    }
  }
}

export default engine
