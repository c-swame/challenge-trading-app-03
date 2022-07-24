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
    codtransacao: {
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
    qtdeAtivo: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
    valor: {
      type: DataTypes.DECIMAL(50, 2),
      allowNull: false,
      validate: {
        min: 0,
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

  Transacoes.addHook('beforeSave', async (transacao) => {
    if (transacao.codOperacao) {
      if (transacao.codOperacao === 'compra' || transacao.codOperacao === 'saque') {
        // eslint-disable-next-line no-param-reassign
        transacao['entrada/saida'] = 'saida';
      }
      // eslint-disable-next-line no-param-reassign
      transacao['entrada/saida'] = 'entrada';
    }
  });

  Transacoes.addHook('beforeSave', async (transacao) => {
    if (transacao.codOperacao === 'saque' || transacao.codOperacao === 'deposito') {
      // eslint-disable-next-line no-param-reassign
      transacao.qtdeAtivo = null;
    } else if (transacao.qtdeAtivo < 1) {
      throw new Error('a qtdeAtivos deve ser maior ou igual a "1" para esse tipo de operação');
    }
  });

  return Transacoes;
};
