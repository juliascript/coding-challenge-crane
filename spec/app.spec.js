var request = require('request');

describe("test test", function() {
    it("should test something", function(done) {
        request({
		    url: "http://localhost:3000/",
		    method: "POST",
		    json: true,   
		    body: user
		}, function (error, response, body){
			expect(body).toEqual(JSON.stringify(user[uid]));
			// expect stauts code 201
			// expect(response.statusCode).toBe(201);
			done();
		});
    });
});