const AUTH_CONFIG = require('../config')
const jwksRsa = require('jwks-rsa')
const jwt = require('koa-jwt')

const jwtError = (ctx, next) =>
	next().catch(err => {
		if (401 == err.status) {
			throw new Error(
				'Authorization error on protected resource, use Authorization header or check server configuration'
			)
		} else {
			throw err
		}
	})

const checkJwt = jwt({
	audience: AUTH_CONFIG.clientId,
	issuer: `${AUTH_CONFIG.domain}/`,
	algorithms: ['RS256'],
	secret: jwksRsa.koaJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${AUTH_CONFIG.domain}/.well-known/jwks.json`,
	}),
})

module.exports = { jwtError, checkJwt }
