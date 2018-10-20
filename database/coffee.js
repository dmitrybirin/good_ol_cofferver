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
		`INSERT INTO cups (title, date, description, wheel_id) VALUES ('a', '1997-06-10','c',LAST_INSERT_ID());`,
	])
	console.log(res)
}
module.exports = {
	addCoffee,
}
