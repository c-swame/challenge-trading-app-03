const { response } = require('../../app');
// const HttpsStatus = require('../../utils/statusCode');

module.exports = async (err, _req, _res, next) => {
  console.log('***error', err.message);
  response.status(500).json({ err });

  next(err);
};
