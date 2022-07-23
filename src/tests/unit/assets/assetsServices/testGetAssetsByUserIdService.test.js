const sinon = require('sinon');
const { expect, use } = require('chai');
const sinonChai = require("sinon-chai");

const statusCode = require('../../../../utils/statusCode');

use(sinonChai);

const { getAssetsByUserId } = require('../../../../services/assetsServices');

describe(`test the getProductById.js function when it recives
a valid data from controller and from model`, async () => {
  const mockTest = {
    modelReturn: [
    [{
      codCliente: 2,
      codAtivo: 2,
      quantidade: 2,
      valor: 100.00,
    },
    {
      codCliente: 2,
      codAtivo: 1,
      quantidade: 1,
      valor: 75.50,
    }],
  ],
};

  const expectedReturn = [
    {
      codCliente: 2,
      codAtivo: 2,
      quantidade: 2,
      valor: 100.00,
    },
    {
      codCliente: 2,
      codAtivo: 1,
      quantidade: 1,
      valor: 75.50,
    },
  ];

  it(`test if the return is as expected`, async() => {
    const response = await getAssetsByUserId(2, mockTest);
    expect(response).to.deep.equal(expectedReturn);
  });
});
