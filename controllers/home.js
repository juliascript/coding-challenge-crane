var ducklingAPIClient = require('../api_clients/duckling');
var bodyParser = require('body-parser');
var request = require('request');

module.exports = function(app) {

	app.get('/', function(req, res){
		// render form html file (specified ejs extension in app.js)
		res.render('form');
	});

	// form generated POST request
	app.post('/', function(req, res){
		var textString = req.body.text;

		ducklingAPIClient(textString, function(ducklingObject){

			// render extractedDate html file (specified ejs extension in app.js)
			res.render('extractedDate', { TEXTSTR: ducklingObject.originalText,
										  DATE: ducklingObject.date });
		});
	});

	// JSON POST request
	app.post('/api', function(req, res){
		var textString = req.body.text;

		ducklingAPIClient(textString, function(ducklingObject){

			// render extractedDate html file (specified ejs extension in app.js)
			res.send(JSON.stringify({ TEXTSTR: ducklingObject.originalText,
						DATE: ducklingObject.date }));
		});
	});

};