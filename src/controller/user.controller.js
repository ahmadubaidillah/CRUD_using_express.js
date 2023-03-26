const userModel = require("../model/user.model");

const userController = {
  // Get Data
  list: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  register: (req, res) => {
    const { id, name, email, password } = req.body;
    const data = { id, name, email, password };

    userModel
      .insert(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
  login: (req, res) => {
    const email = req.body;
    userModel.loginUser(res.json({ massage: "LOGIN SUCCES", email }));
    // .then((result) => {
    //   res.json({ messasge: "LOGIN SUCCES", result });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  },
};
module.exports = userController;
