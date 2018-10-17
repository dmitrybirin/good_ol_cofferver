const Koa = require('koa');
const app = new Koa();

const port = 3000

app.use(async ctx => {
  ctx.body = 'Hello World';
});

console.log(`Listen to the port ${port}`)
app.listen(port);