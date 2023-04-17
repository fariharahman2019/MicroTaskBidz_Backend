/* eslint-disable no-underscore-dangle */
const TaskModel = require('../models/Task');
const BidModel = require('../models/Bid');

exports.createTask = async (ctx) => {
	try {
		const { taskName, maxBudget } = ctx.request.body;
		const taskId = await TaskModel.create({
			taskName,
			maxBudget,
		});
		ctx.body = {
			message: 'Task Successfully created',
			taskId,
		};
		ctx.status = 200;
	} catch (error) {
		ctx.status = error.statusCode || error.status || 500;
		ctx.body = {
			message: error.message,
		};
	}
};

exports.allTask = async (ctx) => {
	try {
		const taskList = await TaskModel.allTask();
		ctx.body = {
			message: 'Task Successfully fetched',
			status: 'success',
			data: taskList,
		};
		ctx.status = 200;
	} catch (error) {
		ctx.status = error.statusCode || error.status || 500;
		ctx.body = {
			message: error.message,
		};
	}
};

exports.getTask = async (ctx) => {
	try {
		const { taskId } = ctx.params;
		const task = await TaskModel.getTask(taskId);
		const bids = await BidModel.getBidsByTaskId(taskId);

		ctx.status = 200;
		ctx.body = {
			status: 'success',
			...task._doc,
			bids,
		};
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			message: err.message || 'Something went wrong',
			errors: err.errors || null,
		};
	}
};
