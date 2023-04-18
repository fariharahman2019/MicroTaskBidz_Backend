const cache = require('memory-cache');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');

const contractorModel = require('../models/Contractor');
const EmailAdapter = require('../Adapters/Email');
const variables = require('../config/variables');
const { signInRules } = require('../helpers/validationRules');

exports.createContractor = async (ctx) => {
	try {
		const { name, email, password } = ctx.request.body;
		if (await contractorModel.contractorExist(email)) {
			throw Object.assign(new Error(), {
				status: 400,
				message: 'A account already exits with this email',
			});
		}

		const newContractor = await contractorModel.contractorCreate({
			name,
			email,
			password: md5(password),
		});
		const randomCode = Math.floor(1e5 + Math.random() * 9e5);
		cache.put(email, randomCode, 120 * 1000);
		await EmailAdapter.sendOTP(email, randomCode);
		ctx.body = {
			message: 'Contractor Successfully created',
			newContractor,
		};
		ctx.status = 200;
	} catch (error) {
		ctx.status = error.status || 500;
		ctx.body = {
			message: error.message || 'Something went wrong',
		};
	}
};

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
		const contractor = await contractorModel.contractorExist(email);
		if (!contractor || contractor.password !== md5(password)) {
			throw Object.assign(new Error(), {
				status: 401,
				message: 'Invalid email or password',
			});
		}
		const token = signToken(contractor.id, contractor.email, contractor.name);
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
