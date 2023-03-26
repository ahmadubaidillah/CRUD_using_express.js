const express = require("express");

const { list, add, edit, remove } = require("../controller/food.controller");

const router = express.Router();

router.get("/food", list);
router.post("/food_add", add);
router.put("/food_edit", edit);
router.delete("/food_delete", remove);

module.exports = router;
