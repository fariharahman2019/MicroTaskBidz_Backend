const Validator = require('validatorjs');

const bidModel = require('../models/Bid');
const { bidRules } = require('../helpers/validationRules');

exports.createBid = async (ctx) => {
	try {
		const { userId } = ctx.headers;
		const { taskId, bid } = ctx.request.body;
		const validation = new Validator({ taskId, bid }, bidRules);
		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid request',
				errors: validation.errors.all(),
			});
		}
		await bidModel.createBid({ userId, taskId, bid });

		ctx.status = 200;
		ctx.body = {
			status: 'success',
			message: 'Bid placed successfully',
		};
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			message: err.message || 'Something went wrong',
			errors: err.errors || null,
		};
	}
};
