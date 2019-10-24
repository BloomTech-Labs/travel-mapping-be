require('dotenv').config();
const express = require('express');
const server = express();
const cors = require("cors");
const helmet = require("helmet");


const PORT = process.env.PORT || 4000;



server.use((req , res , next) => {
    res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", 'Content-Types, Authorization, Application/JSON');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE, GET');
    return res.status(200).json({});
  }
  next();
  });



server.use(cors());
server.use(express.json());
server.use(helmet());






server.get('/', (req,res) =>{
res.send('Hello from piktorlog');
})


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
