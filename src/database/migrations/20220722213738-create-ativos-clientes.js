module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AtivosClientes', {
      codCliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Clientes',
          key: 'codCliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      codAtivo: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'codAtivo',
        },
      },
      qtdeAtivo: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('AtivosClientes');
  },
};
