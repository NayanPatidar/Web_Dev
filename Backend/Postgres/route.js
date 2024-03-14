const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { AddUser, CheckUser } = require("./services");

const PORT = 8080;
app.use(bodyParser.json());

app.get("/user/signin", async (req, res) => {
  const { name, password } = req.body;
  console.log(`${name} tried to sign in with the password ${password}`);

  const userId = await CheckUser(name, password);
  // if (userId )
  console.log("User ID:", userId);

  res.send("Sign In Request has been made !!");
});

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
