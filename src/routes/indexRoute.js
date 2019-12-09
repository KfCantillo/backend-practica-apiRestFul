const { Router } = require('express');
const router = Router();
//const fs = require('fs');

const indexController = require('../controllers/indexController');

// initial rout
router.route('/').get(indexController.get);

module.exports = router;
