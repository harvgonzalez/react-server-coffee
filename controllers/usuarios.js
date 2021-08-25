const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    // obtiene los query params de forma organica, al desestructurar obtienes lo que te interesa
    const { q, nombre = "no name", apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    })
};

const usuariosPut = (req, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'put API - controlador ',
        id
    })
  }
const usuariosPost = (req, res = response) => {

    // request es lo que la persona está solicitando al desestructurar de alguna  forma decides lo que la respuesta obtiene segun el req
    const { nombre, edad } = req.body; 

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
};
const usuariosPath = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
};

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    })
};

  

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPath,
    usuariosDelete
}
