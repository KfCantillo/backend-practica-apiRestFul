const { Router } = require('express');
const router = Router();
//const fs = require('fs');

const usersController = require('../controllers/usersController');

// user rout
router.route('/').get(usersController.getAll); // /users/

router.route('/:id').get(usersController.get);
router.route('/').put(usersController.put);
router.route('/').post(usersController.post);
router.route('/login').post(usersController.authLogin);
router.route('/logout').post(usersController.authLogout);
//router.route('/users').delete(usersController.delete);

module.exports = router;
