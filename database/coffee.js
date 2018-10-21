const db = require('./index')

const addCoffee = async coffee => {
	// this is MADNESS
	const keys = Object.keys(coffee.wheel)
		.map(taste => taste.replace('/', '_').replace(' ', '_'))
		.join(', ')
	const values = Object.values(coffee.wheel).join(', ')

	await db.use('coffee')

	const res = await db.transaction([
		`INSERT INTO wheels (${keys}) VALUES (${values});`,
		`INSERT INTO cups (title, timestamp, description, wheel_id) VALUES (${
			coffee.cup.title ? coffee.cup.title : "''"
		}, '${coffee.cup.timestamp}','',LAST_INSERT_ID());`,
	])
}

const getCupList = async () => {
	const res = await db.query(`SELECT title, timestamp, description FROM coffee.cups`)
	return res
}

module.exports = {
	addCoffee,
	getCupList,
}
