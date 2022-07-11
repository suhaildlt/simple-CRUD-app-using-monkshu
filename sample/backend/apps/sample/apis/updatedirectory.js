const connection = require("../db/sqlconfig");
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);

exports.doService = async (jsonReq) => {
  const query =
    "UPDATE call_directory SET name = '" +
    jsonReq.name +
    "',number = '" +
    jsonReq.number +
    "' WHERE id = '" +
    parseInt(jsonReq.id) +
    "'";
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
