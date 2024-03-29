const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
  AddUser,
  CheckUser,
  FetchUser,
  FetchImages,
  FetchHomePageTShirts,
  FetchAllCloths,
  FetchFilteredCloths,
} = require("./services");

const { generateJWT } = require("./jwtGeneration");
const { jwtVerify } = require("./jwtVerification");

const PORT = 8080;
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/user/signin", async (req, res) => {
  const { name, password, email } = req.body;
  const userId = await CheckUser(name, email);

  if (userId == undefined || userId == 0) {
    AddUser(name, password, email);
    res.send("No Accounts Exists! So User Has Been Added !!!");
    return;
  } else {
    const user_data = await FetchUser(userId);
    const token = generateJWT(user_data);
    res.json({ token });
    return;
  }
});

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
    let category, sortType, discount;
    console.log(`${categoryFilter} - ${sorting} - ${discountFilter} `);

    if (!Array.isArray(categoryFilter) && categoryFilter != undefined) {
      category = [categoryFilter];
    } else if (!Array.isArray(categoryFilter)) {
      category = "";
    } else {
      category = categoryFilter;
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
      (!sorting || Object.keys(sorting).length === 0) &&
      (!discountFilter || Object.keys(discountFilter).length === 0)
    ) {
      console.log("This is the Fetch All Cloths");
      const clothsData = await FetchAllCloths();
      return res.json({ clothsData });
    }
    const clothsData = await FetchFilteredCloths(category, sorting, discount);
    res.json({ clothsData });
  } catch (error) {
    console.log(error.message);
    res.send(500).json({ error: " Cloths Data Not Found" });
  }
});

function extractToken(authorizedHeader) {
  if (authorizedHeader.startsWith("Bearer ")) {
    return authorizedHeader.substring(7);
  } else {
    return null;
  }
}

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
