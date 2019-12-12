require('dotenv').config();
const routes      = require('./api/routes/routes');
const express     = require('express');
const path        = require('path');
const server      = express();
const cors        = require("cors");
const helmet      = require("helmet");
const Sentry      = require('@sentry/node');
const corsConfig  = require('./corsConfig');
const PORT        = process.env.PORT     || 4000;
const environment = process.env.NODE_ENV || 'development';

const fileUpload = require('express-fileupload')({
  useTempFiles: true,
  // tempFileDir: './tmp_img',
});

// Declare variables.
const apiDocs = express.static(path.join(__dirname, 'apidoc')); // Get the apidoc web page static assets.
const sentryRequest = Sentry.Handlers.requestHandler();         // Sentry request handler.
const sentryError   = Sentry.Handlers.errorHandler();           // Sentry error handler.
const expressJson   = express.json();                           // Express json parser.
const helmetJs      = helmet();                                 // Helmet.js.
const corsJs        = cors(corsConfig[environment]);            // Cors.js.
const middleware    = [ sentryRequest, helmetJs, corsJs,        // Middleware to be used by the server.
                        fileUpload, expressJson, apiDocs,
                        routes ];

// Initialize Sentry.
Sentry.init({ dsn: 'https://e085e65ac5a249988c866c5e21e2adaa@sentry.io/1811837' });

server.use(middleware);

// Serve the apidoc template web page.
server.get('/', (req, res) => { res.send(path.join(__dirname, 'apidoc/index.html')) });

// Verify the Sentry integration. (development only)
if (environment === 'development')
  server.get('/debug-sentry', (req, res) => { throw new Error('My first Sentry error!') }, sentryError);

// Run the server.
server.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) });

// Export the server for testing.
module.exports = server;
