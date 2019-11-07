const db = require('../dbConfig');

const createTest = () => {

  db()

  return 'Hello World!';
};

module.exports = {
  createTest,
};