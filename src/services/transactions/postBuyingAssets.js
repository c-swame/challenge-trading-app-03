const {
  Transacoes,
  AtivosClientes,
  Ativos,
  User,
  sequelize,
} = require('../../database/models');

const WARNING_TIMOUT_MS = 20; // Qual a latência maxima pra um sistema desse tipo? https://www.instaclustr.com/blog/building-a-low-latency-distributed-stock-broker-application-part-3/

module.exports = async (transactionData, mockTest = {}) => {
  const buyingAssetsTransaction = await sequelize.transaction({
    benchmark: true,
    logging: ((_id, time, _options) => {
      console.log('***Time: ', time);
      if (time > WARNING_TIMOUT_MS) console.log('alerta para manutenção ou averiguação'); // !!!!!!! A IMPLEMENTAR
    }),
  });
  // const { codAtivo, codCliente, qtdeAtivo } = transactionData;
  try {
    Ativos.update(
      { QtdeAtivo: sequelize.literal(`QtdeAtivo - ${transactionData.qtdeAtivo}`) },
      {
        where: { codAtivo: transactionData.codAtivo },
        transaction: buyingAssetsTransaction,
      },
    );

    // ------

    const assetData = await Ativos.findByPk(transactionData.codAtivo, { raw: true });

    User.update(
      { saldo: sequelize.literal(`saldo - ${transactionData.qtdeAtivo * assetData.Valor}`) },
      { where: { codCliente: transactionData.codCliente }, transaction: buyingAssetsTransaction },
    );

    // ------

    const userAssetsPreviousData = (
      await AtivosClientes.findAll({
        raw: true,
        where: {
          codCliente: transactionData.codCliente,
          codAtivo: transactionData.codAtivo,
        },
      })
    )[0];

    const userAssetsNewQuantity = userAssetsPreviousData.qtdeAtivo
      ? userAssetsPreviousData.qtdeAtivo + transactionData.qtdeAtivo
      : transactionData.qtdeAtivo;

    AtivosClientes.upsert({
      codCliente: transactionData.codCliente,
      codAtivo: transactionData.codAtivo,
      qtdeAtivo: userAssetsNewQuantity,
      codOperacao: 'compra',
    }, { transaction: buyingAssetsTransaction });

    // ------

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
