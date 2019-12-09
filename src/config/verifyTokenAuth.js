var jwt = require('jsonwebtoken');

const config = require('./config');
const Users = require('../models/users');

function verifyTokenAuth (req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err){
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    // if everything good, save to request for use in other routes
    req._id = decoded.id;
    req.email = decoded.email;
    
    const user = await Users.find({_id: decoded.id, email: decoded.email});
    if(user.length>0){
      next();
    }else{
      return res.status(500).send({ auth: false, message: 'Corrupt user token.' });
    }
  });
}
module.exports = verifyTokenAuth;