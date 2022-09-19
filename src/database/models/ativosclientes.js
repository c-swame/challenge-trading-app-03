/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AtivosClientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AtivosClientes.belongsTo(models.Ativos, {
        through: AtivosClientes,
        foreignKey: 'codAtivo',
        otherKey: 'codCliente',
        as: 'ativo',
      });
      AtivosClientes.belongsTo(models.User, {
        through: AtivosClientes,
        foreignKey: 'codCliente',
        otherKey: 'codAtivo',
        as: 'cliente',
      });
    }
  }
  AtivosClientes.init(
    {
      codCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      codAtivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      qtdeAtivo: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      codOperacao: {
        type: DataTypes.VIRTUAL,
        validate: {
          isIn: [['compra', 'venda']],
        },
      },
    },
    {
      sequelize,
      modelName: 'AtivosClientes',
      tableName: 'AtivosClientes',
      timestamps: false,
    },
  );

  // AtivosClientes.addHook('beforeUpsert', async (instance, options) => {
  //   console.log(options);
  //   if (!options.instance.isNewRecord) {
  //     if (instance.qtdeAtivo && instance.codOperacao === 'compra') {
  //       instance.qtdeAtivo += instance._previousDataValues.qtdeAtivo;
  //     } else if (instance.qtdeAtivo && instance.codOperacao === 'venda') {
  //       instance.qtdeAtivo -= instance._previousDataValues.qtdeAtivo;
  //     }
  //   }
  // });

  return AtivosClientes;
};
