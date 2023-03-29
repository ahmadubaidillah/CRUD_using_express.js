require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenData = process.env.JWT_SECRET;

module.exports = async (payload) => {
  const token = await jwt.sign(payload, tokenData, { expiresIn: "30s" });
  console.log(token);
  return token;
};
