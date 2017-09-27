
const routes = {
  '/api/app/reload.json': {
    handle: function (req, res) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({state: 1}))
    }
  }
}

module.exports = routes
