const mongoose = require('mongoose');
const taskSchema = require('../Schemas/taskSchema');

const TaskModel = mongoose.model('Task', taskSchema);

exports.create = async (data) => {
	const task = new TaskModel(data);
	const taskDetails = await task.save();
	/* eslint no-underscore-dangle: 0 */
	return taskDetails._id;
};

exports.allTask = () => TaskModel.find({});

exports.getTask = (taskId) => TaskModel.findById(taskId);
