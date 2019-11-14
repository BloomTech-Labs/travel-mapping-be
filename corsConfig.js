
module.exports = {

  development: {
    origin: false,
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