const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  // port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  // When testing, comment out 'password' key, but keep in 'port' key. When Deploying, comment out 'port' key, and uncomment 'password' key so that it is active
};

const db = pgp(cn);

db.connect()
  .then((obj) => {
    // Can check the server version here
    const serverVersion = obj.client.serverVersion;
    console.log("postgres connection established");
    obj.done(); // success, release the connection
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;
