const Server = require('./src/models/Server');
require('dotenv').config();

Server.start();
// console.log(process.env.PORT);