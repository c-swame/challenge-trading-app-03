const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ativos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ativos.hasMany(
        models.Transacoes,
        { foreignKey: 'codAtivo', as: 'tansacoes' },
      );
    }
  }
  Ativos.init(
    {
      codAtivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      QtdeAtivo: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      Valor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      criadoEm: DataTypes.DATE,
      atualizadoEm: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Ativos',
      tableName: 'Ativos',
      timestamps: false,
    },
  );
  return Ativos;
};
