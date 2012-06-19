// Dependencies
var express = require('express'),
	stylus = require('stylus'),
	redis = require('redis'),
	http = require('http');

// Create app
var application_root = __dirname,
	port = process.env.PORT || 4848;

app = express();
app.configure(function() {
	app.db = redis.createClient();
	app.set('views', application_root + '/views');
	app.set('view engine', 'jade');
	app.set('root', application_root);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(stylus.middleware({ src: application_root + '/public' }));
	app.use(express.static(application_root + '/public'));
	app.use(app.router);
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

require('./routes');

http.createServer(app).listen(port);
console.log("Server listening on port " + port);