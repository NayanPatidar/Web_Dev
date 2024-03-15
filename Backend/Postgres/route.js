const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { AddUser, CheckUser, FetchUser } = require("./services");
const { generateJWT } = require("./jwtGeneration");

const PORT = 8080;
app.use(bodyParser.json());

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
    const decodedToken = await 
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid Token" });
  }
});

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
