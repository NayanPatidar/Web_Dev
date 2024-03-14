const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { AddUser, CheckUser } = require("./services");

const PORT = 8080;
app.use(bodyParser.json());

app.get("/user/signin", async (req, res) => {
  const { name, password, email } = req.body;
  console.log(`${name} tried to sign in with the password ${password}`);

  const userId = await CheckUser(name, email);
  console.log("User ID:", userId);
  if (userId == undefined || userId == 0) {
    AddUser(name, password, email);
    res.send("No Accounts Exists! So User Has Been Added !!!");
    return;
  } else {
    res.send("User has been Signed In !!!");
    return;
  }
});

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
