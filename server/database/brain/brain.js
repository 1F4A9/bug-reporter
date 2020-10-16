const fs = require("fs");

const bugs = {
  entries: require("../store/bugs.json"),
  path: "./database/store/bugs.json",
};
exports.entries = bugs.entries;

exports.save = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(bugs.path, JSON.stringify(bugs.entries), (error) => {
      if (error) {
        console.log(error, "eroor in fs");
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
