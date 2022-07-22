module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AtivosClientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codCliente: {
        type: Sequelize.INTEGER,
      },
      codAtivo: {
        type: Sequelize.INTEGER,
      },
      quantidade: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('AtivosClientes');
  },
};
