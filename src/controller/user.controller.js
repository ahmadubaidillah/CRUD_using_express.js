const userModel = require("../model/user.model");
const { response } = require("../helper/response");
const { responseError } = require("../helper/response");
const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateSecret");

const userController = {
  // Get Data
  list: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        response(res, result.rows, 200, "GET DATA SUCCES");
      })
      .catch((err) => {
        response(res, err, 400, "data error");
      });
  },

  register: async (req, res) => {
    try {
      const { id, name, email, password, level } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.json({ message: "failed hash password" });
        }
        const data = { id, name, email, password: hash, level };
        userModel
          .insert(data)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  },

  edit: (req, res) => {
    const { id, name, email, password } = req.body;
    const data = { id, name, email, password };

    userModel
      .update(data)
      .then((result) => {
        res.json({ messasge: "UPDATE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  remove: (req, res) => {
    userModel
      .cut(req.body)
      .then((result) => {
        res.json({ messasge: "DELETE DATA SUCCES", result });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    // const dataLogin = { email, password };
    userModel
      .loginUser(email)
      .then((data) => {
        // const userAuth = data.rows[0].level;
        // res.json({ messasge: "LOGIN SUCCES", result });
        if (data.rowCount > 0) {
          bcrypt
            .compare(password, data.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  email: result.rows,
                  // level: userAuth,
                });
                res.json({
                  message: "OK",
                  token,
                });
              } else {
                res.json({ messasge: "gagal" });
              }
            });
        } else {
          res.json({
            messasge: "LOGIN GAGAL , EMAIL ATAU PASSWORD SALAH",
            data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // res.json({ messasge: "LOGIN GAGAL", err });
      });
  },

  paginate: (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    // total page and data
    // const allData = await userModel;
    // const totalData = Number()
    userModel
      .paginate(limitValue, offsetValue)
      .then((result) => {
        const pagination = {
          currenPage: pageValue,
          dataperPage: limitValue,
        };
        res.json({
          message: "pagination succes",
          data: result.rows,
          result: pagination,
        });
      })
      .catch((err) => {
        responseError(res, err, 400, "data error");
      });
  },
};
module.exports = userController;
