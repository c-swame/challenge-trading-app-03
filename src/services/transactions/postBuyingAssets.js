const {
  Transacoes,
  AtivosClientes,
  Ativos,
  User,
  sequelize,
} = require('../../database/models');

module.exports = async (transactionData, mockTest = {}) => {
  const buyingAssetsTransaction = await sequelize.transaction();
  // const { codAtivo, codCliente, qtdeAtivo } = transactionData;
  try {
    Ativos.update(
      { QtdeAtivo: sequelize.literal(`QtdeAtivo - ${transactionData.qtdeAtivo}`) },
      {
        where: { codAtivo: transactionData.codAtivo },
        transaction: buyingAssetsTransaction,
        instance: Ativos,
      },
    );

    const assetData = await Ativos.findByPk(transactionData.codAtivo, { raw: true });

    User.update(
      { saldo: sequelize.literal(`saldo - ${transactionData.qtdeAtivo * assetData.Valor}`) },
      { where: { codCliente: transactionData.codCliente }, transaction: buyingAssetsTransaction },
    );

    AtivosClientes.upsert({
      codCliente: transactionData.codCliente,
      codAtivo: transactionData.codAtivo,
      qtdeAtivo: transactionData.qtdeAtivo,
      codOperacao: 'compra',
    }, { transaction: buyingAssetsTransaction });

    const transaction = mockTest.modelReturn || await Transacoes
      .create({
        codCliente: transactionData.codCliente,
        codAtivo: transactionData.codAtivo,
        qtdeAtivo: transactionData.qtdeAtivo,
        valor: (transactionData.qtdeAtivo * assetData.Valor),
        codOperacao: 'compra',
      }, { transaction: buyingAssetsTransaction });
    await buyingAssetsTransaction.commit();
    return transaction;
  } catch (err) {
    await buyingAssetsTransaction.rollback();
    console.log('*** error', err.message);
    throw err;
  }
};
