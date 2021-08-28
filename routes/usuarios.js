const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExists, usuarioExistePorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPath, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( usuarioExistePorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio ').not().isEmpty(),
        check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExists ),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido),
        validarCampos
], usuariosPost);

router.patch('/', usuariosPath);

router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( usuarioExistePorId ),
        validarCampos
], usuariosDelete);

module.exports = router;