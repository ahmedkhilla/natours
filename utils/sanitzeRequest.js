import validator from 'validator';

// Helper: sanitize fields recursively
//const sanitizeInput = (obj) => {
//	if (typeof obj !== 'object' || obj === null) return obj;

//	const sanitizedObj = Array.isArray(obj) ? [] : {};

//	for (const key of Object.keys(obj)) {
//		const value = obj[key];

//		if (typeof value === 'string') {
//			sanitizedObj[key] = validator.escape(value.trim());
//		} else if (typeof value === 'object' && value !== null) {
//			sanitizedObj[key] = sanitizeInput(value);
//		} else {
//			sanitizedObj[key] = value;
//		}
//	}

//	return sanitizedObj;
//};

//// Middleware
//const sanitizeRequest = (req, res, next) => {
//	// Sanitize req.body if it exists and is an object
//	if (req.body && typeof req.body === 'object') {
//		req.body = sanitizeInput(req.body);
//	}

//	// Sanitize req.query by cloning it first to avoid modifying the immutable query object
//	if (req.query && typeof req.query === 'object') {
//		req.query = sanitizeInput({ ...req.query }); // Clone + sanitize
//	}

//	// Sanitize req.params if it exists and is an object
//	if (req.params && typeof req.params === 'object') {
//		req.params = sanitizeInput(req.params); // Clone + sanitize
//	}

//	next();
//};



//const { JSDOM } = require('jsdom');
//const DOMPurify = require('dompurify');

//// Initialize jsdom and DOMPurify
//const window = new JSDOM('').window;
//const purify = DOMPurify(window);

//// Middleware to sanitize request data
function sanitizeRequest(req, res, next) {
	// Sanitize query parameters
	if (req.query) {
		for (const key in req.query) {
			if (Object.hasOwnProperty.call(req.query, key)) {
				req.query[key] = purify.sanitize(req.query[key]);
			}
		}
	}

	// Sanitize body data
	if (req.body) {
		for (const key in req.body) {
			if (Object.hasOwnProperty.call(req.body, key)) {
				req.body[key] = purify.sanitize(req.body[key]);
			}
		}
	}

	// Sanitize URL parameters
	if (req.params) {
		for (const key in req.params) {
			if (Object.hasOwnProperty.call(req.params, key)) {
				req.params[key] = purify.sanitize(req.params[key]);
			}
		}
	}

	next();
}


export default sanitizeRequest;