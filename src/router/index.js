import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const pages = [
    'Dev',
    'Student',
    'Approve',
    'Apply'
]

export default new Router((() => {
    let routes = []
    pages.forEach(page => {
        routes.push({
            path: `/${page}`,
            component: require(`../pages/${page}`)
        })
    })
    return { routes }
})())
