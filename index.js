const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const err = require('./middlewares/error')
const { routes, allowedMethods } = require('./routes')
const db = require('./database')

const app = new Koa()
const port = 3000

const origin = process.env.ORIGIN

app.use(err)
app.use(cors({ origin }))
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
