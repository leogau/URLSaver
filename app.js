// Dependencies
var express = require('express'),
	stylus = require('stylus'),
	http = require('http');

// Database setup
var pg = require('pg'),
    connectionString = process.env.DATABASE_URL || 'postgres://leo:qcskZa6QGs@localhost:5432/urls',
    client = new pg.Client(connectionString);

client.connect();

// Create app
var application_root = __dirname,
	port = process.env.PORT || 4848;

app = express();
app.configure(function() {
	app.db = client;
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