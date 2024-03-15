const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_key = process.env.SECTER_KEY;

function generateJWT(user) {
  const payload = {
    id: user.user_id,
    username: user.name,
    email: user.email,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secret_key, options);
  console.log(`Secret Key :- ${secret_key} 
               Payload :- ${payload}
               Options :- ${options}
               Token :- ${token}`);
  return token;
}

module.exports = { generateJWT };
