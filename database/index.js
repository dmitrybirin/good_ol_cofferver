const mysql = require("mysql");

const host = process.env.DB_HOST || "mysql";

const connection = mysql.createConnection({
  host: host,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const sleep = time => new Promise(res => setTimeout(res, time));

const attempts = 10;

connection.connect(async err => {
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
    return connection;
  }
});

module.exports = connection;
