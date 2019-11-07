const db = require('../dbConfig');

const createTest = (test_data, done) => {
  // Creates a new test and adds it to the database.
  // Takes an object of test data and a callback function as parameters.
  // If there are no errors, passes null and an array with the id of the 
  // created test into the callback function. If there is an error, it will
  // only pass the error message to the callback function.

  db('tests').insert(test_data)
    .then(test => done(null, test))
    .catch(error => done(error));

};

const retrieveTests = (done) => {
  done(null, []);
}



module.exports = {
  retrieveTests,
  createTest,
};