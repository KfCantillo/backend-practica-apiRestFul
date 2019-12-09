const verifyTokenAuth = require('./config/verifyTokenAuth');
const fs = require('fs');

const excludeToken = [
  'usersRoute.js',
  'indexRoute.js'
]

function router(app) {
  // Routes
  //app.use('/api/auth', require('./routes/auth.routes'));
  //app.use('/api/users', verifyTokenAuth, require('./routes/users.routes'));
  path = './src/routes/';
  console.log('Loading routes...');

  fs.readdirSync(path).forEach( async file => {
    let token = "Require Token!";
    const name = file.split('Route')[0]
    
    if (excludeToken.includes(file)) {
      token = "";
      await eval(`app.use('/${name}', require('./routes/${file}'))`);  
    }else{
      await eval(`app.use('/${name}', verifyTokenAuth, require('./routes/${file}'))`);
    }
    console.log(`Rout ${path + file} `+token);
  });
  app.use('/', require('./routes/indexRoute'));
}
module.exports = router;
