const StatusCode = require('../../utils/statusCode');
const userServices = require('../../services/usersServices');

module.exports = async (req, resp, next) => {
  try {
    const { codCliente } = req.params;
    const usersData = await userServices.getUserById(codCliente);
    return resp.status(StatusCode.OK).json(usersData);
  } catch (err) {
    return next(err);
  }
};
