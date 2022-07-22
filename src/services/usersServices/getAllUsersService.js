const { User } = require('../../database/models');

module.exports = async (mockTest = {}) => {
  const users = mockTest.modelReturn || await User.findAll({ attributes: { exclude: ['passwordHash'] } });
  return users;
};
