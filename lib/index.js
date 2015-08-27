var child_process = require('child_process');
var path = require('path');

var config = require('../config/config');
var proxyTool = require('./sysProxy');

exports.setProxy = function (opts){
	proxyTool.setProxy(config.koaServer.host,config.koaServer.port);

	var cp = child_process.spawn('node',[
			'--harmony',
			path.join(__dirname,'app.js'),
			'--host=' + opts.host,
			'--port=' + opts.port,
			'--root=' + opts.root
		]);
		
	cp.on('error',function (err){
		console.log(err);
	});
				
	cp.on('exit',function (){
		proxyTool.resetProxy();
	});
	
	cp.stdout.pipe(process.stdout);	
	cp.stderr.pipe(process.stderr);
			
};

exports.resetProxy = function (){
	return proxyTool.resetProxy();
};
