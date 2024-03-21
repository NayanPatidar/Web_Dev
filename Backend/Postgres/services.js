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
  const pg_query = `SELECT ROW_TO_JSON(row) AS photos 
                      FROM (	SELECT photo1
                      FROM tshirts WHERE product_id IN (16,22,26) ) row;`;
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row.photos);
  } catch (error) {
    console.error("Erro fetching the images", error.message);
    throw error;
  }
}

async function FetchTShirts(){
  const pg_query = `SELECT ROW_TO_JSON(row) AS TShirts 
                    FROM ( SELECT product_name, price, GenericDesc, mrp, discount, photo1 
                    FROM tshirts WHERE product_id IN (12,9,1,15)) ROW;`
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row);
  } catch (error){
    console.error("Error Fetching the Tshirt details", error.message);
    throw error;
  }
}

module.exports = { AddUser, CheckUser, FetchUser, FetchImages, FetchTShirts };
