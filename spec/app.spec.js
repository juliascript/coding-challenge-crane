var request = require('request');

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

var expectedResponseForJSON = { TEXTSTR: 'I have to do something by tomorrow at 8am',
  DATE: 'test' };

describe("POST to /api", function() {
    it("should extract time and return json", function(done) {
        request({
		    url: "http://localhost:" + port + "/api",
		    method: "POST",
		    json: true,   
		    body: {text: "I have to do something by tomorrow at 8am"}
		}, function (error, response, body){
			// expect time to have been extracted
			
			var obj = JSON.parse(body);
			expect(body).toEqual(expectedResponseForJSON);
			done();
		});
    });
});