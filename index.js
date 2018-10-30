const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const err = require('./middlewares/error')
const { routes, allowedMethods } = require('./routes')
const db = require('./database')
const AUTH_CONFIG = require('./config')

const app = new Koa()
const port = 3000

app.use(err)
app.use(cors({ origin: AUTH_CONFIG.allowedOrigin }))
app.use(koaBody())
app.use(routes())
app.use(allowedMethods())

console.log(`Listen to the port ${port}`)
const server = app.listen(port)

process.on('SIGTERM', () => {
	console.info('SIGTERM signal received.')
	console.log('Closing db connection')
	db.connection.end()
	server.close(() => {
		console.log('Http server closed.')
	})
})
