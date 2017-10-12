import factory from './rule-factory'

// const rulesMap = Object.extend({}, rules)

const engine = {
  validate(arg) {
    const rule = factory.getRule(arg.rule)
    if (rule) {
      return rule(arg.value, arg.opt)
    } else {
      throw new Error(`rule ${arg.rule} not found`)
    }
  }
}

export default engine