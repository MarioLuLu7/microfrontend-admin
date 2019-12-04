const {
  name,
  host,
  port
} = require('./src/config/config')

module.exports = {
  publicPath: `http://${host}:${port}/`,
  devServer: {
    host,
    port
  },
  chainWebpack: config => {
    config.entryPoints.clear()
    config.devServer.headers({
      "Access-Control-Allow-Origin": "*",
    })
    config.entry(name).add('./src/main.js').end()
    config.output.filename('app.js').library(name).libraryTarget('amd').end()
    config.module.rule('images').use('url-loader').loader('url-loader').tap(options => ({
      limit: 4096,
      fallback: {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      }
    }))
  }
}