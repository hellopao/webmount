var cp = require('child_process');
var path = require('path');

exports.setProxy = function (host,port){
	var server = host + ":" + port;
	var cmd;
	if (process.platform === "win32") {		
		cmd = path.join(__dirname,"tools/runproxy.exe");
	} else if (process.platform == 'linux') {
        cmd = 'export HTTP_PROXY=http://' + server;
    }
	
	return cp.execSync(cmd);	
};

exports.resetProxy = function (){
	var cmd;
	if (process.platform === "win32") {
		cmd =  path.join(__dirname,"tools/stopproxy.exe");	
	} else if (process.platform == 'linux') {
        cmd = 'export HTTP_PROXY=';
    }
	
	return cp.execSync(cmd);	
};
