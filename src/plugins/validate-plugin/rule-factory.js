import rules from './rules'

// const rulesMap = Object.extend({}, rules)

const factory = {
  getRule(ruleName) {
    return rules[ruleName]
  },
  addRule(rule) {
    if (rule.validator && typeof rule.validator == 'function') {
      rules[rule.name] = rule.validator;
    } else {
      throw new Error(`rule.validator not a function`)
    }
  }
}

export default factory