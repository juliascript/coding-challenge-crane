var request = require('request');

describe("POST to /", function() {
    it("should extract time and render html", function(done) {
        request({
		    url: "http://localhost:3000/",
		    method: "POST",
		    json: true,   
		    body: {text: "I have to do something by tomorrow at 8am"}}
		}, function (error, response, body){
			// expect time to have been extracted
			done();
		});
    });
});