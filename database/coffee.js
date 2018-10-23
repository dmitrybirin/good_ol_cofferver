const db = require('./index')

const addCup = async cup => {
	// this is MADNESS
	const keys = Object.keys(cup.wheel)
		.map(taste => taste.replace('/', '_').replace(' ', '_'))
		.join(', ')
	const values = Object.values(cup.wheel).join(', ')

	await db.use('coffee')

	const res = await db.transaction([
		`INSERT INTO wheels (${keys}) VALUES (${values});`,
		`INSERT INTO cups (title, timestamp, description, wheel_id) VALUES ('${
			cup.title ? cup.title : ''
		}', '${cup.timestamp}', '', LAST_INSERT_ID());`,
	])
}

const getCupList = async () => {
	const res = await db.query(`SELECT title, timestamp, description FROM coffee.cups`)
	return res
}

module.exports = {
	addCup,
	getCupList,
}
