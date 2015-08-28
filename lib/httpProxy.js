var request = require('request');
var url = require('url');

var hosts = require('../config/hosts.json');

module.exports = function (){
	
	return function *(){
		var urlObj = url.parse(this.request.url);
		
		if (hosts[urlObj.host]) {
			console.log(this.request.url);
			this.request.url = this.request.url.replace(new RegExp('(^https?:\\/\\/)' + urlObj.host),'$1' + hosts[urlObj.host]);
			console.log(this.request.url);
		}
		this.body = this.req.pipe(request(this.request.url));
	}
}
