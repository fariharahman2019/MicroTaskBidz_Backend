const JWT = require('jsonwebtoken');

const variables = require('../config/variables');

const unauthorizedAccess = { status: 401, message: 'Unauthorized access' };

exports.authenticate = async (ctx, next) => {
	try {
		const { authorization } = ctx.headers;
		if (!authorization) {
			throw unauthorizedAccess;
		}
		const token = authorization.split(' ')[1];
		if (!token) {
			throw unauthorizedAccess;
		}
		const data = JWT.verify(token, variables.jwtSecretKey);
		ctx.headers.userId = data.id;
		ctx.headers.userEmail = data.email;

		await next();
		// console.log(ctx.status, ctx.body);
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = { message: err.message || 'Something went wrong' };
	}
};
