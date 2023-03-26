const foodModel = require("../model/food.model");

const foodController = {
  // Get Data
  list: (req, res) => {
    foodModel
      .selectAll()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  add: (req, res) => {
    const { id, name, ingredients, image, video } = req.body;
    const data = { id, name, ingredients, image, video };

    foodModel
      .insert(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  edit: (req, res) => {
    const { id, name, ingredients, image, video } = req.body;
    const data = { id, name, ingredients, image, video };

    foodModel
      .update(data)
      .then((result) => {
        res.json({ messasge: "UPDATE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  remove: (req, res) => {
    foodModel
      .cut(req.body)
      .then((result) => {
        res.json({ messasge: "DELETE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = foodController;
