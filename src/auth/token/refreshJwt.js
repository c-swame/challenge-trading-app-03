const generateJWT = require('./generateToken');

const refreshJWT = (payload) => generateJWT(payload);

module.exports = refreshJWT;
