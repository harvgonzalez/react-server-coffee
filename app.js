require('dotenv').config();
const Server = require('./models/server');


 
 const server = new Server();
// llamo metodo listen para "escuchar el puerto"

 server.listen()
