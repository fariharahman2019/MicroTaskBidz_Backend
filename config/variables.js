// default
require('dotenv').config();

const appPort = process.env.APP_PORT;
const loggerName = process.env.LOGGER_NAME;
const serviceName = process.env.SERVICE_NAME;
const serviceDomain = process.env.SERVICE_DOMAIN;
const logLevel = process.env.LOG_LEVEL;
const connectionString = process.env.MONGODB_CONN_STRING;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const userTable = process.env.USER_TABLE;
const email = process.env.USER_DDB_HASH;
const mailingServiceHost = process.env.MAILING_SERVICE_HOST;
const senderEmail = process.env.SENDER_EMAIL_ADDRESS;
const senderAppPassword = process.env.SENDER_APP_PASSWORD;

const variables = {
	appPort,
	loggerName,
	logLevel,
	serviceName,
	serviceDomain,
	userTable,
	email,
	connectionString,
	jwtSecretKey,
	jwtExpiresIn,
	mailingServiceHost,
	senderEmail,
	senderAppPassword,
};

module.exports = variables;
