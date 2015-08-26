var cp = require('child_process');
var regName = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";

exports.setProxy = function (host,port){
	if (process.platform === "win32") {
		var enableProxy = 'reg add "' + regName + '" /v ProxyEnable /t REG_DWORD /d 1 /f';
		var server = host + ":" + port;
		var setProxy = 'reg add "' + regName + '" /v ProxyServer /d "http=' + server + ';https=' + server + '" /f';
		return new Promise(function (resolve,reject){
			cp.exec(enableProxy + ' && ' + setProxy,function (err,stdout,stderr){
				if (err) {
					return reject(err);
				}
				return resolve();
			})
		})	
	} else if (process.platform == 'linux') {
        var setProxy = 'export HTTP_PROXY=http://' + host + ':' + port;
        return new Promise(function (resolve,reject){
			cp.exec(setProxy,function (err,stdout,stderr){
				if (err) {
					return reject(err);
				}
				return resolve();
			})
		})	
    }
};

exports.resetProxy = function (){
	if (process.platform === "win32") {
		var disableProxy = 'reg add "' + regName + '" /v ProxyEnable /t REG_DWORD /d 0 /f';
		var setProxy = 'reg add "' + regName + '" /v ProxyServer /d "" /f';
		return new Promise(function (resolve,reject){
			cp.exec(disableProxy + ' && ' + setProxy,function (err,stdout,stderr){
				if (err) {
					return reject(err);
				}
				return resolve();
			})
		})
	} else if (process.platform == 'linux') {
        var setProxy = 'export HTTP_PROXY=';
        return new Promise(function (resolve,reject){
			cp.exec(setProxy,function (err,stdout,stderr){
				if (err) {
					return reject(err);
				}
				return resolve();
			})
		})	
    }
};