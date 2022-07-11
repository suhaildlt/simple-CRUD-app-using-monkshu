const connection = require("../db/sqlconfig");
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);

exports.doService = async (jsonReq) => {
  const query =
    "DELETE FROM call_directory WHERE id = '" + parseInt(jsonReq.id) + "'";
  return new Promise(function (resolve, reject) {
    connection.query(query, (error, callback) => {
      if (error) reject(error);
      resolve(API_CONSTANTS.API_RESPONSE_TRUE);
    });
  });
};
