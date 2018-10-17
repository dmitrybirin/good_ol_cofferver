const Router = require('koa-router')

const router = new Router()

router
.get('/health', async (ctx) => {
    ctx.body = {
        status: 'ok',
        data: `I'm ok`
    }
})
.post('/coffee/:id', async (ctx) => {
    console.log(ctx.params.id, ctx.request);
    ctx.body = {
        status: 'ok',
        data: `I've got this: ${JSON.stringify(ctx.request.body)}`,
    }

})

module.exports = {
    routes: () => router.routes(),
    allowedMethods: () => router.allowedMethods(),
}
