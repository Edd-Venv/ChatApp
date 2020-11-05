const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "050993",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

module.exports = pool;

/*
ProDuction
const Client = require("pg").Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();
module.exports = client;

*/
