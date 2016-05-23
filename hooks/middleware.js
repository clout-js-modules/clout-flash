/*!
 * clout-redis-session
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const format = require('util').format;

module.exports = {
	session: {
		event: 'start',
		override: true,
		priority: 11, // after MIDDLEWARE
		fn: function (next) {
			this.app.use(function (req, resp, next) {
				// check if flash already exists
				if (req.flash) { return next(); }
				// append flash to req
				req.flash = flash;
				next();
			});
		}
	}
};

/**
 * Set and Get Flash `value` for `key`
 * @param  {String} 		key   	key e.g. info
 * @param  {String|Object} 	value 	message to save
 * @return {Array|Object}       	messages
 */
function flash(key, value) {
	// ensure session exists
	if (typeof this.session === 'undefined') {
		throw Error('req.flash() requires sessions');
	}

	// ensure flash object
	!this.session.flash && (this.session.flash = {});

	// set
	if (typeof key !== 'undefined' && typeof value !== 'undefined') {
		!this.session.flash[key] && (this.session.flash[key] = []);
		var done = false;
		if (typeof value === 'String') {
			var message = value;
			if (arguments.length > 2) {
				var args = Array.prototype.slice.call(arguments, 1);
				message = format.apply(null, args);
			}

			this.session.flash[key].push(message);
			done = true;
		}
		if (Array.isArray(value)) {
			value.forEach(function (message) {
				this.session.flash[key].push(message);
			});
			done = true;
		}
		if (!done) {
			this.logger.error('Invalid value for flash cookie');
		}
		return this.session.flash[key];
	}

	var msgs = JSON.parse(JSON.stringify(this.session.flash[key]));
	// get
	if (typeof key !== 'undefined') {
		delete this.session.flash[key];
		return msgs[key];
	}

	// flush
	this.session.flash = {};
	return msgs;
}
