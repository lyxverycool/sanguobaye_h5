const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())


app.use(historyApiFallback({ whiteList: ['/api'] }))
app.use(require('koa-static')(__dirname + '/src'))


// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
});

module.exports = app
