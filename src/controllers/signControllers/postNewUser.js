const StatusCode = require('../../utils/statusCode');
const signServices = require('../../services/signServices');

module.exports = async (req, resp, next) => {
  try {
    const {
      nome, email, cpf, telefone, password,
    } = req.body;
    const userData = await signServices.postNewUser({
      nome, email, cpf, telefone, password,
    });
    return resp.status(StatusCode.CREATED).json({ data: userData.data, token: userData.token });
  } catch (err) {
    return next(err);
  }
};
