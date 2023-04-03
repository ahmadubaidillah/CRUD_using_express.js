const foodModel = require("../model/food.model");
const { response, responseError } = require("../helper/response");
const clientRedis = require("../config/redis");
const fs = require("fs-extra");

const foodController = {
  // Get Data
  list: (req, res) => {
    foodModel
      .selectAll()
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  add: (req, res) => {
    const { id, name, ingredients, video } = req.body;
    const image = req.file.filename;
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
    const { id, name, ingredients, video } = req.body;
    const image = req.file.filename;
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
    const id = req.params.id;

    const body = req.body;
    fs.unlinkSync(`${id}`);
    const data = { id, body };
    foodModel
      .cut(data)
      .then((result) => {
        res.json({ messasge: "DELETE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  search: (req, res) => {
    const name = req.params.name;
    const body = req.body;
    const data = { name, body };
    foodModel
      .searchByName(data)
      .then((result) => {
        res.json({ messasge: "SEARCH BY NAME", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  sort: (req, res) => {
    foodModel
      .sortByNameAsc()
      .then((result) => {
        res.json({ messasge: "SEARCH BY NAME", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getById: (req, res) => {
    const id = req.params.id;
    foodModel
      .selectById(id)
      .then((result) => {
        const dataRedis = clientRedis.set(
          `getFromRedis/${id}`,
          JSON.stringify(result),
          {
            EX: 180,
            NX: true,
          }
        );
        res.send({
          fromCache: false,
          data: dataRedis,
        });
      })
      .catch((err) => {
        responseError(res, err.messasge, 400, "get id failed");
      });
  },
};

module.exports = foodController;
