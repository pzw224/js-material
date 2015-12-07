// server.js

var express = require('express'),
	path = require('path'),
	app = express(),
	port = 9015;

app.use(express.static(path.join(__dirname)));

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);