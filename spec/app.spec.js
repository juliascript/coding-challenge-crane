var jasmine = require('jasmine-node');
var request = require('request');

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

// if jasmine-node doesn't print to the console.
// jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

var expectedResponseForJSON = { TEXTSTR: 'the third saturday of 2018, 9am',
  DATE: 'Saturday, 20 January 2018 at 9:00:00 -0800 (-08:00)' };

describe("POST to /api", function() {

    it("should extract time and return json", function(done) {
        request({
		    url: "https://crane-coding-challenge.herokuapp.com/api",
		    method: "POST",
		    json: true,   
		    body: {text: "the third saturday of 2018, 9am"}
		}, function (error, response, body){
			// expect time to have been extracted
			expect(body).toEqual(expectedResponseForJSON);
			done();
		});
    });
});