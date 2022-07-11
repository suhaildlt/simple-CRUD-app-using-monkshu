const mysql = require("../3p/node_modules/mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootPass",
  database: "call_directory",
});
connection.connect((err) => {
  if (err) return console.log(err);
  LOG.info("Database connection enabled ");
});

module.exports = connection;
