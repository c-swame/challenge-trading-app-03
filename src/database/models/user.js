const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  User.init({
    codCliente: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    telefone: DataTypes.STRING,
    saldo: DataTypes.DECIMAL,
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passwordHash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: [8, 32],
      },
    },
    criadoEm: DataTypes.DATE,
    atualizadoEm: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Clientes',
    timestamps: false,
  });
  return User;
};
