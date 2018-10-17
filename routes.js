const Router = require('koa-router')

const router = new Router()

router
.get('/health', async (ctx) => {
    ctx.body = {
        status: 'ok',
        data: `I'm ok`
    }
})

module.exports = {
    routes: () => router.routes(),
    allowedMethods: () => router.allowedMethods(),
}
