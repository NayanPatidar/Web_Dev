const { client } = require("./pg_client");

async function AddUser(username, password) {
  const pg_query = ` INSERT INTO users (name , password) VALUES ($1 , $2)`;
  const result = await client.query(pg_query, [username, password]);
  return result;
}

module.exports = { AddUser };
