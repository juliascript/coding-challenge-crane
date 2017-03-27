var request = require('request');
var edn = require('edn');

// model object
var Duckling = require('../../models/duckling');

function formatWithLeadingZeroAndCastToString(number){
	if (number < 10){
		number = "0" + number;
	}
	return number.toString();
}

function makeAPIRequest(text, callback){
	// api fails when there are commas and other odd characters
	text = text.replace(/[^a-zA-Z0-9 :]/g, "");

	// date and time needed for api url
	var currentdate = new Date(); 

	var year = 	formatWithLeadingZeroAndCastToString(currentdate.getFullYear());
	var month = formatWithLeadingZeroAndCastToString(currentdate.getMonth() + 1);
	var date = formatWithLeadingZeroAndCastToString(currentdate.getDate());
	var hour = formatWithLeadingZeroAndCastToString(currentdate.getHours());
	var minute = formatWithLeadingZeroAndCastToString(currentdate.getMinutes());
	var second = formatWithLeadingZeroAndCastToString(currentdate.getSeconds());
	

	var datetime = year + month + date + "T" + hour + minute + second;

	request({
	    url: "https://duckling.wit.ai/parse/en$core/" + datetime + "/420/" + text,
	    method: "GET"
	}, function (error, response, body){
		// parse application/edn
		body = edn.valueOf(edn.parse(body));
		callback(error, response, body);
	});
}

function DucklingAPIClient(text, callback){
	makeAPIRequest(text, function(err, res, body){
		var dateString = body.results[0].value.start.toString();
		var ducklingObject = new Duckling(text, dateString);

		callback(ducklingObject);
	});
}

module.exports = DucklingAPIClient;

