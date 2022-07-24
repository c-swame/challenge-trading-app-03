const jwt = require('../../utils/jwt');
const refreshJWT = require('../../auth/token/refreshJwt');
const HttpsStatus = require('../../utils/statusCode');

require('../../utils/getEnvVar').config();

const { User } = require('../../database/models');

const segredo = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;

  req.codCliente = undefined;
  req.isAdmin = undefined;

  if (!token) {
    return res.status(HttpsStatus.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const tokenPayload = jwt.verify(token, segredo);

    const user = await User.findByPk(tokenPayload.codCliente, {
      attributes: { exclude: ['password', 'passwordHash'] },
    });

    if (!user) {
      return res
        .status(HttpsStatus.UNAUTHORIZED)
        .json({ message: 'Invalid user data' });
    }

    const refreshToken = refreshJWT(user);
    req.tokenCodCliente = user.codCliente;
    req.isAdmin = user.admin;
    req.headers.authorization = refreshToken;

    return next();
  } catch (err) {
    return next(err);
  }
};
