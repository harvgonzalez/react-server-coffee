const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    // obtiene los query params de forma organica, al desestructurar obtienes lo que te interesa
    // const { q, nombre = "no name", apikey, page = 1, limit } = req.query;
    const { limite=5, desde=0 } = req.query;
    const query = {estado: true};
    
    //La respuesta es una coleccion de dos promesas
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip( Number(desde) )
        .limit( Number(limite) )
    ]);
    res.json({
        total,
        usuarios
    })
};

const usuariosPut = async (req, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    // TO-DO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({usuario})
  }
const usuariosPost = async (req, res = response) => {

    
    // request es lo que la persona está solicitando al desestructurar de alguna  forma decides lo que la respuesta obtiene segun el req
    const { nombre, correo, password, rol } = req.body; 

    // Nueva instancia del modelo de usuario de db, aunque envies otros campos al no estar definido en el modelo new Usurario( body ) lo va ignorar
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.json({
        // msg: 'post API - controlador',
        usuario
    })
};
const usuariosPath = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
};

const usuariosDelete = async (req, res=response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json(usuario);
};

  

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPath,
    usuariosDelete
}
