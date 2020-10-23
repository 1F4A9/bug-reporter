const fs = require("fs");
const path = require('path');

const jsonFile = {
  entries: require("../database/data.json"),
  path: path.join(__dirname, '../database/data.json'),
};

module.exports = {
  save: function () {
    return new Promise((resolve, reject) => {
      fs.writeFile(jsonFile.path, JSON.stringify(jsonFile.entries), (error) => {
        if (error) {
          console.log(error, "error in fs");
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  entries: jsonFile.entries,
};