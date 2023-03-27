// query database

const db = require("../config/db");

const foodModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT*FROM foods", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  insert: ({ id, name, ingredients, image, video }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into foods ( id, name, ingredients, image, video ) values (${id},'${name}','${ingredients}','${image}','${video}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  update: ({ id, name, ingredients, image, video }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update foods set name='${name}', ingredients='${ingredients}', image='${image}', video='${video}' where id=${id}`,
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
      db.query(`delete from foods where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  searchByName: ({ name }) => {
    return new Promise((resolve, reject) => {
      db.query(`select*from foods where name='${name}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  sortByNameAsc: () => {
    return new Promise((resolve, reject) => {
      db.query(`select*from foods order by name asc`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = foodModel;
