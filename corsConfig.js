
module.exports = {

  development: {
    origin: 'https://google.com/',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  review: {
    origin: 'https://google.com/',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  staging: {

  },

  production: {

  },

};