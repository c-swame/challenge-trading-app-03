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
        references: {
          model: 'Clientes',
          key: 'codCliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      codAtivo: {
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
