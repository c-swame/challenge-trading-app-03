module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Ativos', [
      {
        QtdeAtivo: 100,
        Valor: 75.50,
      },
      {
        QtdeAtivo: 200,
        Valor: 100.00,
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    queryInterface.bulkDelete('Ativos', null, {});
  },
};
