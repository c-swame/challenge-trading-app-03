const {
  Transacoes,
  AtivosClientes,
  Ativos,
  User,
} = require('../../database/models');

module.exports = async (transactionData, mockTest = {}) => {
  const { codCliente, codAtivo, qtdeAtivo } = transactionData;

  const { dataValues: assetData } = await Ativos.findByPk(codAtivo);
  const { dataValues: userData } = (await User.findByPk(codCliente));
  const [ativoClientPrev] = (
    await AtivosClientes.findAll({ where: { codCliente, codAtivo } })
  );

  const profits = (assetData.Valor * qtdeAtivo);
  if (ativoClientPrev.qtdeAtivo < qtdeAtivo) {
    throw new Error(`
    Quantidade ativos insuficiente. Ativos disponíveis: ${ativoClientPrev.qtdeAtivo}
    `);
  }

  await Ativos.update(
    { QtdeAtivo: (assetData.QtdeAtivo + qtdeAtivo) },
    { where: { codAtivo } },
  );

  await User.update(
    { saldo: (+userData.saldo + +profits) },
    { where: { codCliente } },
  );

  await AtivosClientes.update({
    qtdeAtivo: (ativoClientPrev.qtdeAtivo - qtdeAtivo),
  }, {
    where: { codCliente, codAtivo },
  });

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
      valor: profits,
      codOperacao: 'venda',
    });
  // !!!!!!!!!!!!! Fazer o rollback em caso de falha!!!! usar o sequelize.transactions
  return transaction;
};
