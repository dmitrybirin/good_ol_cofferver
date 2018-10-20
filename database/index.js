const mysql = require("mysql");


const sleep = time => new Promise(res => setTimeout(res, time));



class Database {
  constructor({host, user, password}) {
    this.connection = mysql.createConnection({host, user, password});
    this.attempts = 10

    this.connection.connect(async err => {
      let count = 0;
      while (err && count < attempts) {
        count++
        console.error("error connecting: " + err.stack);
        console.log('Waiting... ', +new Date())
        await sleep(1000);
      }
      if (err) {
        console.error("Failed to connect to the database host: ", host);
        process.exit(1);
        return;
      } else {
        return
      }
    });
  }

  rollback(err){ this.connection.rollback(() => Promise.reject(err))}

  async use(){
    await this.query(`USE coffee;`)
  }

  query(query, transaction=false) {
    return new Promise((res, rej) => {
      this.connection.query(query, (err, results) => {
        if (err) transaction ? this.rollback(err) :rej(err)
        else res(results)
      })
    })
  }

  async transaction(queryArray) {
    return new Promise((res, rej) => {
      this.connection.beginTransaction((err) => {
        if (err) rej(err)
        queryArray.map( async query => await this.query(query, true))

        this.connection.commit((err) => {
          if (err) this.rollback(err)
          res('success')
        });
      })
    })
  }
}

const host = process.env.DB_HOST || "mysql";
    
const db = new Database({host, user: process.env.DB_USER, password: process.env.DB_PASS})


module.exports = db;
