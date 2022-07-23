module.exports = {
  async up(queryInterface, _Sequelize) {
    queryInterface.bulkInsert(
      'Clientes',
      [
        {
          nome: 'user1',
          email: 'email1@email.com',
          saldo: 1000,
          cpf: '123.456.789-00',
          telefone: '9999999999',
          passwordHash: '854420d77b7998aefe',
          // password
        },
        {
          nome: 'user2',
          email: 'email2@email.com',
          saldo: 1234567.123456789,
          cpf: '123.456.789-01',
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
