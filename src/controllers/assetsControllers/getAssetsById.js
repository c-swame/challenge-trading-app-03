const StatusCode = require('../../utils/statusCode');
const assetsServices = require('../../services/assetsServices');

module.exports = async (req, resp, next) => {
  try {
    const { assetId } = req.params;
    const { authorization: token } = req.headers;
    if (!token) throw new Error('This request must contain a token');
    // !!!!! Adicionar verificação do req.params para essa rota
    /* !!!!! Caso o req.params.codClient for diferente do codClient do dono da requisição
    essa requisição deverar ser barrada !!!! Implementar após adicionar o JWT
    (o codClient deve estar incluso no JWT)
    */
    const assetData = await assetsServices.getAssetById(assetId);
    return resp.status(StatusCode.OK).json({ data: assetData, token });
  } catch (err) {
    return next(err);
  }
};
