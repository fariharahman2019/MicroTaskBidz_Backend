const ErrorHandler = require('../utils/errorhander');

module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		// will only respond with JSON
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};

		// Wrong DATABASE Id error
		if (err.name === 'CastError') {
			const message = `Resource not found. Invalid: ${err.path}`;
			ctx.err = new ErrorHandler(message, 400);
		}

		// DATABASE duplicate key error
		if (err.code === 11000) {
			const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
			ctx.err = new ErrorHandler(message, 400);
		}

		// Wrong JWT error
		if (err.name === 'JsonWebTokenError') {
			const message = `Json Web Token is invalid, Try again `;
			ctx.err = new ErrorHandler(message, 400);
		}
		// JWT EXPIRE error
		if (err.name === 'TokenExpiredError') {
			const message = `Json Web Token is Expired, Try again `;
			ctx.err = new ErrorHandler(message, 400);
		}
		ctx.res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	}
};
