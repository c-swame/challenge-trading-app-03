const HttpsStatus = require('../../utils/statusCode');

require('../../utils/getEnvVar').config();

module.exports = async (req, res, next) => {
  const { tokenUserId, isAdmin } = req;
  const { userId } = req.params;

  try {
    if (userId === tokenUserId || isAdmin) {
      return next();
    }

    return res.status(HttpsStatus.FORBIDDEN) // apesar de que aqui talvez faça mais sentido um FORBIDDEN que um UNAUTHORIZED, também li a recomendação de evitar dar possiveis dados que possam auxiliar em uma ataque à sua rede e uma mudança de código nesse caso poderia dar uma dica... pesquisar mais sobre 'status code and security considerations'
      .json({ message: 'your access is denied for this request' }); // levar em consideração que essa mensagem teria que mudar caso a ideia seja a mesa de cima
  } catch (err) {
    return next(err);
  }
};
