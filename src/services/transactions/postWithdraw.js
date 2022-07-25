const {
  User,
} = require('../../database/models');

module.exports = async (transactionData, mockTest = {}) => {
  const { codCliente, valor } = transactionData;

  // depositos não serão salvos na tablea transações por hora, pois isso iria requer uma edição na model ou no esquema de tablas, algo que eu não conseguiria fazer no momento para entregar a tempo;

  const userData = await User.findByPk(codCliente);

  if (+userData.saldo < +valor) throw new Error('saldo indisponível');

  const [depositData] = mockTest.modelReturn || await User.update(
    { saldo: (+userData.saldo - +valor), codOperacao: 'saque' },
    { where: { codCliente } },
  );

  return depositData;
};
