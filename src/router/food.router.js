const express = require("express");

const {
  list,
  add,
  edit,
  remove,
  search,
  sort,
} = require("../controller/food.controller");

const router = express.Router();

router.get("/food", list);
router.post("/food_add", add);
router.put("/food_edit", edit);
router.delete("/food_delete/:id", remove);
router.get("/food_search", search);
router.get("/food_sort", sort);
module.exports = router;
