const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

// router
const userRouter = require("./src/router/user.router");
const foodRouter = require("./src/router/food.router");

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(userRouter);
app.use(foodRouter);

app.listen(4000, () => {
  console.log("SERVER LISTEN ON PORT 4000");
});
