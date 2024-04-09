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
                      FROM cloth_basic_info WHERE product_id IN (16,22,26) ) row;`;
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row.photos);
  } catch (error) {
    console.error("Erro fetching the images", error.message);
    throw error;
  }
}

async function FetchHomePageTShirts() {
  const pg_query = `SELECT ROW_TO_JSON(row) AS TShirts 
                    FROM ( SELECT product_name, price, GenericDesc, mrp, discount, photo1, product_id
                    FROM cloth_basic_info WHERE product_id IN (28,29,14,15)) ROW;`;
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching the Tshirt details", error.message);
    throw error;
  }
}

async function FetchAllCloths() {
  const pg_query = `SELECT ROW_TO_JSON(row) AS Cloths
	                  FROM (SELECT * FROM cloth_basic_info ) ROW;`;

  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching All Cloths");
    throw error;
  }
}

async function FetchFilteredCloths(categories, sortType, discount) {
  let pg_query;
  let values = [];

  pg_query = `SELECT ROW_TO_JSON(row) AS Cloths
                FROM (SELECT 
                  cb.product_id, 
                  cb.product_name, 
                  cb.genericdesc, 
                  cb.photo1, 
                  cb.category, 
                  cb.price, 
                  cb.discount,
                  cb.mrp,
                  array_agg(cs.size_id) 
            FROM cloth_basic_info cb
            JOIN cloth_size cs ON cb.product_id = cs.cloth_id `;
  if (categories) {
    const placeholders = categories
      .map((category, index) => `$${index + 1}`)
      .join(",");
    let categoryQuery = `WHERE category IN (${placeholders}) `;
    pg_query += categoryQuery;
  }

  if (discount) {
    let discountQuery = "";
    if (categories) {
      discountQuery += `AND`;
    } else {
      discountQuery += `WHERE`;
    }
    discountQuery += ` discount > ${discount} `;
    console.log(discountQuery + "- Discount Query");
    pg_query += discountQuery;
  }

  pg_query += `GROUP BY 
  cb.product_id, 
  cb.product_name, 
  cb.genericdesc, 
  cb.photo1, 
  cb.category, 
  cb.price, 
  cb.discount,
  cb.mrp`;

  if (sortType) {
    let sortQuery = ` ORDER BY price ${sortType}`;
    pg_query += sortQuery;
  }

  pg_query += `) row;`;

  values = categories;

  try {
    const result = await client.query(pg_query, values);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching Cloths:", error);
    throw error;
  }
}

async function TestingFetchFilteredCloths(categories, sortType, discount) {
  let pg_query;
  let values = [];

  pg_query = `SELECT ROW_TO_JSON(row) AS Cloths
                FROM (SELECT 
                  cb.product_id, 
                  cb.product_name, 
                  cb.genericdesc, 
                  cb.photo1, 
                  cb.category, 
                  cb.price, 
                  cb.discount,
                  cb.mrp,
                  array_agg(cs.size_id) 
            FROM cloth_basic_info cb
            JOIN cloth_size cs ON cb.product_id = cs.cloth_id `;
  if (categories) {
    const placeholders = categories
      .map((category, index) => `$${index + 1}`)
      .join(",");
    let categoryQuery = `WHERE category IN (${placeholders}) `;
    pg_query += categoryQuery;
  }

  if (discount) {
    let discountQuery = "";
    if (categories) {
      discountQuery += `AND`;
    } else {
      discountQuery += `WHERE`;
    }
    discountQuery += ` discount > ${discount} `;
    console.log(discountQuery + "- Discount Query");
    pg_query += discountQuery;
  }

  pg_query += `GROUP BY 
  cb.product_id, 
  cb.product_name, 
  cb.genericdesc, 
  cb.photo1, 
  cb.category, 
  cb.price, 
  cb.discount,
  cb.mrp
  
  HAVING 
    ARRAY[1, 2, 3,4] <@ array_agg(cs.size_id) `;

  if (sortType) {
    let sortQuery = ` ORDER BY price ${sortType}`;
    pg_query += sortQuery;
  }

  pg_query += `) row;`;

  values = categories;

  try {
    const result = await client.query(pg_query, values);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching Cloths:", error);
    throw error;
  }
}

async function FetchOneProduct(product_id) {
  const pg_query = `SELECT ROW_TO_JSON(row) AS product
  FROM (
    SELECT *
    FROM (
        SELECT *
        FROM cloth_basic_info
        JOIN cloth_detailed_info ON cloth_basic_info.product_id = cloth_detailed_info.product_id
      WHERE cloth_detailed_info.product_id = ${product_id}
      ) AS joined_tables
  ) AS row;`;

  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching Cloths:", error);
    throw error;
  }
}

async function CartProductsFetching() {
  const pg_query = `SELECT ROW_TO_JSON(row) AS cart
  FROM (
    SELECT * 
    FROM cloth_basic_info
    JOIN Cart ON cloth_basic_info.product_id = Cart.product_id
  ) AS row;`;

  try {
    const CartData = await client.query(pg_query);
    return CartData.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching the Cart Details");
  }
}

async function FetchUnknownUserCartProducts(cart_items) {
  pg_query = `SELECT ROW_TO_JSON(row) AS Cloths
                FROM (SELECT * FROM cloth_basic_info `;

  if (cart_items) {
    const placeholders = cart_items
      .map((category, index) => `$${index + 1}`)
      .join(",");
    let categoryQuery = `WHERE product_id IN (${placeholders}) `;
    pg_query += categoryQuery;
    pg_query += `) row;`;
  }
  try {
    const productData = await client.query(pg_query, cart_items);
    return productData.rows.map((products) => products);
  } catch (error) {
    console.error(`Error while fetching the cart_items : `, error.message);
  }
}

module.exports = {
  AddUser,
  CheckUser,
  FetchUser,
  FetchImages,
  FetchHomePageTShirts,
  FetchAllCloths,
  FetchFilteredCloths,
  FetchOneProduct,
  CartProductsFetching,
  FetchUnknownUserCartProducts,
  TestingFetchFilteredCloths,
};
