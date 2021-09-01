const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJWT');


const login = async( req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar si usuario esta activo en DB
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }
        // Verifficar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

    
};

module.exports = {
    login
};