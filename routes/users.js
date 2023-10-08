/*
ruta : /api/users
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validateInputs } = require('../middlewares/validate')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router()

router.get( '/', validateJWT, getUsers )
router.post( '/', 
    [
        validateJWT,
        check('name', 'Nombre es Obligatorio').not().isEmpty(),
        check('password', 'Password es Obligatorio').not().isEmpty(),
        check('email', 'Email es Obligatorio').isEmail(),
        validateInputs
    ]
    , createUser );

router.put( '/:id',
    [
        validateJWT,
        check('name', 'Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Email es Obligatorio').isEmail(),
        check('role', 'El rol es Obligatorio').not().isEmpty(),
        validateInputs
    ],
    updateUser )

router.delete( '/:id', validateJWT, deleteUser )




module.exports = router