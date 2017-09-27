const fs = require('fs')
const path = require('path')

const cache = {}
const fileCaches = {}

const getRouteKey = route => {
  const routes = route.split(' ')
  if (routes.length === 1) {
    return {key: route, method: 'ALL'}
  }
  return {key: routes[1], method: routes[0].toUpperCase()}
}

let loadMock = (mock, reload, stat, option) => {
  const mockPath = '.' + option.watch + '/' + mock
  try {
    if (reload) {
      delete require.cache[require.resolve(mockPath)]
    }
    const routes = require(mockPath)
    const fStat = stat || fs.statSync(path.join(__dirname, mockPath))
    const fileItem = {ms: fStat.ctimeMs}
    let isArr = Array.isArray(routes)
    const routesKeys = []
    const base = option.base
    for (let k in routes) {
      const item = routes[k]
      const rKey = getRouteKey(isArr ? item.route : k)
      const key = base + rKey.key
      item.method = rKey.method
      item.file = mock
      const old = cache[key]
      if (old) {
        if (old.filter(v => v.file === mock).length === 0) {
          old.push(item)
        }
      } else {
        cache[key] = [item]
      }
      routesKeys.push(key)
    }
    fileItem.routesKeys = routesKeys
    const oldFileItem = fileCaches[mock]
    fileCaches[mock] = fileItem
    if (oldFileItem && oldFileItem.routesKeys) {
      const oldRoutesKeys = oldFileItem.routesKeys
      if (oldRoutesKeys.length !== 0) {
        for (let i in oldRoutesKeys) {
          const oldKey = oldRoutesKeys[i]
          if (routesKeys.indexOf(oldKey) === -1) {
            const arr = cache[oldKey]
            if (arr && arr.length > 1) {
              cache[oldKey] = arr.filter(v => v.file !== mock)
            } else {
              delete cache[oldKey]
            }
          }
        }
      }
    }
    if (reload) {
      console.log(new Date().getTime() + ' reload mock ' + mock + ' => ' + fStat.ctimeMs)
    } else {
      console.log(' load mock ' + mock + ' => ' + fStat.ctimeMs)
    }
  } catch (e) {
    console.error(' load mock ' + mock + ' error ' + e)
  }
}

const check = () => {
  for (let i in cache) {
    if (cache[i] && cache[i].length > 1) {
      console.warn(i + ' repeat defined in ' + cache[i].map(v => v.file).join(','))
    }
  }
}

const load = option => {
  console.log(new Date().getTime() + ' load mocks start')
  const mocks = fs.readdirSync(path.join(__dirname, option.watch))
  for (let i in mocks) {
    loadMock(mocks[i], false, null, option)
  }
  check()
  console.log(new Date().getTime() + ' load mocks end')
}

const watch = option => {
  fs.watch(path.join(__dirname, option.watch), (event, file) => {
    if (!file.endsWith('.js')) {
      return
    }
    fs.stat(path.join(__dirname, option.watch + '/' + file), (e, f) => {
      if (f) {
        const fileItem = fileCaches[file]
        if (!fileItem || fileItem.ms !== f.ctimeMs) {
          loadMock(file, true, f, option)
          check()
        }
      } else {
        const fileItem = fileCaches[file]
        const routesKeys = fileItem.routesKeys
        for (let i in routesKeys) {
          const arr = cache[routesKeys[i]]
          if (arr && arr.length > 1) {
            cache[routesKeys[i]] = arr.filter(v => v.file !== file)
          } else {
            delete cache[routesKeys[i]]
          }
        }
        delete fileCaches[file]
        console.log(new Date().getTime() + ' unload mock ' + file)
      }
    })
  })
}

const getRoute = path => {
  const arr = cache[path]
  return arr === null || arr === undefined ? null : arr[0]
}

const MockMiddleware = option => {
  load(option)
  watch(option)
  return Mock(getRoute)
}

const invoke = (route, req, res) => {
  route.handle(req, res)
}

const Mock = getRoute => {
  return (req, res, next) => {
    const ret = getRoute(req.path)
    if (ret) {
      if (ret.method === 'ALL' || ret.method === req.method) {
        console.log('proxy => ' + req.method + ' ' + req.path)
        if (ret.timeout && ret.timeout > 0) {
          setTimeout(() => invoke(ret, req, res), ret.timeout)
        } else {
          invoke(ret, req, res)
        }
      } else {
        next()
      }
    } else {
      next()
    }
  }
}

module.exports = MockMiddleware
