const express = require("express");

const {
  list,
  register,
  edit,
  remove,
  login,
  paginate,
} = require("../controller/user.controller");
const auth = require("../middleware/staticAuth");

const router = express.Router();

router.get("/user", auth, list);
router.post("/user_register", register);
router.put("/user_edit", edit);
router.delete("/user_delete", remove);
router.post("/user_login", login);
router.get("/user_pagination", paginate);

module.exports = router;
