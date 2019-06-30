const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/vue', {
    target: 'http://localhost:5200/',
    // target: 'http://47.102.104.100:5100/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/vue": "/vue"
    }
  })),
  app.use(proxy('/react', {
    target: 'http://localhost:5200/',
    // target: 'http://47.102.104.100:5100/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/react": "/react"
    }
  }))
  ,
  app.use(proxy('/cloudmusic', {
    target: 'https://api.imjad.cn',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/cloudmusic': '/cloudmusic'
    }
  }))

}