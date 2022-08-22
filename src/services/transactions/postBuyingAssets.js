const {
  Transacoes,
  AtivosClientes,
  Ativos,
  User,
  sequelize,
} = require('../../database/models');

module.exports = async (transactionData, mockTest = {}) => {
  const buyingAssetsTransaction = await sequelize.transaction();
  try {
    const { codCliente, codAtivo, qtdeAtivo } = transactionData;

    const { dataValues: assetData } = await Ativos.findByPk(codAtivo);
    const { dataValues: userData } = (await User.findByPk(codCliente));

    const expense = (assetData.Valor * qtdeAtivo);

    if (assetData.QtdeAtivo < qtdeAtivo) {
      throw new Error(`quantidade ativos máxima: ${assetData.QtdeAtivo}`);
    } else if (expense > userData.saldo) {
      throw new Error(`saldo insuficiente. Valor unitário do ativo: ${assetData.Valor}`);
    }

    await Ativos.update(
      { QtdeAtivo: (assetData.QtdeAtivo - qtdeAtivo) },
      { where: { codAtivo }, transaction: buyingAssetsTransaction },
    );

    await User.update(
      { saldo: ('userData.saldo - expense') },
      { where: { codCliente }, transaction: buyingAssetsTransaction },
    );

    const AtivoClientPrev = (
      await AtivosClientes.findAll({
        where: { codCliente, codAtivo },
        transaction: buyingAssetsTransaction,
      })
    )[0];

    if (AtivoClientPrev) {
      await AtivosClientes.update({
        qtdeAtivo: (qtdeAtivo + AtivoClientPrev.dataValues.qtdeAtivo),
      }, {
        where: { codCliente, codAtivo },
        transaction: buyingAssetsTransaction,
      });
    } else {
      await AtivosClientes.create({
        codCliente,
        codAtivo,
        qtdeAtivo,
        codOperacao: 'compra',
      }, { transaction: buyingAssetsTransaction });
    }

    /*
    Essa validação foi feita aqui para evitar uma outra requisição e reduzir o tempo entre essa validação e a requisição ao banco de dados;
      Apesar disso, será transformada em um middleware para evitar boilerplate code ou talvez apensa criar uma função auxiliar onde se deve passar os models os dados/chaves a verificar e o tipo de transação;
      acredito que deixar a validação na camada de service pode não ser muito adequado para o projeto, considerando que as demais validações estão nos middlewares;
    */

    /*
    Usar seqelizer.query para trazer os dados primarios desejados e assim evitar tantas requisições para validar os dados.
      Parte disso ocorreu apenas porque o hook "beforeUpsert" Não funciona corretamente quando se usa chave primária composta. Tentar rever isso também!!!
    */

    const transaction = mockTest.modelReturn || await Transacoes
      .create({
        codCliente,
        codAtivo,
        qtdeAtivo,
        valor: expense,
        codOperacao: 'compra',
      }, { transaction: buyingAssetsTransaction });
    // !!!!!!!!!!!!! Fazer o rollback em caso de falha!!!! usar o sequelize.transactions
    await buyingAssetsTransaction.commit();
    return transaction;
  } catch {
    await buyingAssetsTransaction.rollback();
    throw new Error('Tá errado! -.-');
  }
};
