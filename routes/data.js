var parse = require('url').parse,
	db = app.db;

/*
 * Set url:<id> hash
 */
app.on('url', function(url, id) {
	console.log("Saving url:", url);
	var now = new Date();

	db.query("INSERT INTO urls(time_created, url) values($1, $2)", [now, url]);
});