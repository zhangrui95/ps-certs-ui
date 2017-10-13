import engine from './engine'

const plugin = {
  install(Vue) {
    Vue.prototype.$validate = engine.validate
    Vue.validate = engine.validate
    Vue.mixin({
      methods: {
        props: ['rule', 'value', 'toast', 'min', 'max'],
        onValid() {
          if (this.rule) {
            let rules = this.rule.split(',')
            for (let i = 0; i < rules.length; i++) {
              let validateRest = Vue.$validate({ rule: rules[i], value: this.value, opt: { min: this.min, max: this.max } })
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

    Vue.directive('blur', {
      inserted: function(el, binding, vnode) {
        vnode.onValid = function() {
          let rules = binding.value.rule.split(',')
          let { toast, value, min, max } = binding.value
          for (let i = 0; i < rules.length; i++) {
            let validateRest = Vue.$validate({ rule: rules[i], value, opt: { min, max } })
            if (!validateRest) {
              Vue.$vux.toast.text(toast)
              return false
            }
          }
          return true
        }
      }
    })
  },
  $validate: engine.validate
}

export default plugin
export const install = plugin.install