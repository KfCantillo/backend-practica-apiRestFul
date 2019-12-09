const md5 = require('md5');
const jwt = require('jsonwebtoken');
//const filter = require('filter-array');

const Users = require('../models/users');
const config = require('../config/config');

module.exports = {
  get: async function(req, res) {
    const { _id } = req.params;
    const users = await Users.find({ _id });
    for (let i = 0; i < users.length; i++) {
      delete users[i]['password'];
    }
    res.json(users);
  },
  getAll: async function(req, res) {
    const users = await Users.find();
    for (let i = 0; i < users.length; i++) {
      delete users[i]['password'];
    }
    res.json(users);
  },
  post: async function(req, res) {},
  put: async function(req, res) {
    const { name, email, password } = req.body;
    const users = new Users({
      name,
      email,
      password: md5(password)
    });
    //const user = await users.save();
    const searchEmail = await Users.find({ email });

    if (searchEmail.length == 0) {
      users
        .save()
        .then(data => {
          //console.log('mmm', data);
          res.json({
            status: 'ok',
            message: 'Usuario guardado con exito.',
            return: data
          });
        })
        .catch(err => {
          //console.log('rrrrr',err)
          res.json({
            status: 'err',
            message: 'Error al guardar el usuario.',
            detail: err.errmsg
          });
        });
    } else {
      res.json({
        status: 'err',
        message: 'Este email ya se encuentra registrado.',
        detail: email + ' existente en la db'
      });
    }
  },
  delete: async function(req, res) {},
  authLogin: async function(req, res) {
    const { email, password } = req.body;
    let query = { email, password: md5(password) };
    const user = await Users.find(query);
    // create a token
    
    if (user.length > 0) {
      console.log(user[0]._id);
      const token = jwt.sign(
        {
          id: user[0]._id,
          email: user[0].email
        },
        config.secret,
        {
          expiresIn: 3600 // expires in 1 hour
        }
      );

      res.status(200).send({ auth: true, token: token });
    } else {
      res.status(200).send({ auth: false, token: null });
    }
  },
  authLogout: function(req, res) {
    res.status(200).send({ auth: false, token: null });
  },
  current: async function (req, res) {
    if (req._id) {
      const users = await Users.find({ _id: req._id});
      for (let i = 0; i < users.length; i++) {
        delete users[i]['password'];
      }
      res.status(200).send({ auth: true, dataUser: users[0] });
    }else{
      res.status(200).send({ auth: false });
    }
  }
};
