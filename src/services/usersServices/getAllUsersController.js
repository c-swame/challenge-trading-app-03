const StatusCode = require('../../utils/statusCode');
const userServices = require('../../services/usersServices');

module.exports = async (_req, resp, next) => {
  try {
    const usersData = await userServices.getAllUsersService();
    return resp.status(StatusCode.OK).json(usersData);
  } catch (err) {
    return next(err);
  }
};
