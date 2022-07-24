const { Ativos } = require('../../database/models');

module.exports = async (assetId, mockTest = {}) => {
  const users = mockTest.modelReturn || await Ativos
    .findByPk(assetId, { attributes: { exclude: ['criadoEm', 'atualizadoEm'] } });
  return users;
};
