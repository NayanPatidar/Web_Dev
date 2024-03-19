const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { AddUser, CheckUser, FetchUser, FetchImages } = require("./services");
const { generateJWT } = require("./jwtGeneration");
const { jwtVerify } = require("./jwtVerification");

const PORT = 8080;
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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

function extractToken(authorizedHeader) {
  if (authorizedHeader.startsWith("Bearer ")) {
    return authorizedHeader.substring(7);
  } else {
    return null;
  }
}

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
