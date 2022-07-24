module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transacoes', {
      codTransacao: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clientes',
          key: 'codCliente',
        },
      },
      codAtivo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ativos',
          key: 'codAtivo',
        },
      },
      codOperacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qtdeAtivo: {
        type: Sequelize.INTEGER,
      },
      valor: {
        type: Sequelize.DECIMAL(50, 2),
        allowNull: false,
      },
      'entrada/saida': {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Transacoes');
  },
};
