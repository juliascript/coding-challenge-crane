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

		// stringifying the object rn
		// it's application/edn and should be parsed
		callback(JSON.stringify(error), JSON.stringify(response), JSON.stringify(body));

	});
}

function DucklingAPIClient(text, callback){
	makeAPIRequest(text, function(err, res, body){
		body = edn.valueOf(edn.parse(body));
		var responseObj = edn.valueOf(edn.parse(body)); // not sure why I had to do this twice
		var dateString = responseObj.results[0].value.start.toString();
		var ducklingObject = new Duckling(text, dateString);

		callback(ducklingObject);
	});
}

module.exports = DucklingAPIClient;

