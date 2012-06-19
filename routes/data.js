var parse = require('url').parse,
	db = app.db;

/*
 * Set url:<id> hash
 */
app.on('url', function(url, id) {
	console.log("Saving url:", url);
	var now = Date.now();
	db.hset('urlsaver:url:id', url, id);
	db.zadd('urlsaver:ids', now, id);
	db.zadd('urlsaver:urls', now, url);
	db.zadd('urlsaver:hosts', now, parse(url).host);
	db.hmset('urlsaver:' + id, {
		created_at: now,
		url: url,
		id: id
	});
});