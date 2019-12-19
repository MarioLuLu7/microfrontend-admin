const {
  name,
  host,
  port,
  outputHtml
} = require('./src/config/config')

module.exports = {
  publicPath: `http://${host}:${port}/`,
  devServer: {
    host,
    port
  },
  pages: {
    index: {
      entry: 'src/main.dev.js',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    if (!outputHtml) {
      config.entryPoints.clear()
      config.devServer.headers({
        'Access-Control-Allow-Origin': '*'
      })
      config.entry(name).add('./src/main.js').end()
      config.output
        .filename('app.js')
        .library(name)
        .libraryTarget('amd')
        .end()
    }
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({
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