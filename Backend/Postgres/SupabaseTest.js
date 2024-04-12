const { Client } = require("pg");
require("dotenv").config();

const connectionString = process.env.POSTGRES_SUPABASE_CONNECTION_STRING;
const client = new Client({
  connectionString,
});

client
  .connect()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const fetchData = async () => {
  const pg_query = `SELECT ROW_TO_JSON(row) AS photos 
    FROM (	SELECT photo1
    FROM cloth_basic_info WHERE product_id IN (16,22,26) ) row;`;
  const data = await client.query(pg_query);
  data.rows.forEach((item) => console.log(item));
};

fetchData();
