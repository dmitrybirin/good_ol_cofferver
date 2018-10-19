const db = require('./index')
const { promisify } = require('util')

const query = promisify(db.query)
const commit = promisify(db.commit)

// 

const addCoffee = async (coffee) => {
	const keys = Object.keys(coffee.wheel).map(taste => taste.replace('/','_').replace(' ','_')).join(', ')
	const values = Object.values(coffee.wheel).join(', ')

	// need to use it somehow different
	db.query(`USE coffee;`, (err, result) => {
		if (err) { throw err }
		else {
			console.log(result)
		}
	})

	// db.beginTransaction(async (err) =>{
	// 	if (err) { throw err; }
		
		// TODO promisify
		db.query(`INSERT INTO wheels (${keys}) VALUES (${values});`, (err, result) => {
			if (err) {return db.rollback(() =>{ throw err })} 
		})
	
		// // TODO promisify
		// db.query(`INSERT INTO cups (title, date, description, wheel_id) VALUES ('a', '1997-06-10','c',LAST_INSERT_ID());`, function (err, result) {
		// 	if (err) {return db.rollback(() =>{ throw err })}
		// }) 
		
		// try {
		// 	await commit()
		// } catch(err) {
		// 	console.log('err', err)
		// 	return db.rollback(() =>{throw err;});
		// }
		console.log('success!');

	// })
}

module.exports = {
	addCoffee
}