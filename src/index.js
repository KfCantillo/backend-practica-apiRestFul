const app = require('./app');

// Settings
app.set('port', process.env.PORT || 4000);

// Starting the server
app.listen(app.get('port'), () => {
	console.log(`Server Online, port: ${app.get('port')}`);
});
