const Crypto = require('crypto');

require('dotenv').config();

const {
  PASSWORD_CRYPTO_ALG,
  PASSWORD_CRYPTO_IV,
  PASSWORD_CRYPTO_KEY,
} = process.env;

const encrypt = (data) => {
  const cipher = Crypto
    .createCipheriv(PASSWORD_CRYPTO_ALG, PASSWORD_CRYPTO_KEY, PASSWORD_CRYPTO_IV);
  const encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  return encrypted;
};

const decrypt = (dataHash) => {
  const decipher = Crypto
    .createDecipheriv(PASSWORD_CRYPTO_ALG, PASSWORD_CRYPTO_KEY, PASSWORD_CRYPTO_IV);
  const decrypted = JSON.parse(decipher.update(dataHash, 'hex', 'utf-8'));
  return decrypted;
};

// metodo tem que ser melhorado de forma que a senha de duas pessoas diferentes,
//   ainda que iguais não tenham o mesmo hash .-.

module.exports = { encrypt, decrypt };
