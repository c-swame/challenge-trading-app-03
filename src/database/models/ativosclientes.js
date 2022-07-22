const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AtivosClientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.belongsToMany(models.Ativos, {
        through: AtivosClientes,
        foreignKey: 'codAtivo',
        otherKey: 'codCliente',
      });
      models.Ativos.belongsToMany(models.Users, {
        through: AtivosClientes,
        foreignKey: 'codCliente',
        otherKey: 'codAtivo',
      });
    }
  }
  AtivosClientes.init(
    {
      codCliente: DataTypes.INTEGER,
      codAtivo: DataTypes.INTEGER,
      quantidade: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
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
  return AtivosClientes;
};
