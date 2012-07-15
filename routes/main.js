var utils = require('../lib/utils'),
	db = app.db;

/*
 * GET home page
 */
app.get('/', function(req, res, next) {
	res.render('index');
});

/*
 * GET all urls
 */
app.get('/u', function(req, res, next) {
	var query = db.query("SELECT * FROM urls"),
		reply = {};

	query.on('row', function(row) {
		// convert to local time
		var t = new Date(row.time_created + "UTC");
		reply[t] = row.url;
	});

	query.on('end', function() {
		res.render('urls', { urls: reply });
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