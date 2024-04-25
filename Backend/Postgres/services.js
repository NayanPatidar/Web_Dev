const { client } = require("./pg_client");

async function AddUser(username, password, email) {
  const pg_query = ` INSERT INTO users (name , password, email) VALUES ($1 , $2, $3)`;
  const result = await client.query(pg_query, [username, password, email]);
  return result;
}

async function CheckUser(email) {
  const pg_query = ` SELECT user_id, password_hash FROM user_data WHERE email = ($1)`;
  const result = await client.query(pg_query, [email]);
  return result.rows[0];
}

async function FetchUser(user_id) {
  const pg_query = `SELECT ROW_TO_JSON(row) AS user_info 
                    FROM ( SELECT user_id, username, email FROM user_data 
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
                      FROM (	SELECT photo1, category
                      FROM cloth_basic_info WHERE product_id IN (12,43,26) ) row;`;
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Erro fetching the images", error.message);
    throw error;
  }
}

async function FetchHomePageTShirts() {
  const pg_query = `SELECT ROW_TO_JSON(row) AS TShirts 
                    FROM ( SELECT product_name, price, GenericDesc, mrp, discount, photo1, product_id
                    FROM cloth_basic_info WHERE product_id IN (28,29,33,15,38)) ROW;`;
  try {
    const result = await client.query(pg_query);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching the Tshirt details", error.message);
    throw error;
  }
}

async function FetchHomePageNewArrivals() {
  const pg_query = `SELECT ROW_TO_JSON(row) AS TShirts 
  FROM ( SELECT product_name, price, GenericDesc, mrp, discount, photo1, product_id
  FROM cloth_basic_info WHERE product_id IN (23, 27, 5, 41)) ROW;`;
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

async function FetchFilteredCloths(
  categories,
  sortType,
  discount,
  size,
  search
) {
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
                  cd.maindescription,
                  array_agg(cs.size_id) 
            FROM cloth_basic_info cb
            JOIN cloth_size cs ON cb.product_id = cs.cloth_id 
            JOIN cloth_detailed_info cd ON cb.product_id = cd.product_id `;
  if (categories) {
    const placeholders = categories
      .map((category, index) => `$${index + 1 + values.length}`)
      .join(",");
    let categoryQuery = ` WHERE cb.category IN (${placeholders}) `;
    pg_query += categoryQuery;

    values = values.concat(categories);
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

  if (search) {
    let searchQuery = "";
    if (categories || discount) {
      searchQuery += `AND`;
    } else {
      searchQuery += `WHERE`;
    }
    searchQuery += ` genericdesc ILIKE '%${search}%' OR product_name ILIKE '%${search}%' OR maindescription ILIKE '%${search}% '
    `;
    pg_query += searchQuery;
  }

  pg_query += `GROUP BY 
  cb.product_id, 
  cb.product_name, 
  cb.genericdesc, 
  cb.photo1, 
  cb.category, 
  cb.price, 
  cb.discount,
  cb.mrp,
  cd.maindescription `;

  if (size) {
    const placeholders = size
      .map((category, index) => `$${index + 1 + values.length}`)
      .join(",");
    let categoryQuery = `HAVING 
    ARRAY[${placeholders}]::INT[] <@ array_agg(cs.size_id) `;
    pg_query += categoryQuery;
    values = values.concat(size);
  }

  if (sortType) {
    let sortQuery = ` ORDER BY price ${sortType}`;
    pg_query += sortQuery;
  }

  pg_query += `) row;`;

  console.log(pg_query);
  console.log(`${values} - Values`);
  console.log(`${search} - Search`);
  try {
    const result = await client.query(pg_query, values);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error Fetching Cloths:", error);
    throw error;
  }
}

async function TestingFetchFilteredCloths(
  categories,
  sortType,
  discount,
  size
) {
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
      .map((category, index) => `$${index + 1 + values.length}`)
      .join(",");
    let categoryQuery = ` WHERE category IN (${placeholders}) `;
    pg_query += categoryQuery;
    values = values.concat(categories);
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
  cb.mrp `;

  if (size) {
    const placeholders = size
      .map((category, index) => `$${index + 1 + values.length}`)
      .join(",");
    let categoryQuery = `HAVING 
    ARRAY[${placeholders}]::INT[] <@ array_agg(cs.size_id) `;
    pg_query += categoryQuery;
    values = values.concat(size);
  }

  if (sortType) {
    let sortQuery = ` ORDER BY price ${sortType}`;
    pg_query += sortQuery;
  }

  pg_query += `) row;`;

  console.log(pg_query);
  console.log(values);
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
  const pg_query = `SELECT ROW_TO_JSON( ) AS cart
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

async function CheckIfEmailExist(email) {
  const pg_query = `SELECT COUNT(*) AS count FROM user_data WHERE email = $1`;

  try {
    const { rows } = await client.query(pg_query, [email]);
    const { count } = rows[0];
    return count > 0;
  } catch (error) {
    console.error(`Error while checking email existence: `, error.message);
    return false;
  }
}

async function AddUser(username, email, hashedPassword) {
  const pg_query = `INSERT INTO user_data  (username, email, password_hash) VALUES
                       ( $1, $2, $3 )
                      `;

  const values = [username, email, hashedPassword];
  try {
    const result = await client.query(pg_query, values);
    console.log("Values inserted sucessfully");
    return true;
  } catch (error) {
    return false;
  }
}

async function AddCartItem(user_id, product_id, size, quantity) {
  pg_query = `INSERT INTO user_cart_data (user_id, product_id, quantity, size)
  VALUES ($1,$2, $3, $4)`;

  try {
    const result = await client.query(pg_query, [
      user_id,
      product_id,
      size,
      quantity,
    ]);
    return 1;
  } catch (error) {
    console.error("Error while inserting values: ", error.message);
    return 0;
  }
}

async function CheckCartItem(user_id, product_id) {
  pg_query = `SELECT ROW_TO_JSON(row) AS product 
  FROM (
      SELECT 
          user_id AS user_id,
          product_id AS product_id,
          quantity AS quantity,
          size AS size
      FROM user_cart_data 
      WHERE product_id = $1 AND user_id = $2
  ) as row`;

  try {
    const result = await client.query(pg_query, [product_id, user_id]);
    return result.rows.map((row) => row);
  } catch (error) {
    console.error("Error while Checking values: ", error.message);
    return 0;
  }
}

async function UpdateCartItem(cartItemId, userId, productId, quantity, size) {
  pg_query = `UPDATE user_cart_data 
  SET size = $1, quantity = $2
  WHERE id = $3 AND user_id = $4 AND product_id = $5 `;
  try {
    const result = await client.query(pg_query, [
      size,
      quantity,
      cartItemId,
      userId,
      productId,
    ]);
    return result;
  } catch (error) {
    console.error("Error while Updating values: ", error.message);
    return 0;
  }
}

async function DeleteCartItem(cartItemId, userId) {
  pg_query = `DELETE FROM user_cart_data 
  WHERE id = $1 `;

  try {
    const result = await client.query(pg_query, [cartItemId]);
    return result;
  } catch (error) {
    console.error("Error while Updating values: ", error.message);
    return 0;
  }
}

async function GetPermanentUserCartDetails(user_id) {
  pg_query = `SELECT ROW_TO_JSON(row) AS cloths FROM (
    SELECT * FROM user_cart_data uc
    JOIN cloth_basic_info cb ON cb.product_id = uc.product_id
    WHERE user_id = $1
  ) as row`;

  try {
    const productData = await client.query(pg_query, [user_id]);
    return productData.rows.map((products) => products);
  } catch (error) {
    console.error(`Error while fetching the cart_items : `, error.message);
  }
}

async function AddDefaultAddress(user_id) {
  pg_query = `INSERT INTO user_account_info (user_id, address) 
  VALUES ($1, '[{"name":"John Doe","street":" 456 Maple Avenue","city":"Anytown","state":"California","country":"United States","zipCode":"123456","mobile":"1323534683"}]');`;

  try {
    const AddAddress = await client.query(pg_query, [user_id]);
    return 1;
  } catch (error) {
    console.log("Error While Adding the Default Address : ", error.message);
    return 0;
  }
}

async function FetchUserAddress(user_id) {
  pg_query = `SELECT ROW_TO_JSON(row) AS ADDRESS FROM (
    SELECT (address) FROM user_account_info
    WHERE user_id = $1
    ) AS ROW`;

  try {
    const Address = await client.query(pg_query, [user_id]);
    return Address.rows.map((item) => item);
  } catch (error) {
    console.log("Error While Fetching Address : ", error.message);
    return 0;
  }
}

async function AddUserAddress(address, user_id) {
  pg_query = `UPDATE user_account_info
    SET address = $1 WHERE user_id = $2`;
  console.log(user_id, address);
  try {
    const Address = await client.query(pg_query, [address, user_id]);
    return 1;
  } catch (error) {
    console.log("Error While Fetching Address : ", error.message);
    return 0;
  }
}

async function AddProductToWishlist(user_id, product_id) {
  pg_query = `INSERT INTO wishlist ( user_id , product_id ) 
              VALUES ( $1 , $2 )`;
  console.log(user_id, product_id);
  try {
    await client.query(pg_query, [user_id, product_id]);
    return 1;
  } catch (error) {
    console.log("Error while Adding Product to Wishlist : ", error.message);
  }
}

async function GetProductFromWishlist(user_id, product_id) {
  pg_query = `SELECT * FROM wishlist
              WHERE user_id = $1 AND product_id = $2 `;
  console.log(user_id, product_id);
  try {
    const product = await client.query(pg_query, [user_id, product_id]);
    return product.rows[0];
  } catch (error) {
    console.log("Error while Getting Product to Wishlist : ", error.message);
  }
}

async function DeleteProductFromWishlist(user_id, product_id) {
  pg_query = `DELETE FROM wishlist
              WHERE user_id = $1 AND product_id = $2 `;
  console.log(user_id, product_id);
  try {
    const product = await client.query(pg_query, [user_id, product_id]);
    return 1;
  } catch (error) {
    console.log("Error while Getting Product to Wishlist : ", error.message);
    return 0;
  }
}

async function FetchAllProductsFromWishlist(user_id) {
  pg_query = `SELECT ROW_TO_JSON(row) AS cloths FROM (
              SELECT * FROM wishlist wl
              JOIN cloth_basic_info cb ON cb.product_id = wl.product_id
              WHERE wl.user_id = $1 
              ) as row`;
  try {
    const product = await client.query(pg_query, [user_id]);
    return product.rows.map((product) => product);
  } catch (error) {
    console.log("Error while Getting Product to Wishlist : ", error.message);
    return 0;
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
  CheckIfEmailExist,
  AddCartItem,
  CheckCartItem,
  UpdateCartItem,
  GetPermanentUserCartDetails,
  DeleteCartItem,
  AddDefaultAddress,
  FetchUserAddress,
  AddUserAddress,
  AddProductToWishlist,
  GetProductFromWishlist,
  DeleteProductFromWishlist,
  FetchAllProductsFromWishlist,
  FetchHomePageNewArrivals,
};
