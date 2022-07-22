const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ativos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Ativos.init(
    {
      codAtivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      QtdeAtivo: DataTypes.NUMBER,
      Valor: DataTypes.DECIMAL,
      criadoEm: DataTypes.DATE,
      atualizadoEm: DataTypes.DATE,
      validate: {
        min: 0,
      },
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
