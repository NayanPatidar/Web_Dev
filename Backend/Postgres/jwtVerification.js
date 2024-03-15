const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_key = process.env.SECTER_KEY;

function jwtVerify(token) {
  try {
    const decodedToken = jwt.verify(token, secret_key);

    const expirationTime = decodedToken.exp;

    const currentTime = Math.floor(Date.now() / 1000);

    const tokenExpiration = expirationTime - currentTime;

    if (tokenExpiration <= 0) {
      throw new Error("Token Has Been Expired !!! ");
    } else {
      console.log("Token is still valid !!");
    }
  } catch (error) {
    console.error("Invalid Token: ", error.message);
  }
}

module.exports = { jwtVerify };
