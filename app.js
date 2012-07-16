// Dependencies
var express = require('express'),
	stylus = require('stylus'),
	http = require('http'),
	GoogleStrategy = require('passport-google').Strategy;

// Google auth setup
passport = require('passport');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
	// returnURL: 'http://localhost:4848/auth/google/return',
	// realm: 'http://localhost:4848'
	returnURL: 'http://url.leogau.org/auth/google/return',
	realm: 'http://url.leogau.org'
	},
	function(identifier, profile, done) {
	    process.nextTick(function () {
	      
	      // To keep the example simple, the user's Google profile is returned to
	      // represent the logged-in user.  In a typical application, you would want
	      // to associate the Google account with a user record in your database,
	      // and return that user instead.
	      profile.identifier = identifier;
	      return done(null, profile);
    	});	
    }
));


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
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: "keyboard cat" }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

require('./routes');

http.createServer(app).listen(port);
console.log("Server listening on port " + port);