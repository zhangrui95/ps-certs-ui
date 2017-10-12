import rules from './rules'

// const rulesMap = Object.extend({}, rules)

const factory = {
  getRule (ruleName) {
    return rules[ruleName]
  },
  addRule (rule) {
    rules[rule.name] = rule
  }
}

export default factory
