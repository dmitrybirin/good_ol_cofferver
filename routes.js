const Router = require('koa-router')

const router = new Router()

const { jwtError, checkJwt } = require('./middlewares/jwt')
const coffee = require('./database/coffee')

const getIdFromJwt = ctx => ctx.state && ctx.state.user && ctx.state.user.sub.split('|')[1]

router
    .get('/health', async ctx => {
        ctx.status = 200
        ctx.body = {
            status: 'ok',
            data: `I'm ok`,
        }
    })
	.use(jwtError)
	.use(checkJwt)
	.get('/coffee', async ctx => {
		try {
			const result = await coffee.getCupList(getIdFromJwt(ctx))
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
			await coffee.addCup({ id: getIdFromJwt(ctx), cup: ctx.request.body })
			ctx.status = 204
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
