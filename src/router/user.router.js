const express = require("express");

const {
  list,
  register,
  edit,
  remove,
  login,
} = require("../controller/user.controller");

const router = express.Router();

router.get("/user", list);
router.post("/user_register", register);
router.put("/user_edit", edit);
router.delete("/user_delete", remove);
router.post("/user_login", login);

module.exports = router;
