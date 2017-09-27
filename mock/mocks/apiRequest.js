
const routes = {
  '/api/apiRequest/reload.json': {
    handle: function (req, res) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  },
  '/api/apiRequest/reset.json': {
    handle: function (req, res) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  },
  '/api/menu/reload.json': {
    handle: function (req, res) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  }
}

module.exports = routes
