import validator from 'validator'

/**
 * Recursively sanitize an object or string
 */
const sanitize = (obj) => {
	if (typeof obj === 'string') {
		let sanitized = validator.stripLow(obj);
		sanitized = validator.escape(sanitized);
		sanitized = validator.trim(sanitized);
		return sanitized;
	} else if (typeof obj === 'object' && obj !== null) {
		for (let key in obj) {
			if (key.startsWith('$') || key.includes('.')) {
				delete obj[key];
			} else if (typeof obj[key] === 'object') {
				sanitize(obj[key]); // recurse but don't assign
			} else {
				obj[key] = sanitize(obj[key]);
			}
		}
	}
};

/**
 * Express middleware to sanitize incoming requests
 */
const sanitizeRequest = (req, res, next) => {
	if (req.body) sanitize(req.body);   // mutate in place
	if (req.query) sanitize(req.query); // mutate in place
	if (req.params) sanitize(req.params); // mutate in place
	next();
};

export default sanitizeRequest;
