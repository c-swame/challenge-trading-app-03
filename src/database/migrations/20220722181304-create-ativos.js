module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      codAtivo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      QtdeAtivo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Valor: {
        type: Sequelize.DECIMAL(50, 2),
      },
      criadoEm: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        noUpdate: true,
      },
      atualizadoEm: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Ativos');
  },
};
