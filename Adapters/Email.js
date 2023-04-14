const nodemailer = require('nodemailer');
require('dotenv').config();
const variables = require('../config/variables');

const createTransporter = async () => {
	let transporter;
	try {
		transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 587, // enter port name
			secure: false, // true for 465, false for other ports
			auth: {
				user: variables.senderEmail,
				pass: variables.senderAppPassword,
			},
			tls: { rejectUnauthorized: false }, // Important for sending mail from localhost}}
		});
	} catch (err) {
		return err;
	}
	return transporter;
};

const createEmailOptions = (email, name, subject, data) => ({
	from: `<${variables.senderEmail}>`,
	// Comma separated list of recipients
	to: `${name} <${email}>`,

	// Subject of the message
	subject,

	// plaintext body
	text: data.message,
});
const sendEmail = async (email, name, subject, { ...data }) => {
	const emailOptions = createEmailOptions(email, name, subject, data);
	return createTransporter()
		.then((_) => _.sendMail(emailOptions))
		.then((info) => info)
		.catch((err) => err);
};

const sendOTP = async (email, code) => {
	const emailOptions = createEmailOptions(email, 'User', 'OTP', {
		message: `Your OTP is: ${code}`,
	});
	return createTransporter()
		.then((_) => _.sendMail(emailOptions))
		.then((info) => info)
		.catch((err) => err);
};

module.exports = {
	sendEmail,
	sendOTP,
};
