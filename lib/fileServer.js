var url = require('url');
var path = require('path');

var fs = require('mz/fs');

function getType(file) {
  return path.extname(path.basename(file));
}

module.exports = function (argv){
	
	return function *(next){
		var urlObj = url.parse(this.request.url);
		urlObj.port = urlObj.port || "80";

		//TODO protocal
		if (this.method == 'GET' && urlObj.host === argv.host && urlObj.port == argv.port) {
			
			var filename = urlObj.pathname;
			filename = path.join(process.cwd(),argv.root,filename);
			
			var exist = yield fs.exists(filename);
			
			if (exist) {

                var stat = yield fs.stat(filename);

                if (stat.isFile()){
					console.log('matched file: %s',filename);
					
                    this.type = getType(filename);
                    this.body = fs.createReadStream(filename);
                    return;
                }
			}
		}
		yield next;
	}
}
