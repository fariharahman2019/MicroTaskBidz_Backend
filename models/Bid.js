const mongoose = require('mongoose');
const bidSchema = require('../Schemas/Bids');

const bidModel = mongoose.model('Bid', bidSchema);

exports.createBid = async (data) => {
	await bidModel.create(data);
};

exports.getBidsByTaskId = (taskId) => bidModel.find({ taskId });
