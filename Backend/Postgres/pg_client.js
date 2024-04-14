const { Client } = require("pg");
require("dotenv").config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const client = new Client({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: "5432",
});

// const connectionString = process.env.POSTGRES_SUPABASE_CONNECTION_STRING;
// const client = new Client({
//   connectionString,
// });

client
  .connect()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { client };
