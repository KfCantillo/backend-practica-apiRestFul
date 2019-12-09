# API RESTful NODE.JS

### Descripcion

Practica API REST con Node.js y MongoDB, el cual esta enfocada en publicaciones de posts de usuarios

### Desarollado bajo

- node.js (v8.10.0)
- express

### Base de datos

- mongodb

### Usando Token & Postman

- [JWT](https://jwt.io/)
- [Postman](https://www.getpostman.com/) Para ver y verificas las API's

### Rutas de la Api

#### GET 
- /users/ 
devuelve todos los usuarios registrados
- /users/:id
Recibe como parametro un id de usuarui y devueve

router.route('/:id').get(usersController.get);
router.route('/').put(usersController.put);
router.route('/').post(usersController.post);
router.route('/login').post(usersController.authLogin);

router.route('/').get(postsController.getAll);
router.route('/:_id').get(postsController.get);
router.route('/user/current').get(usersController.current);
router.route('/user/:_id_users').get(postsController.getPostsUser);
router.route('/user/:_id_users/:param/:value').get(postsController.getPostsByTitleOrContent);
router.route('/').put(postsController.put);
router.route('/upload').post(postsController.uploadImg);
router.route('/:_id').post(postsController.post);
router.route('/:_id').delete(postsController.delete);

[Link](https://api-practica-kevin-cantillo.herokuapp.com/)
