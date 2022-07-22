const jwt = require('../../utils/jwt');

require('../../utils/getEnvVar').config();

const jwtConfig = {
  expiresIn: '30m', // nomde das chaves não deve ser alterado;
  algorithm: 'HS256',
};

module.exports = (payload, header = jwtConfig) => (
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    header,
  )
);
