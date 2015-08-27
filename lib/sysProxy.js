var cp = require('child_process');
var winReg = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";

exports.setProxy = function (host,port){
	var server = host + ":" + port;
	var cmd;
	if (process.platform === "win32") {
		var enableProxy = 'reg add "' + winReg + '" /v ProxyEnable /t REG_DWORD /d 1 /f';	
		var setProxy = 'reg add "' + winReg + '" /v ProxyServer /d "http=' + server + ';https=' + server + '" /f';
		cmd = enableProxy + ' && ' + setProxy;
	} else if (process.platform == 'linux') {
        cmd = 'export HTTP_PROXY=http://' + server;
    }
	
	cp.execSync(cmd);	
};

exports.resetProxy = function (){
	var cmd;
	if (process.platform === "win32") {
		cmd = 'reg add "' + winReg + '" /v ProxyEnable /t REG_DWORD /d 0 /f';
	} else if (process.platform == 'linux') {
        cmd = 'export HTTP_PROXY=';
    }
	
	cp.execSync(cmd);	
};
