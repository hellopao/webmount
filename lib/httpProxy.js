var request = require('request');
var url = require('url');

var hosts = require('../config/hosts.json');

module.exports = function (){
	
	return function *(){
		var urlObj = url.parse(this.request.url);
		
		var host = urlObj.hostname;
		if (hosts[host]) {
			this.request.url = this.request.url.replace(new RegExp('(^https?:\\/\\/)' + host),'$1' + hosts[host]);
		}
		this.body = this.req.pipe(request(this.request.url));
	}
}
