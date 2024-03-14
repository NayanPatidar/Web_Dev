const { client } = require("./pg_client");

async function AddUser(username, password, email) {
  const pg_query = ` INSERT INTO users (name , password, email) VALUES ($1 , $2, $3)`;
  const result = await client.query(pg_query, [username, password, email]);
  return result;
}

async function CheckUser(username, email){
  const pg_query = ` SELECT user_id FROM users WHERE name = ($1) OR email = ($2) `
  const result = await client.query(pg_query, [username, email]);
  const userId = result.rows[0]?.user_id;
  return userId;
}

module.exports = { AddUser, CheckUser };
