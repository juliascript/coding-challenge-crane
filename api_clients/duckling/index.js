var request = require('request');

// model object
var Duckling = require('../../models/duckling');

function formatWithLeadingZeroAndCastToString(number){
	if (number < 10){
		number = "0" + number;
	}
	return number.toString();
}

function makeAPIRequest(text, callback){
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

		// stringifying the object rn
		// it's application/edn and should be parsed
		callback(JSON.stringify(error), JSON.stringify(response), JSON.stringify(body));

	});
}

function DucklingAPIClient(text, callback){
	makeAPIRequest(text, function(err, res, body){
		var dateObj = body; // REPLACE THIS: find in body
		var ducklingObject = new Duckling(text, dateObj);

		callback(ducklingObject);
	});
}

module.exports = DucklingAPIClient;

