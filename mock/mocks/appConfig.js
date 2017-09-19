const routes = {
  'post /example/api/appConfig/valueAll.json': {
    handle: function (req, res, next) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({value: '6.11'}))
    }
  },
  '/example/api/appConfig/configAll.json': {
    handle: function (req, res, next) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 0}))
    }
  },
  '/example/api/appConfig/addInnerUser.json': {
    handle: function (req, res, next) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  },
  '/example/api/appConfig/setInnerTimeWindow.json': {
    handle: function (req, res, next) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  },
  '/example/api/appConfig/saveInnerType.json': {
    handle: function (req, res, next) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  }
}

module.exports = routes
