const Koa = require('koa')
const koaBody = require('koa-body');

const err = require('./middlewares/error')
const { routes, allowedMethods} = require('./routes')


const app = new Koa()
const port = 3000

app.use(err);
app.use(koaBody());
app.use(routes());
app.use(allowedMethods());


console.log(`Listen to the port ${port}`)
app.listen(port)