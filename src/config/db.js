//connect to database

const pg = require("pg");
const db = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "opera890",
  database: "db_food_recipe",
  port: "5432",
});

// Check connection

db.connect((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = db;
