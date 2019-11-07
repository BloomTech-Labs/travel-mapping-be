require('dotenv').config();
const routes  = require('./controllers/routes/routes');
const express = require('express');
const path    = require('path');
const server  = express();
const cors    = require("cors");
const helmet  = require("helmet");

const apiDocs = express.static(path.join(__dirname, 'apidoc'))
const PORT = process.env.PORT || 4000;


// server.use((req , res , next) => {

//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers", 'Content-Types, Authorization, Application/JSON');
//   if(req.method === 'OPTIONS'){
//     res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
//   });



// server.use(cors());
// server.use(express.json());
// server.use(helmet());



const middleware = [routes, apiDocs, ];

server.use(middleware);

server.get('/', (req, res) => {
  res.send(path.join(__dirname, 'apidoc/index.html'));
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  
});

module.exports = server;
