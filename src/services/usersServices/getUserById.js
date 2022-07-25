const { User } = require('../../database/models');

module.exports = async (codCliente, mockTest = {}) => {
  const users = mockTest.modelReturn || await User
    .findByPk(codCliente, { attributes: { exclude: ['passwordHash', 'password'] } });
  return users;
};
