const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { z, array } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

const {
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
  GetPermanentUserCartItemsPriceDetails,
  AddOrderDetailsForUser,
} = require("./services");

const { generateJWT } = require("./jwtGeneration");
const { jwtVerify } = require("./jwtVerification");

const SignupSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

const SignInSchema = z.object({
  email: z.string().email(),
});

const PORT = 8080;
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/signin", async (req, res) => {
  const data = req.body;
  console.log(data);
  const validating = validateSigninData(data);
  if (!validating) {
    return res.json(400).json({ message: "Validation Error" });
  }
  const email = data.email;
  const password = data.password;
  const password_hashed = await CheckUser(email);

  if (password_hashed == undefined || password_hashed == 0) {
    console.log(`Password is undefined`);
    return res.json({ message: "No Accounts Exists !!!" });
  } else {
    if (await comparePassword(password, password_hashed.password_hash)) {
      console.log("Logged In");
    } else {
      console.log(`Wrong Credentials`);
      return res.json({ message: "Wrong Credentials !!!" });
    }
    const user_data = await FetchUser(password_hashed.user_id);
    const token = jwt.sign({ userData: user_data }, JWT_SECRET_KEY, {
      expiresIn: "12h",
    });
    res.json({ token });
    return;
  }
});

const validateSigninData = (data) => {
  try {
    SignInSchema.parse(data);
    return true;
  } catch (error) {
    console.error("Error validating signin data:", error.errors);
    return false;
  }
};

app.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const validating = validateSignupData(data);
    if (!validating) {
      return res.json(400).json({ message: "Validation Error" });
    }

    console.log("Received valid signup data:", data);

    const username = data.username;
    const email = data.email;
    const password = await hashPassword(data.password);

    const password_hashed = await CheckUser(email);

    if (password_hashed == undefined || password_hashed == 0) {
      await AddUser(username, email, password);
      console.log(`User Added Successfully`);
      NewUserAddDefaultAddress(email);
      res.status(201).json({ message: "Signup successful" });
    } else {
      console.log(`User Already Exist `);
      res.status(400).json({ message: "User already exist" });
    }
  } catch (error) {
    console.error("Error during signup : ", error.message);
    res.status(400);
  }
});

const NewUserAddDefaultAddress = async (email) => {
  try {
    const password_hashed = await CheckUser(email);

    if (await AddDefaultAddress(password_hashed.user_id)) {
      console.log("Added Default Address");
    } else {
      console.log("Unable to add Default Address");
    }
  } catch (error) {
    console.error("Error during Adding Deafult Address  :", error.message);
  }
};

const validateSignupData = (data) => {
  try {
    SignupSchema.parse(data);
    console.log("Signup data is valid.");
    return true;
  } catch (error) {
    console.error("Error validating signup data:", error.errors);
    return false;
  }
};

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error While Hashing the Password");
  }
};

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Error While Comparing the Password:", error);
    return false;
  }
};

app.get("/users/mainpage/", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.trim() !== "") {
      const token = extractToken(authHeader);
      if (jwtVerify(token)) {
        res.send("Token has been verified ! Now you  can contunue shopping");
      } else {
        res.status(400).json({ error: "Unauthorized - Invalid Token" });
      }
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid Token" });
  }
});

app.get("/mainpage/images", async (req, res) => {
  try {
    const images = await FetchImages();
    res.json({ images });
  } catch (error) {
    res.send(401).json({ error: "Images Not Found " });
  }
});

app.get("/mainpage/TShirts", async (req, res) => {
  try {
    const tshirtsDetails = await FetchHomePageTShirts();
    res.json({ tshirtsDetails });
  } catch (error) {
    res.send(401).json({ error: "Tshirts Not Found " });
  }
});

app.get("/mainpage/NewArrivals", async (req, res) => {
  try {
    const tshirtsDetails = await FetchHomePageNewArrivals();
    res.json({ tshirtsDetails });
  } catch (error) {
    res.send(401).json({ error: "Tshirts Not Found " });
  }
});

app.get("/products/men", async (req, res) => {
  try {
    const categoryFilter = req.query.category;
    const sorting = req.query.sort;
    const discountFilter = req.query.discount;
    const sizeFilter = req.query.size;
    const searching = req.query.search;
    let category, sortType, discount, size, search;

    if (!Array.isArray(categoryFilter) && categoryFilter != undefined) {
      category = [categoryFilter];
    } else if (!Array.isArray(categoryFilter)) {
      category = "";
    } else {
      category = categoryFilter;
    }

    if (!Array.isArray(sizeFilter) && sizeFilter != undefined) {
      size = [sizeFilter];
    } else if (!Array.isArray(sizeFilter)) {
      size = "";
    } else {
      size = sizeFilter;
    }

    if (sorting == undefined) {
      sortType = "";
    } else {
      sortType = sorting;
    }

    if (discountFilter == undefined) {
      discount = "";
    } else {
      discount = discountFilter;
    }

    if (searching == undefined) {
      search = "";
    } else {
      search = searching;
    }

    if (
      (!categoryFilter || Object.keys(categoryFilter).length === 0) &&
      (!sizeFilter || Object.keys(sizeFilter).length === 0) &&
      (!sorting || Object.keys(sorting).length === 0) &&
      (!discountFilter || Object.keys(discountFilter).length === 0) &&
      (!searching || searching.length === 0)
    ) {
      // console.log("This is the Fetch All Cloths");
      const clothsData = await FetchAllCloths();
      return res.json({ clothsData });
    }
    // console.log("This is filtering data");

    if (search) {
      category = "";
    }

    // console.log(category);

    const clothsData = await FetchFilteredCloths(
      category,
      sorting,
      discount,
      size,
      search
    );
    res.json({ clothsData });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ error: " Cloths Data Not Found" });
  }
});

app.get("/products/men/testing", async (req, res) => {
  try {
    const categoryFilter = req.query.category;
    const sorting = req.query.sort;
    const discountFilter = req.query.discount;
    const sizeFilter = req.query.size;
    let category, sortType, discount, size;

    if (!Array.isArray(categoryFilter) && categoryFilter != undefined) {
      category = [categoryFilter];
    } else if (!Array.isArray(categoryFilter)) {
      category = "";
    } else {
      category = categoryFilter;
    }

    if (!Array.isArray(sizeFilter) && sizeFilter != undefined) {
      size = [sizeFilter];
    } else if (!Array.isArray(sizeFilter)) {
      size = "";
    } else {
      size = sizeFilter;
    }

    if (sorting == undefined) {
      sortType = "";
    } else {
      sortType = sorting;
    }

    if (discountFilter == undefined) {
      discount = "";
    } else {
      discount = discountFilter;
    }

    if (
      (!categoryFilter || Object.keys(categoryFilter).length === 0) &&
      (!sizeFilter || Object.keys(sizeFilter).length === 0) &&
      (!sorting || Object.keys(sorting).length === 0) &&
      (!discountFilter || Object.keys(discountFilter).length === 0)
    ) {
      // console.log("This is the Fetch All Cloths");
      const clothsData = await FetchAllCloths();
      return res.json({ clothsData });
    }
    const clothsData = await TestingFetchFilteredCloths(
      category,
      sorting,
      discount,
      size
    );
    res.json({ clothsData });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ error: " Cloths Data Not Found" });
  }
});

app.get("/product/:productId", async (req, res) => {
  const params = req.params.productId;

  try {
    const productData = await FetchOneProduct(params);
    // console.log(`${JSON.stringify(productData)} `);
    res.json({ productData });
  } catch (error) {
    console.error(
      `Facing Error While Fetching Data From the DB ${error.message}`
    );
  }
});

app.get("/cart", async (req, res) => {
  try {
    const productsCart = await CartProductsFetching();
    res.json({ productsCart });
  } catch (error) {}
});

app.post("/cart/tempUser", async (req, res) => {
  try {
    let bodyData = req.body.productIds;
    if (bodyData && bodyData.length > 0) {
      const CartData = await FetchUnknownUserCartProducts(bodyData);
      res.json({ CartData });
      return;
    }
    res.json({});
  } catch (error) {
    console.log(`Error Fetching the Data : `, error.message);
  }
});

app.post("/wishlist/tempUser", async (req, res) => {
  try {
    let bodyData = req.body.productIds;
    console.log("Fetch Wishlist Data");
    if (bodyData && bodyData.length > 0) {
      const CartData = await FetchUnknownUserCartProducts(bodyData);
      res.json({ CartData });
      return;
    }
    res.json({});
  } catch (error) {
    console.log(`Error Fetching the Data : `, error.message);
  }
});

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    const UserPresence = await CheckUser(req.user.userData.email);
    if (UserPresence == undefined || UserPresence == 0) {
      console.log("User Not Present");
      throw new Error();
    }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
app.post("/UpdateUserCart", verifyToken, async (req, res) => {
  const userId = req.user.userData.user_id;
  const productId = req.body.product_id;
  const quantity = req.body.quantity;
  const size = req.body.size;
  const cartItemId = req.body.cart_item_id;

  try {
    console.log("Update User Cart");
    UpdateCartItem(cartItemId, userId, productId, quantity, size);
    res.json({ message: "Item Updated In Cart" });
  } catch (error) {
    console.error("Error While Updating Cart: ", error.message);
  }
});

app.delete("/DeleteUserCartItem", verifyToken, async (req, res) => {
  const cartItemId = req.body.cart_item_id;
  try {
    console.log("Delete User Cart");
    const deleteCartItem = await DeleteCartItem(cartItemId);
    res.json({ message: "Item Deleted In Cart" });
  } catch (error) {
    console.error("Error While Deleting Cart: ", error.message);
  }
});

app.post("/AddUserCart", verifyToken, async (req, res) => {
  const userId = req.user.userData.user_id;
  const productId = req.body.product_id;
  const quantity = req.body.quantity;
  const size = req.body.size;

  try {
    const ItemPresence = await CheckCartItem(userId, productId, size);
    if (size != undefined && quantity != undefined) {
      if (ItemPresence.length == 0 && userId && productId && quantity && size) {
        AddCartItem(userId, productId, quantity, size);
        res.json({ message: "Item Added To Cart" });
      } else if (!CheckSizePresence(size, ItemPresence)) {
        AddCartItem(userId, productId, quantity, size);
        res.json({ message: "Item Added To Cart With Different Size" });
      } else {
        console.log("Item Already Present ");
      }
    }
  } catch (error) {
    console.log("Error while Add Cart Item : ", error.message);
    res.json({ message: `Error While Adding Item To Cart : ${error.message}` });
  }
});

app.get("/cart/PermUserData", verifyToken, async (req, res) => {
  try {
    const CartData = await GetPermanentUserCartDetails(
      req.user.userData.user_id
    );
    res.json({ CartData });
    return;
  } catch (error) {
    res.json({ message: `Error is Fetching ${error.message}` });
    console.log(`Error Fetching the Data : `, error.message);
  }
});

app.post("/checkout/PermUserData/Details", verifyToken, async (req, res) => {
  try {
    const CartData = await GetPermanentUserCartItemsPriceDetails(
      req.user.userData.user_id
    );
    res.json({ CartData });
    return;
  } catch (error) {
    res.json({ message: `Error is Fetching ${error.message}` });
    console.log(`Error Fetching the Data : `, error.message);
  }
});

app.post("/order/confirmation", verifyToken, async (req, res) => {
  try {
    const productId = req.body.product_id;
    const quantity = req.body.quantity;
    const size = req.body.size;
    const amountPaid = req.body.amountPaid;
    const addressId = req.body.addressId;

    const CartData = await AddOrderDetailsForUser(
      req.user.userData.user_id,
      productId,
      quantity,
      size,
      amountPaid,
      addressId
    );
    res.json({ CartData });
    return;
  } catch (error) {
    res.json({ message: `Error in Adding Order ${error.message}` });
    console.log(`Error in Adding Order : `, error.message);
  }
});

app.get("/FetchAddress", verifyToken, async (req, res) => {
  try {
    console.log("In Fetch User Address");
    const userId = req.user.userData.user_id;
    const Address = await FetchUserAddress(userId);
    // console.log(Address[0].address.address);
    res.json({ Address });
  } catch (error) {
    console.error("Unable to Fetch the Address : ", error.message);
    res.json({ message: "Unable to Fetch the Address" });
  }
});

app.post("/address/add", verifyToken, async (req, res) => {
  try {
    const newAddress = req.body;
    const userId = req.user.userData.user_id;
    const existingAddress = await FetchUserAddress(userId);
    existingAddress[0].address.address.push(newAddress);

    console.log(JSON.stringify(existingAddress[0].address.address));
    if (
      await AddUserAddress(
        JSON.stringify(existingAddress[0].address.address),
        userId
      )
    ) {
      // console.log("Added the User Address");
      res.json({ message: "Added The Address" });
    } else {
      console.log("Failed to Add the User Address");
      res.status(400).json({ message: "Failed to add Address" });
    }
  } catch (error) {
    console.error("Unable to Add the Address : ", error.message);
    res.status(400).json({ message: "Unable to Add the Address" });
  }
});

app.delete("/address/delete", verifyToken, async (req, res) => {
  try {
    const AddressID = req.body.AddressId;
    const userId = req.user.userData.user_id;
    const existingAddress = await FetchUserAddress(userId);
    if (
      existingAddress[0].address.address.length != 0 &&
      existingAddress &&
      existingAddress != undefined
    ) {
      let userSetOne = existingAddress[0].address.address.slice(0, AddressID);
      let userSetTwo = existingAddress[0].address.address.slice(
        AddressID + 1,
        existingAddress[0].address.address.length
      );
      userSetOne = userSetOne.concat(userSetTwo);
      existingAddress[0].address.address = userSetOne;
      // console.log(JSON.stringify(existingAddress[0].address.address));
      if (
        await AddUserAddress(
          JSON.stringify(existingAddress[0].address.address),
          userId
        )
      ) {
        res.json({ message: "Deleted The Address" });
      } else {
        console.log("Failed to Delete the User Address");
        res.status(400).json({ message: "Failed to Delete Address" });
      }
    }
  } catch (error) {
    console.error("Unable to Delete the Address : ", error.message);
    res.status(400).json({ message: "Unable to Delete the Address" });
  }
});

app.put("/address/update", verifyToken, async (req, res) => {
  try {
    const AddressID = req.body.AddressId;
    const UpdatedAddress = req.body.Address;
    const userId = req.user.userData.user_id;

    const existingAddress = await FetchUserAddress(userId);
    if (
      existingAddress[0].address.address.length != 0 &&
      existingAddress &&
      existingAddress != undefined
    ) {
      const updatedAddresses = [...existingAddress[0].address.address];
      updatedAddresses[AddressID] = UpdatedAddress;
      console.log(JSON.stringify(updatedAddresses));
      if (await AddUserAddress(JSON.stringify(updatedAddresses), userId)) {
        res.json({ message: "Modified The Address" });
      } else {
        console.log("Failed to Modify the User Address");
        res.status(400).json({ message: "Failed to Modify Address" });
      }
    }
  } catch (error) {
    console.error("Unable to Modify the Address : ", error.message);
    res.status(400).json({ message: "Unable to Modify the Address" });
  }
});

app.post("/wishlist/add", verifyToken, async (req, res) => {
  try {
    const userID = req.user.userData.user_id;
    const ProductID = req.body.Product_Id;

    if (userID != undefined && userID && ProductID != undefined && ProductID) {
      const Product = await GetProductFromWishlist(userID, ProductID);
      if (
        Product == undefined &&
        (await AddProductToWishlist(userID, ProductID))
      ) {
        res.json({ message: "Added Product to Wishlist" });
      } else {
        console.log("Failed to Add the Product to Wishlist");
        res
          .status(400)
          .json({ message: "Failed to Add the Product to Wishlist" });
      }
    }
  } catch (error) {
    console.error("Unable to Add Product to Wishlist : ", error.message);
    res.status(400).json({ message: "Unable to Add Product to Wishlist" });
  }
});

app.delete("/wishlist/delete", verifyToken, async (req, res) => {
  try {
    const userID = req.user.userData.user_id;
    const ProductID = req.body.Product_Id;

    if (userID != undefined && userID && ProductID != undefined && ProductID) {
      if (await DeleteProductFromWishlist(userID, ProductID)) {
        res.json({ message: "Deleted Product from Wishlist" });
      } else {
        console.log("Failed to Delete the Product from Wishlist");
        res
          .status(400)
          .json({ message: "Failed to Delete the Product from Wishlist" });
      }
    }
  } catch (error) {
    console.error("Unable to Delete Product to Wishlist : ", error.message);
    res.status(400).json({ message: "Unable to Delete Product from Wishlist" });
  }
});

app.get("/wishlist/allProducts", verifyToken, async (req, res) => {
  try {
    const userID = req.user.userData.user_id;
    if (userID != undefined && userID) {
      const products = await FetchAllProductsFromWishlist(userID);
      res.json({ products });
    }
  } catch (error) {
    console.error("Unable to Fetch Products from Wishlist : ", error.message);
    res.status(400).json({ message: "Unable to Fetch Products from Wishlist" });
  }
});

function extractToken(authorizedHeader) {
  if (authorizedHeader.startsWith("Bearer ")) {
    return authorizedHeader.substring(7);
  } else {
    return null;
  }
}

function CheckSizePresence(size, ItemPresence) {
  let present = false;
  ItemPresence.map((item) => (present = item.product.size == size.toString()));
  return present;
}

function CheckQuantityPresence(
  quantity,
  user_id,
  product_id,
  size,
  ItemPresence
) {
  let present = false;
  ItemPresence.map(
    (item) =>
      (present =
        item.product.product_id == product_id &&
        item.product.size == size.toString() &&
        item.product.user_id == user_id &&
        item.product.quantity != quantity)
  );
  return present;
}

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
