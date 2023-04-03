const express = require("express");

const {
  list,
  add,
  edit,
  remove,
  search,
  sort,
  getById,
} = require("../controller/food.controller");

const router = express.Router();
const { hitProductAll } = require("../middleware/redis");
const upload = require("../middleware/upload");

router.get("/food", list);
router.post("/food_add", upload, add);
router.put("/food_edit", edit);
router.delete("/food_delete/:id", remove);
router.get("/food_search/:name", search);
router.get("/food_sort", sort);
// REDIS
router.get("/v1/getFromRedis/:id", hitProductAll, getById);
module.exports = router;
