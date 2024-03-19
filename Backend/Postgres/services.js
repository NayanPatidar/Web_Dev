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
                    FROM ( SELECT user_id, name, email FROM users 
                    WHERE user_id = ($1) ) row`;
  try {
    const result = await client.query(pg_query, [user_id]);
    return result.rows[0].user_info;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function FetchImages() {
  const pg_query = `SELECT ROW_TO_JSON(row) AS product_info 
                      FROM (	SELECT photo1
                      FROM products WHERE product_id IN (1,2) ) row;`;
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row.product_info);
  } catch (error) {
    console.error("Erro fetching the images", error.message);
    throw error;
  }
}

module.exports = { AddUser, CheckUser, FetchUser, FetchImages };
