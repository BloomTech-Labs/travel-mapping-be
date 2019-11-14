
module.exports = {

  development: {
    origin: ['*'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  review: {
    origin: ['*'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  staging: {

  },

  production: {

  },

};