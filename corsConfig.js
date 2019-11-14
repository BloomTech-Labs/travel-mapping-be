
module.exports = {

  development: {
    origin: '*',
  },

  testing: {
    origin: '*',
  },

  review: {
    origin: ['https://piktorlogstaging.netlify.com/', 'https://piktorlog.com/'],
    // methods: ['PUT'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON'],
  },

  staging: {
    origin: ['https://piktorlogstaging.netlify.com/', 'https://piktorlog.com/'],
  },

  production: {

  },

};