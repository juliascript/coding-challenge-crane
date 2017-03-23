var request = require('request');
var bodyParser = require('body-parser');

module.exports = function(app) {

	var urlencodedParser = bodyParser.urlencoded({extended: false});
	var jsonParser = bodyParser.json();

	app.get('/', function(req, res){
		// render form html file (specified ejs extension in app.js)
		res.render('form');
	});

	app.post('/', urlencodedParser, function(req, res){
		
		var date; 
		// date will be the returned obj from duckling api

		// render extractedDate html file (specified ejs extension in app.js)
		res.render('extractedDate', { TEXTSTR: req.body.text,
									  DATE: date });
	});

	app.post('/api', jsonParser, function(req, res){
		var date; 
		// date will be the returned obj from duckling api
		
		var dateObj = { textstr: req.body.text,
					extractedDate: date }

		res.send(JSON.stringify(dateObj));
	});

};