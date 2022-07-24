const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transacoes.belongsTo(
        models.Ativos,
        { foreignKey: 'codAtivo', as: 'ativo' },
      );
      Transacoes.belongsTo(
        models.User,
        { foreignKey: 'codCliente', as: 'cliente' },
      );
    }
  }
  Transacoes.init({
    codTansacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    codCliente: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    codAtivo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    codOperacao: { // !!!!!!! os tipos de transação deveriam estar referenciados como chave estrangeirsa e agrupados em outra tabela (ou codigos da operação)
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['compra', 'venda', 'deposito', 'saque']],
      },
    },
    valor: {
      type: DataTypes.DECIMAL(50, 2),
      allowNull: false,
      validate: {
        min: 0.00,
      },
    },
    'entrada/saida': {
      type: DataTypes.STRING,
      validate: {
        isIn: [['entrada', 'saida']],
      },
    },
    criadoEm: DataTypes.DATE,
    atualizadoEm: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Transacoes',
    tableName: 'Tansacoes',
    timestamps: false,
  });

  Transacoes.addHook('beforeSave', async (tansacao) => {
    if (tansacao.codOperacao) {
      if (tansacao.codOperacao === 'compra' || tansacao.codOperacao === 'saque') {
        // eslint-disable-next-line no-param-reassign
        tansacao['entrada/saida'] = 'saida';
      }
      // eslint-disable-next-line no-param-reassign
      tansacao['entrada/saida'] = 'entrada';
    }
  });

  return Transacoes;
};
