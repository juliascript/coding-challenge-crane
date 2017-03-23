var express = require('express');
var homeRoute = require('./routes/home');

var app = express();

// static files
app.use('/assets', express.static(__dirname + '/public'));

// specify view engine file extension
app.set('view engine', 'ejs');

// routes
homeRoute(app);

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

// allow requests through socket on port specified
app.listen(port);
console.log('Server running...');