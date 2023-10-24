/* 
ruta: /api/medico
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validateInputs } = require('../middlewares/validate')
const { getMedico, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos')
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router()


router.get('/', validateJWT, getMedico)

router.post('/',
    [
        validateJWT,
        check('name', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El codigo del hospital es necesario').isMongoId(),
        validateInputs
    ],
    createMedico
)

router.put('/:id',
    [
    ],
    updateMedico    
)

router.delete('/:id',
    deleteMedico
)
module.exports = router