var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

var config = require('./config/config');
var proxyTool = require('./lib/sysProxy');

var readFile = function (file){
	return new Promise(function (resolve,reject){
		fs.readFile(file,function (err,data){
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});	
};

var writeFile = function (file,data){
	return new Promise(function (resolve,reject){
		fs.writeFile(file,data,function (err){
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});	
};

exports.setProxy = function (opts){
	proxyTool.setProxy(config.koaServer.host,config.koaServer.port);

	var cp = child_process.spawn('node',[
			'--harmony',
			path.join(__dirname,'/lib/app.js'),
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

exports.addHost = function (domain,ip){
	var file = path.join(__dirname,'/config/hosts.json');
	return readFile(file)
		.then(function (data){
			var hosts = JSON.parse(data.toString());
			hosts[domain] = ip;
			return JSON.stringify(hosts);
		})
		.then(function (data){
			data = new Buffer(data);
			return writeFile(file,data)
				.then(function (){
					return data;
				})
		})
};

exports.showHosts = function (){
	return readFile(path.join(__dirname,'/config/hosts.json'));
};