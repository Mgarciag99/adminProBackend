/* 
ruta: /api/hospital
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validateInputs } = require('../middlewares/validate')
const { getHospitals, createHospital, updateHospital, deleteHospital} = require('../controllers/hospital')
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router()


router.get( '/', getHospitals )

router.post( '/',
    [
        validateJWT,
        check('name', 'El nombre del hospital es necesario').not().isEmpty(),
        validateInputs
    ],
    createHospital
)

router.put( '/:id', 
    [
    ],
    updateHospital
)

router.delete( '/:id', 
    deleteHospital
)

module.exports = router
