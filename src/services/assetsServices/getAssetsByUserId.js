const { AtivosClientes, Ativos } = require('../../database/models');

module.exports = async (userId, mockTest = {}) => { // adicionar offset e pageAmount aos possíveis parâmetros e indicar a partir de onde deve iniciar e quantos retornos devem ter. Ajuda a vizualização do dado no front, eu acho;
  const userAssets = mockTest.modelReturn || await AtivosClientes.findAll(
    {
      where: { codCliente: userId },
      include: [
        {
          model: Ativos,
          as: 'ativos',
          attributes: ['Valor'],
        },
      ],
    },
  );

  const userData = userAssets.map(({
    codCliente,
    codAtivo,
    qtdeAtivo,
    ativos: { Valor },
  }) => (
    {
      CodCliente: codCliente,
      CodAtivo: codAtivo,
      QtdeAtivo: qtdeAtivo,
      Valor,
    }
  ));

  return userData;
};
