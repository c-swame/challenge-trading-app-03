module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'AtivosClientes',
      [
        {
          codCliente: 1,
          codAtivo: 1,
          qtdeAtivo: 1,
        },
        {
          codCliente: 2,
          codAtivo: 2,
          qtdeAtivo: 2,
        },
        {
          codCliente: 2,
          codAtivo: 1,
          qtdeAtivo: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('AtivosClientes', null, {});
  },
};
