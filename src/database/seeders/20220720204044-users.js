module.exports = {
  async up(queryInterface, _Sequelize) {
    queryInterface.bulkInsert(
      'Clientes',
      [
        {
          nome: 'user1',
          email: 'email1@email.com',
          saldo: 1000,
          cpf: '123.456.789-01',
          telefone: '9999999999',
          passwordHash: '854420d77b7998aefe',
          // password
        },
        {
          nome: 'user2',
          email: 'email2@email.com',
          saldo: 222222.222222,
          cpf: '123.456.789-02',
          passwordHash: '960764863c3bd7f8ba27',
          // password
        },
        {
          nome: 'user3',
          email: 'email3@email.com',
          saldo: 333.333,
          cpf: '123.456.789-03',
          passwordHash: '960764863c3bd7f8ba27',
          // password
        },
        {
          nome: 'user4',
          email: 'email4@email.com',
          saldo: 444.444,
          cpf: '123.456.789-04',
          passwordHash: '960764863c3bd7f8ba27',
          // password
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    queryInterface.bulkDelete('Users', null, {});
  },
};
