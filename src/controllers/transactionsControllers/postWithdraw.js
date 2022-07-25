const StatusCode = require('../../utils/statusCode');
const transactionsServices = require('../../services/transactions');

module.exports = async (req, resp, next) => {
  try {
    const { codCliente, valor } = req.body;
    const { authorization: token } = req.headers;
    if (!token) throw new Error('This request must contain a token'); // linha desnecessária, mas evita o erro se o middleware de validação for esquecido
    const transactionData = await transactionsServices
      .postWithdraw({ codCliente, valor });
    return resp.status(StatusCode.ACCEPTED).json({ data: transactionData, token });
  } catch (err) {
    return next(err);
  }
};
