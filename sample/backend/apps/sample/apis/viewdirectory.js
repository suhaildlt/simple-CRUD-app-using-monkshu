const connection = require("../db/sqlconfig");

exports.doService = async (jsonReq) => {
  const query = "SELECT * FROM call_directory";
  //   https://stackoverflow.com/questions/36547292/use-promise-to-process-mysql-return-value-in-node-js
  return new Promise(function async(resolve, reject) {
    try {
      connection.query(query, (error, allData) => {
        if (error) reject(error);
        resolve(allData);
      });
    } catch (error) {
      reject(error);
    }
  });
};
