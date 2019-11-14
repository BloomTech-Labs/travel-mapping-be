
module.exports = {

  development: {
    origin: ['*'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  testing: {

  },

  review: {
    origin: false,
    methods: ['PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  staging: {

  },

  production: {

  },

};