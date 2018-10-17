const Koa = require('koa')
const err = require('./middlewares/error')

const app = new Koa()
const port = 3000

app.use(err);

app.use(async ctx => {
  throw new Error('')
  ctx.body = 'Hello World'
})

console.log(`Listen to the port ${port}`)
app.listen(port)