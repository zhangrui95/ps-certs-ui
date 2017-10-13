import engine from './engine'

const plugin = {
  install(Vue) {
    Vue.prototype.$validate = engine.validate
    Vue.validate = engine.validate
    Vue.mixin({
      props: ['rule', 'value', 'toast', 'min', 'max'],
      methods: {
        mixinValidate() {
          if (this.rule) {
            let rules = this.rule.split(',')
            for (let i = 0; i < rules.length; i++) {
              let validateRest = engine.validate({ rule: rules[i], value: this.value, opt: { min: this.min, max: this.max } })
              if (!validateRest) {
                Vue.$vux.toast.text(this.toast)
                return false
              }
            }
            return true
          }
        }
      }
    })
  },
  $validate: engine.validate
}

export default plugin
export const install = plugin.install