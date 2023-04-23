const mongoose = require('mongoose');
const contractorSchema = require('../Schemas/contractorSchema');

const Contractor = mongoose.model('Contractor', contractorSchema);

exports.contractorCreate = (data) => {
	const newContractor = new Contractor(data);
	return newContractor.save();
};

exports.contractorExist = async (email) => {
	const contractorExist = await Contractor.findOne({ email });
	return contractorExist;
};
