// server.js

var express = require('express'),
	path = require('path'),
	app = express(),
	port = 9013;

// Make sure to include the JSX transpiler
require("node-jsx").install();

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');

// Set up Routes for the application
require('./app/routes/routes.js')(app);


app.listen(port);
console.log('Server is Up and Running at Port : ' + port);