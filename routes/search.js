


const { Router } = require('express');
const { getAll, getDocumentsCollection } = require('../controllers/search');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:search', [ validateJWT ], getAll );
router.get('/colection/:table/:search', [ validateJWT ], getDocumentsCollection );

module.exports = router;