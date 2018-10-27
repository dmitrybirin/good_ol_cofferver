const db = require('./index')

const addCup = async ({ id, cup }) => {
	if (id) {
		// this is MADNESS
		const keys = Object.keys(cup.wheel)
			.map(taste => taste.replace('/', '_').replace(' ', '_'))
			.join(', ')
		const values = Object.values(cup.wheel).join(', ')

		await db.use('coffee')

		let userId = null
		const rows = await db.query(`SELECT id FROM users WHERE auth_id='${id}';`)

		if (rows.length === 0) {
			const res = await db.query(`INSERT INTO users (auth_id) VALUES ('${id}');`)
			userId = res.insertId
		} else {
			userId = rows[0].id
		}

		const res = await db.transaction([
			`INSERT INTO wheels (${keys}) VALUES (${values});`,
			`INSERT INTO cups (title, timestamp, description, wheel_id, user_id) VALUES ('${
				cup.title ? cup.title : ''
			}', '${cup.timestamp}', '', LAST_INSERT_ID(), ${userId});`,
		])
	} else {
		throw new Error('user id is undefined')
	}
}

const getCupList = async authId => {
	const res = await db.query(`
		SELECT cp.id, title, timestamp, description FROM coffee.cups cp
		INNER JOIN coffee.users cu ON cp.user_id=cu.id 
		WHERE cu.auth_id='${authId}'
		`)
	return res
}

module.exports = {
	addCup,
	getCupList,
}
