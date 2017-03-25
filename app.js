var express = require('express');

var app = express();

// to do
// 		- write unit test
//		- push to heroku


// static files
app.use('/assets', express.static(__dirname + '/public'));

// parse json and form encoded data
// -?- this is only required for post requests, and require is cached 
//		across files anyway 

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// specify view engine file extension
app.set('view engine', 'ejs');

// routes
var homeRoute = require('./controllers/home');
homeRoute(app);

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

// allow requests through socket on port specified
app.listen(port);
console.log('Server running...');