
const getEnvironmentHost = (environment) => {
  // Takes the environment (process.env.NODE_ENV) as 
  // a parameter and returns the respective host URL.

  switch (environment) {
    case 'development':
    case 'testing': return 'http://localhost:4000'
    case 'review':
    case 'staging': return 'https://piktorlogstaging.herokuapp.com'
    case 'production':
    default: return 'https://piktorlog.herokuapp.com'
  }

};

module.exports = {
  getEnvironmentHost,
};