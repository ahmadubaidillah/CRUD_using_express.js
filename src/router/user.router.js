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
const { isAdmin } = require("../middleware/authorization");
const upload = require("../middleware/upload");
const router = express.Router();
// auth, isAdmin,
router.get("/user", list);
router.post("/user_register", upload, register);
router.put("/user_edit", edit);
router.delete("/user_delete", remove);
router.post("/user_login", login);
router.get("/user_pagination", paginate);

module.exports = router;
