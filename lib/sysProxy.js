var cp = require('child_process');
var path = require('path');

exports.setProxy = function (host,port){
	var server = host + ":" + port;
	var cmd;
	if (process.platform === "win32") {		
		cmd = path.join(__dirname,"tools/refreshproxy.exe") + " on " + server;
	} else if (process.platform == 'linux') {
        cmd = 'export HTTP_PROXY=http://' + server;
    }
	
	cp.execSync(cmd);	
};

exports.resetProxy = function (){
	var cmd;
	if (process.platform === "win32") {
		cmd =  path.join(__dirname,"tools/refreshproxy.exe") + " restore";	
	} else if (process.platform == 'linux') {
        cmd = 'export HTTP_PROXY=';
    }
	
	cp.execSync(cmd);	
};
