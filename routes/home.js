var request = require('request');
var bodyParser = require('body-parser');

module.exports = function(app) {

	var urlencodedParser = bodyParser.urlencoded({extended: false});

	app.get('/', function(req, res){
		// render form html file (specified ejs extension in app.js)
		res.render('form');
	});

	app.post('/', urlencodedParser, function(req, res){
		// render extractedDate html file (specified ejs extension in app.js)
		

		var date; 

		res.render('extractedDate', { TEXTSTR: req.body.text,
									  DATE: date });
	});

	// app.post('/extract', function(req, res){
	// 	// get body of post req
	// 	var textString = req.params.text;

	// 	// make api request to duckling

	// 	// write response of api to display in html page
	// 	// res.send( <HTML DOC> );
	// 	res.render('form');
	// });

};