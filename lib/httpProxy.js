var request = require('request');

module.exports = function (){
	
	return function *(){
		this.body = this.req.pipe(request(this.request.url));
	}
}
