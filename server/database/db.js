const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "050993",
  port: 5432,
});

//module.exports = pool;

const client = new Client({
  connectionString: "postgres://postgres:050993@localhost:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();
module.exports = client;

/*
Production
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
