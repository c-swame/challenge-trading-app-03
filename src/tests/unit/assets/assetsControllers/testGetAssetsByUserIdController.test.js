const sinon = require('sinon');
const { expect, use } = require('chai');
const sinonChai = require("sinon-chai");

const statusCode = require('../../../../utils/statusCode');

use(sinonChai);

const assetsControllers = require('../../../../controllers/assetsControllers');
const assetsService = require('../../../../services/assetsServices');

describe(`test the getAssetsByUderId controller when it recives a valid data from service and from request`, async () => {
  const expectedJsonReturn = {
    data: [
      {
        codCliente: 2,
        codAtivo: 2,
        quantidade: 2,
      },
      {
        codCliente: 2,
        codAtivo: 1,
        quantidade: 1,
      },
    ],
    token: 'JWT',
  };

  const expectedStatusReturn = statusCode.OK;

  
  const mockResp = {};
  const mockReq = {};
  let mockNext = () => true;

  before(() => {
    mockReq.body = {};
    mockReq.params = {
      codCliente: 2
    }
    mockReq.headers = {
      authorization: 'JWT'
    }

    mockResp.status = sinon.stub().returns(mockResp);
    mockResp.json = sinon.stub().returns();
    mockNext = sinon.stub().returns(true);

    sinon.stub(assetsService, "getAssetsByUserId").resolves(expectedJsonReturn.data);
  });  

  after(() => {
    assetsService.getAssetsByUserId.restore();
  });

  it(`test if the return the expected https status code 200`, async() => {
    await assetsControllers.getAssetsByUserId(mockReq, mockResp, mockNext);
    expect(mockResp.status).calledWith(expectedStatusReturn);
  });

  it(`test if the return the expected json content`, async() => {
    console.log('aaaaaaaaaaaaaa', expectedJsonReturn);
    await assetsControllers.getAssetsByUserId(mockReq, mockResp, mockNext);
    expect(mockResp.json).calledWith(expectedJsonReturn);
  });
});
