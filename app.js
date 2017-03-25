var express = require('express');
var homeRoute = require('./controllers/home');
var bodyParser = require('body-parser');

var app = express();

// to do
// 		- change means of accessing data from just printing the json to a property on model obj
// 		- write unit test
//		- push to heroku


// static files
app.use('/assets', express.static(__dirname + '/public'));

// parse json and form encoded data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// specify view engine file extension
app.set('view engine', 'ejs');

// routes
homeRoute(app);

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

// allow requests through socket on port specified
app.listen(port);
console.log('Server running...');