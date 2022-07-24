const StatusCode = require('../../utils/statusCode');
const transactionsServices = require('../../services/transactions');

module.exports = async (req, resp, next) => {
  try {
    const { codAtivo, codCliente, qtdeAtivo } = req.body;
    const { authorization: token } = req.headers;
    if (!token) throw new Error('This request must contain a token');
    const transactionData = await transactionsServices
      .postBuyinfAssets({ codAtivo, codCliente, qtdeAtivo });
    return resp.status(StatusCode.ACCEPTED).json({ data: transactionData, token });
  } catch (err) {
    return next(err);
  }
};
