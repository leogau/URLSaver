var utils = require('../lib/utils'),
	db = app.db;

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

/*
 * GET home page
 */
app.get('/', function(req, res, next) {
	res.render('index');
});

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
// /auth/google/return
app.get('/auth/google',
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
	res.redirect('/u');
});

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
  	res.redirect('/u');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*
 * GET all urls
 */
app.get('/u', ensureAuthenticated, function(req, res, next) {
	var query = db.query("SELECT * FROM urls"),
		reply = {};

	query.on('row', function(row) {
		// convert to local time
		var t = new Date(row.time_created + "UTC");
		reply[t] = row.url;
	});

	query.on('end', function() {
		res.render('urls', { urls: reply, user: req.user });
		db.end();
	});
});

/*
 * GET url to save
 */
app.get('/:url(*)', function(req, res, next) {
	var url = utils.url(req.params.url);
	if (!url) return res.send(400);

	var id = utils.md5(url);

	if (url === 'http://humans.txt' || url === 'http://favicon.ico') {
		//
	} else {
		app.emit('url', url, id);
	}

	res.render('saved');
});