const Server = require('./models/server');

require('dotenv').config();
 
 const server = new Server();
// llamo metodo listen para "escuchar el puerto"

 server.listen()
