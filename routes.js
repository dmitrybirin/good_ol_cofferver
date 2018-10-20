const Router = require('koa-router')

const router = new Router()

const coffee = require('./database/coffee')

router
	.get('/health', async ctx => {
		ctx.status = 200
		ctx.body = {
			status: 'ok',
			data: `I'm ok`,
		}
	})
	.post('/coffee', async ctx => {
		coffee.addCoffee(ctx.request.body)
		ctx.status = 204
		ctx.body = {
			status: 'ok',
			data: `I'm ok`,
		}
	})

module.exports = {
	routes: () => router.routes(),
	allowedMethods: () => router.allowedMethods(),
}
