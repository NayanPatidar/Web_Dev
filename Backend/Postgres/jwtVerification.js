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
      console.error("Token Has Been Expired !!! ");
      return false;
    } else {
      console.log("Token is still valid !!");
      return true;
    }
  } catch (error) {
    console.error("Invalid Token: ", error.message);
    return false;
  }
}

module.exports = { jwtVerify };
