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
#### Users Rout
##### GET 
- /users/ 
devuelve todos los usuarios registrados
- /users/:id
Recibe como parametro un id de usuarui y devueve
##### PUT
- /users/ 
Recibe arreglo 
name: { type: String, required: true },
email: { type: String, unique: true, required: true },
password: { type: String, required: true }
##### POST
- /users/login
Recibe los parametros {email , password}
Retorna {auth:true/false, token:token/null}

router.route('/').put(postsController.put);
router.route('/upload').post(postsController.uploadImg);
router.route('/:_id').post(postsController.post);
router.route('/:_id').delete(postsController.delete);
#### Posts Rout
##### GET
- /posts/ Retorna todos los Posts
- /posts/:_id Retorna el Posts del id indicado 
- /posts/user/current Retorna los datos del usuario logeado
- /posts/user/:_id_users Retorna los Posts del id de usuario indicado


[Link de la API-RESTful](https://api-practica-kevin-cantillo.herokuapp.com/)
