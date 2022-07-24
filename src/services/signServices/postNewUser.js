const { User } = require('../../database/models');
const creatToken = require('../../auth/token/generateToken');

module.exports = async (newUserData, mockTest = {}) => {
  const filteredUserData = Object.entries(newUserData).filter((curr) => curr[1] !== undefined);
  const filteredObj = filteredUserData.reduce((sum, curr) => {
    const [key, value] = curr;
    // eslint-disable-next-line no-param-reassign
    sum[key] = value;
    return sum;
  }, {});
  /*
  dados de 'admin' e 'saldo' serão criados posteriormente por outras requisições;
    'admin' deve ser autorizado apenas por outra conta admin;
  */
  const normalizedData = {
    ...filteredObj,
  };
  /*
  !!!!!!?????? Adicionar verificação pra ver se o usuário já existe e evitargerar um erro
    (ou melhor deixar para o middleware de erro mesmo, para não ter que fazer uma query a mais?)/
  */
  const newUser = mockTest.modelReturn || await User.create(normalizedData);

  const {
    codCliente, admin, nome, email, telefone, saldo, cpf,
  } = newUser;

  const newUserToken = mockTest.jwtReturn || creatToken({ codCliente, admin });

  return {
    data: {
      codCliente, admin, nome, email, telefone, saldo, cpf,
    },
    token: newUserToken,
  };
};
