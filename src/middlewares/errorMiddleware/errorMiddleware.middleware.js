// const HttpsStatus = require('../../utils/statusCode');

module.exports = async (err, _req, res, next) => {
  console.log('***error', err.message);
  res.status(500).json({ err });

  next(err);
};
