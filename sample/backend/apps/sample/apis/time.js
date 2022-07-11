exports.doService = async (jsonReq) => {
  try {
    return new Date().toString();
  } catch (error) {
    console.log(error);
  }
};
