const server = require('express')();

server.use('/api/auth', require('./routes'));

module.exports = server;
