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
	.get('/coffee', async ctx => {
		try {
			const result = await coffee.getCupList()
			ctx.status = 200
			ctx.body = {
				status: 'ok',
				data: result,
			}
		} catch (err) {
			ctx.status = err.statusCode || err.status || 500
			ctx.body = {
				status: 'error',
				message: err.message || 'unknown have thing just happened, bro:(',
			}
		}
	})
	.post('/coffee', async ctx => {
		try {
			await coffee.addCup(ctx.request.body)
			ctx.status = 204
			ctx.body = {
				status: 'ok',
				data: `I'm ok`,
			}
		} catch (err) {
			ctx.status = err.statusCode || err.status || 500
			ctx.body = {
				status: 'error',
				message: err.message || 'unknown have thing just happened, bro:(',
			}
		}
	})

module.exports = {
	routes: () => router.routes(),
	allowedMethods: () => router.allowedMethods(),
}
