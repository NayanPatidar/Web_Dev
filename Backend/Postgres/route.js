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
    methods: ["GET", "POST"],
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
      expiresIn: "2h",
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

    if (await AddUser(username, email, password)) {
      console.log(`User Added Successfully`);
      res.status(201).json({ message: "Signup successful" });
    } else {
      console.log(`Failed Adding User `);
      res.status(400).json({ message: "Signup failed" });
    }
  } catch (error) {
    console.error("Error during signup : ", error.message);
  }
});

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
    console.log(images);
    res.json({ images });
  } catch (error) {
    res.send(401).json({ error: "Images Not Found " });
  }
});

app.get("/mainpage/TShirts", async (req, res) => {
  try {
    const tshirtsDetails = await FetchHomePageTShirts();
    console.log(tshirtsDetails);
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
      console.log("This is the Fetch All Cloths");
      const clothsData = await FetchAllCloths();
      return res.json({ clothsData });
    }
    console.log("This is filtering data");

    if (search) {
      category = "";
    }

    console.log(category);

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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers);
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

app.post("/addCardItem", verifyToken, async (req, res) => {
  const userId = req.user.userData.user_id;
  const productId = req.body.product_id;
  const quantity = req.body.quantity;
  const size = req.body.size;
  console.log(`${userId} ${productId} ${quantity} ${size}`);

  try {
    const ItemPresence = await CheckCartItem(userId, productId, size);
    console.log(ItemPresence);

    if (size != undefined && quantity != undefined  ) {
      if (ItemPresence.length == 0 && userId && productId && quantity && size) {
        AddCartItem(userId, productId, quantity, size);
        res.json({ message: "Item Added To Cart" });
      } else if (!CheckSizePresence(size, ItemPresence)) {
        AddCartItem(userId, productId, quantity, size);
        res.json({ message: "Item Added To Cart With Different Size" });
      } else if (
        CheckQuantityPresence(quantity, userId, productId, size, ItemPresence)
      ) {
        UpdateCartItem(size, quantity, userId, productId);
        res.json({ message: "Item quantity increased" });
      }
    }
  } catch (error) {
    console.log("Error while Add Cart Item : ", error.message);
    res.json({ message: `Error While Adding Item To Cart : ${error.message}` });
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
  console.log(size);
  ItemPresence.map((item) => (present = item.product.size == size.toString()));
  console.log(`Present - ${present}`);
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
  console.log(`Present - ${present}`);
  return present;
}

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
