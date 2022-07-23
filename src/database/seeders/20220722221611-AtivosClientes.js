module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'AtivosClientes',
      [
        {
          codCliente: 1,
          codAtivo: 1,
          quantidade: 1,
        },
        {
          codCliente: 2,
          codAtivo: 2,
          quantidade: 2,
        },
        {
          codCliente: 2,
          codAtivo: 1,
          quantidade: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('AtivosClientes', null, {});
  },
};
