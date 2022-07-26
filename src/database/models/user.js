const {
  Model,
} = require('sequelize');

const handlePasswordCrypto = require('../../auth/utils/handlePasswordCrypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Transacoes,
        { foreignKey: 'codCliente', as: 'transacoes' },
      );

      User.hasMany(
        models.Ativos,
        { foreignKey: 'codAtivo', as: 'ativos' },
      );
    }
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
    passwordHash: {
      type: DataTypes.STRING,
    },
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

  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.passwordHash = handlePasswordCrypto.encrypt(user.password);
    }
  });

  return User;
};
