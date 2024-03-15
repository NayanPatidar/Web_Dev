const { client } = require("./pg_client");

async function AddUser(username, password, email) {
  const pg_query = ` INSERT INTO users (name , password, email) VALUES ($1 , $2, $3)`;
  const result = await client.query(pg_query, [username, password, email]);
  return result;
}

async function CheckUser(username, email) {
  const pg_query = ` SELECT user_id FROM users WHERE name = ($1) OR email = ($2)`;
  const result = await client.query(pg_query, [username, email]);
  const userId = result.rows[0]?.user_id;
  return userId;
}

async function FetchUser(user_id) {
  const pg_query = `SELECT ROW_TO_JSON(row) AS user_info 
                    FROM ( SELECT name, email FROM users 
                    WHERE user_id = ($1) ) row`;
  const result = await client.query(pg_query, [user_id]);
  return result;                    
}

module.exports = { AddUser, CheckUser };
