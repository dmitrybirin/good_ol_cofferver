const mysql = require('mysql')

const sleep = time => new Promise(res => setTimeout(res, time))

class Database {
	constructor({ host, user, password }) {
		this.connection = mysql.createConnection({ host, user, password })
		this.attempts = 10

		this.connection.connect(async err => {
			let count = 0
			while (err && count < this.attempts) {
				count++
				console.error('error connecting: ' + err.stack)
				console.log('Waiting... ', +new Date())
				await sleep(1000)
			}
			if (err) {
				console.error('Failed to connect to the database host: ', host)
				process.exit(1)
				return
			} else {
				return
			}
		})
	}

	beginTransaction() {
		return new Promise((res, rej) =>
			this.connection.beginTransaction(err => {
				console.log('Begin transaction')
				if (err) rej(err)
				else res()
			})
		)
	}

	rollback() {
		console.log('Rollback...')
		this.connection.rollback()
	}

	commit() {
		console.log('Commiting...')
		return new Promise((res, rej) =>
			this.connection.commit(err => {
				if (err) rej(err)
				else res()
			})
		)
	}

	async use() {
		await this.query(`USE coffee;`)
	}

	query(query) {
		return new Promise((res, rej) => {
			this.connection.query(query, (err, results) => {
				if (err) rej(err)
				else res(results)
			})
		})
	}

	async transaction(queryArray) {
		try {
			await this.beginTransaction()
			for await (const query of queryArray) {
				try {
					this.query(query)
				} catch (err) {
					this.rollback()
					throw err
				}
			}
			await this.commit()
		} catch (err) {
			this.rollback()
			throw err
		}
	}
}

const host = process.env.DB_HOST || 'mysql'

const db = new Database({ host, user: process.env.DB_USER, password: process.env.DB_PASS })

module.exports = db
