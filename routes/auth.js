/* 

    PATH: '/api/login'

*/
const { Router } = require('express')
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate');
const router = Router();

router.post('/', 
    [
        check('email', 'Email es Obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateInputs
    ],
    login
)

router.post('/google', 
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validateInputs
    ],
    googleSignIn
)

module.exports = router;