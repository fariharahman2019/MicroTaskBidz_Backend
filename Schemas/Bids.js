const { Schema } = require('mongoose');

const bidSchema = new Schema({
	bid: {
		type: Number,
		required: [true, 'Must have bid amount'],
	},
	taskId: {
		type: Schema.Types.ObjectId,
		ref: 'Task',
		required: [true, 'A bid must belong to a task'],
	},
	userId: {
		type: String,
		required: [true, 'A bid must belong to a user'],
	},
	isWinner: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = bidSchema;
