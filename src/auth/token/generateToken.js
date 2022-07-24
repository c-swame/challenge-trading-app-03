const jwt = require('../../utils/jwt');

require('../../utils/getEnvVar').config();

const jwtConfig = {
  expiresIn: '30m', // nome das chaves não deve ser alterado;
  algorithm: 'HS256',
};

module.exports = (payload, header = jwtConfig) => {
  const { codCliente, admin } = payload;
  return jwt.sign(
    { codCliente, admin },
    process.env.JWT_SECRET,
    header,
  );
};
