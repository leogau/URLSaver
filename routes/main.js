var utils = require('../lib/utils'),
	db = app.db;

/*
 * Convert milliseconds to correct dates
 * an return as an object.
 *
 * Expecting array with format: [url, int, ...]
 */
var dateConvert = function(arr) {
	var obj = {};
	arr.forEach(function(elem, idx, array) {
		if (idx % 2 === 1) {
			var d = new Date(parseInt(elem, 10));
			obj[d.toDateString()] = array[idx-1];
		}
	});
	console.log(obj);
	return obj;
};

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
		reply[row.time_created] = row.url;
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