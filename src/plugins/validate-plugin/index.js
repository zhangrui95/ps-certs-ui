import engine from './engine'

const plugin = {
  install(Vue) {
    Vue.prototype.$validate = engine.validate
    Vue.validate = engine.validate
  },
  $validate: engine.validate
}

export default plugin
export const install = plugin.install