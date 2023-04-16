const signUpRules = {
	email: 'required|email',
	// other rules in validator.js format
};
const taskRules = {
	taskName: 'required',
	maxBudget: 'required',
};
const changePasswordRules = {
	oldPassword: 'required|min:8',
	newPassword: 'required|min:8',
};
const signInRules = {
	email: 'required|email',
	password: 'required|min:8',
};

const bidRules = {
	taskId: 'required',
	bid: 'required|numeric',
};
const resetPasswordRules = {
	code: 'required|numeric',
	email: 'required|email',
	password: 'required|min:8',
};

const confirmEmailRules = {
	email: 'required|email',
	randomCode: 'required|min:6',
};

module.exports = {
	signUpRules,
	taskRules,
	signInRules,
	changePasswordRules,
	resetPasswordRules,
	bidRules,
	confirmEmailRules,
};
