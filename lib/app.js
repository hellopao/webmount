var koa = require('koa');
var argv = require('yargs').argv;

var config = require('../config/config');
var fileServer = require('./fileServer');
var httpProxy = require('./httpProxy');

var app = koa();

app.use(fileServer(argv));

app.use(httpProxy());

app.listen(config.koaServer.port);
