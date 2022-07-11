const connection = require("../db/sqlconfig");
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);

exports.doService = async (jsonReq) => {
  const query =
    "INSERT INTO call_directory (name,number) VALUES ('" +
    jsonReq.name +
    "','" +
    jsonReq.number +
    "')";
  console.log(query);

  return new Promise(function (resolve, reject) {
    try {
      connection.query(query, (error, result) => {
        if (error) reject(error);
        resolve(API_CONSTANTS.API_RESPONSE_TRUE);
      });
    } catch (error) {
      reject(error);
    }
  });
};
