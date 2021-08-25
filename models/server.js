require('dotenv').config();

const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // middlewares
        this.middlewares();

        // Rutas de mi aplicacionesllamo mis rutas que dispara el metodo routes()
        this.routes();


    };

    middlewares () {
        
        // CORS
        this.app.use( cors() );

        // Parseo y lectura deel body
        this.app.use( express.json() );
        
        // directorio publico
        this.app.use( express.static('public') )
    }
    // metodo para las rutas
    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'))
    }

    // metodo para escuchar puerto
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo ${this.port}`);
        } );
    }

};

module.exports = Server;