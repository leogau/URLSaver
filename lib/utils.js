var crypto = require('crypto');

/*
 * MD5 given url
 */
exports.md5 = function(str) {
	return crypto
		.createHash('md5')
		.update(str)
		.digest('hex');
};


/*
 * Add 'http://' to url if needed
 */
exports.url = function(url) {
	if (~url.indexOf("://")) return url;

	return 'http://' + url;
};