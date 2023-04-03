// query database

const db = require("../config/db");

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT*FROM users", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  insert: ({ id, name, email, password, level }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into users (id,name,email,password,level) values (${id},'${name}','${email}','${password}',${level})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  update: ({ id, name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update users set name='${name}', email='${email}', password='${password}' where id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  cut: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from users where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  loginUser: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where email='${email}' `, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  paginate: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users limit ${limit} offset ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = userModel;
