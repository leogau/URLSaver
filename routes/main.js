var utils = require('../lib/utils');

/*
 * GET home page
 */
app.get('/', function(req, res, next) {
	res.render('index');
});

/*
 * GET url to save
 */
app.get('/:url(*)', function(req, res, next) {
	var url = utils.url(req.params.url);
	if (!url) return res.send(400);

	var id = utils.md5(url);

	app.emit('url', url, id);
	res.render('saved');
});