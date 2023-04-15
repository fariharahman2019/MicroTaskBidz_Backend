// const md5 = require('md5');
const cache = require('memory-cache');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const { changePasswordRules } = require('../helpers/validationRules');

// const userModel = require('../models/User');
const EmailAdapter = require('../Adapters/Email');
const { signInRules } = require('../helpers/validationRules');
const variables = require('../config/variables');
const { resetPasswordRules } = require('../helpers/validationRules');

const { confirmEmailRules } = require('../helpers/validationRules');

const signToken = (id, email, name) =>
	jwt.sign({ id, email, name }, variables.jwtSecretKey, {
		expiresIn: variables.jwtExpiresIn,
	});

exports.signin = async (ctx) => {
	try {
		const { email, password } = ctx.request.body;
		const validation = new Validator({ email, password }, signInRules);
		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid request',
				errors: validation.errors.all(),
			});
		}
		// const user = await userModel.getItem(email);
		// if (!user || user.password !== md5(password)) {
		// 	throw Object.assign(new Error(), {
		// 		status: 401,
		// 		message: 'Invalid email or password',
		// 	});
		// }
		const token = signToken(7, 'demo@cyclic.app', 'demo user');
		ctx.status = 200;
		ctx.body = { status: 'success', token, message: 'Login successful' };
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			message: err.message || 'Something went wrong',
			errors: err.errors || null,
		};
	}
};

exports.getDetails = async (ctx) => {
	try {
		// const { userEmail } = ctx.headers;
		// const userDetails = await userModel.getDetails(userEmail);
		ctx.status = 200;
		ctx.body = {
			id: 7,
			name: 'Demo user',
			email: 'demo@cyclic.app',
		};
	} catch (e) {
		ctx.status = 500;
		ctx.body = {
			message: 'something went wrong',
		};
	}
};

exports.signup = async (ctx) => {
	try {
		const { name, email, password } = ctx.request.body;
		const validation = new Validator(
			{ name, email, password },
			{ name: 'required', email: 'required|email', password: 'required|min:8' }
		);

		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid request',
				errors: validation.errors.all(),
			});
		}

		// if (await userModel.doesExist(email)) {
		// 	throw Object.assign(new Error(), {
		// 		status: 400,
		// 		message: 'Email address already exists',
		// 	});
		// }
		// await userModel.createNew({ name, email, password: md5(password) });

		ctx.status = 200;
		ctx.body = { message: 'Success' };
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			message: err.message || 'Something went wrong',
			errors: err.errors || null,
		};
	}
};

exports.resetPassword = async (ctx) => {
	try {
		const { email } = ctx.request.body;
		const randomCode = Math.floor(1e5 + Math.random() * 9e5);
		cache.put(email, randomCode, 120 * 1000);
		await EmailAdapter.sendOTP(email, randomCode);
		ctx.body = {
			message: 'Please check your email',
		};
	} catch (error) {
		ctx.status = error.statusCode || error.status || 500;
		ctx.body = {
			message: error.message,
		};
	}
};
exports.confirmPassword = async (ctx) => {
	try {
		const { code, password, email } = ctx.request.body;
		const validation = new Validator(
			{ email, code, password },
			resetPasswordRules
		);
		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid Email or Code or Password',
				errors: validation.errors.all(),
			});
		}
		const randomCode = cache.get(email);
		if (code !== randomCode) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid or expired code',
			});
		}
		// await userModel.ChangePassword(email, md5(password));
		ctx.body = { message: 'User Password changed Successfully' };
		ctx.status = 200;
	} catch (error) {
		ctx.status = error.statusCode || error.status || 500;
		ctx.body = {
			message: error.message,
		};
	}
};

exports.confirmEmail = async (ctx) => {
	try {
		const { email, randomCode } = ctx.request.body;
		const validation = new Validator({ email, randomCode }, confirmEmailRules);
		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid Email or Code',
				errors: validation.errors.all(),
			});
		}
		const randomCodeFromCache = cache.get(email);
		if (randomCodeFromCache !== randomCode) {
			ctx.status = 400;
			ctx.body = {
				message: 'Invalid or Expired Code',
			};
		}
		// await userModel.updateEmailConfirmationStatus({
		// 	email,
		// 	isConfirmEmail: true,
		// });
		ctx.status = 200;
	} catch (error) {
		ctx.status = error.statusCode || error.status || 500;
		ctx.body = {
			message: error.message,
		};
	}
};

exports.update = async (ctx) => {
	try {
		// const { userEmail } = ctx.headers;
		const { name } = ctx.request.body;
		const validation = new Validator({ name }, { name: 'required' });
		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid request',
				errors: validation.errors.all(),
			});
		}
		// await userModel.update(userEmail, { name });
		ctx.status = 200;
		ctx.body = {
			message: 'user updated successfully',
		};
	} catch (error) {
		ctx.status = error.status || 500;
		ctx.body = {
			message: error.message || 'something went wrong',
			errors: error.errors || null,
		};
	}
};

exports.changePassword = async (ctx) => {
	try {
		// const { userEmail } = ctx.headers;
		const { oldPassword, newPassword } = ctx.request.body;
		const validation = new Validator(
			{ oldPassword, newPassword },
			changePasswordRules
		);

		if (validation.fails()) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'Invalid request',
				errors: validation.errors.all(),
			});
		}

		// const UserDetails = await userModel.getDetails(userEmail);

		// if (UserDetails.password !== md5(oldPassword)) {
		// 	throw Object.assign(new Error(), {
		// 		status: 400,
		// 		message: "Password doesn't match",
		// 	});
		// }

		// await userModel.ChangePassword(userEmail, md5(newPassword));
		ctx.body = { message: 'Password changed Successfully' };
		ctx.status = 200;
	} catch (error) {
		ctx.status = error.statusCode || error.status || 400;
		ctx.body = {
			message: error.message,
		};
	}
};
