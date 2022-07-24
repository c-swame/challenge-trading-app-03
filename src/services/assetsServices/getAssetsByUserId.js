const { sequelize } = require('../../database/models');

module.exports = async (userId, mockTest = {}) => {
  const query = `
SELECT ac.codCliente, ac.codAtivo, ac.quantidade qtdeAtivo, a.Valor
FROM trading_app_dev.AtivosClientes as ac
JOIN trading_app_dev.Ativos as a
ON ac.codAtivo = a.codAtivo
WHERE codCliente = :userId;
  `;

  const [userAssets] = mockTest.modelReturn || await sequelize.query(query, {
    replacements: { userId },
  });
  return userAssets;
};
