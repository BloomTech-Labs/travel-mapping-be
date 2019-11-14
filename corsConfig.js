
module.exports = {

  development: {
    origin: '*',
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