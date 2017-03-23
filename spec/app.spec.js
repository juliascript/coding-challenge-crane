var request = require('request');

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

describe("POST to /", function() {
    it("should extract time and render html", function(done) {
        request({
		    url: "http://localhost:" + port,
		    method: "POST",
		    json: true,   
		    body: {text: "I have to do something by tomorrow at 8am"}
		}, function (error, response, body){
			// expect time to have been extracted
			done();
		});
    });
});