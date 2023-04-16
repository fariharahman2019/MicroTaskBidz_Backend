const { Schema } = require('mongoose');

const taskSchema = new Schema({
	taskName: {
		type: String,
		required: true,
	},
	maxBudget: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = taskSchema;
