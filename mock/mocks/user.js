
const routes = {
  '/example/api/user/jsTicket.json': {
    handle: function (req, res, next) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify({
        appid: 'test_appid',
        timestamp: new Date().getTime(),
        nonceStr: 'test_nonceStr',
        signature: 'test_signature'
      }))
    }
  }
}

module.exports = routes
