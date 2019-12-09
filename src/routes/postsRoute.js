const { Router } = require('express');
const router = Router();
//const fs = require('fs');

const postsController = require('../controllers/postsController');
const usersController = require('../controllers/usersController');

// user rout
router.route('/').get(postsController.getAll);
router.route('/:_id').get(postsController.get);
router.route('/user/current').get(usersController.current);
router.route('/user/:_id_users').get(postsController.getPostsUser);
router.route('/user/:_id_users/:param/:value').get(postsController.getPostsByTitleOrContent);
router.route('/').put(postsController.put);
router.route('/upload').post(postsController.uploadImg);
router.route('/:_id').post(postsController.post);
router.route('/:_id').delete(postsController.delete);

module.exports = router;

