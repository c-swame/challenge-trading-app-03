const jwt = require('../../utils/jwt');
const refreshJWT = require('../../auth/token/refreshJwt');
const HttpsStatus = require('../../utils/statusCode');

require('../../utils/getEnvVar').config();

const { User } = require('../../database/models');

const segredo = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const tokenPayload = jwt.verify(token, segredo);

    const user = await User.findByPk(tokenPayload.id);

    if (!user.admin) {
      return res
        .status(HttpsStatus.UNAUTHORIZED)
        .json({ message: 'must be and admin account to this request' });
    }

    const refreshToken = refreshJWT(user);
    req.headers.authorization = refreshToken;

    return next();
  } catch (err) {
    return res.status(HttpsStatus.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
