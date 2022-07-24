module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Transacoes', [
      {
        codCliente: 2,
        codAtivo: 2,
        codOperacao: 'deposito',
        valor: 1234567.12,
        'entrada/saida': 'entrada',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Transacoes', null, {});
  },
};
