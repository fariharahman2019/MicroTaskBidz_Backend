const { v4: uuid } = require('uuid');
const variables = require('../config/variables');
const docClient = require('./DDB');

exports.getDetails = async (userEmail) => {
	const params = {
		TableName: variables.userTable,
		Key: {
			[variables.email]: userEmail,
		},
	};
	const user = await docClient.get(params).promise();
	return user.Item;
};

// USER ALREDY EXISTING

exports.doesExist = (email) => {
	const params = {
		TableName: variables.userTable,
		Key: {
			[variables.email]: email,
		},
		ConsistentRead: false,
		ReturnConsumedCapacity: 'NONE',
	};

	const result = docClient.get(params).promise();
	return result.Item && Object.keys(result.Item);
};

// CREATE NEW USER

exports.createNew = async ({ name, email, password }) => {
	const params = {
		TableName: variables.userTable,
		Item: {
			id: uuid(),
			name,
			email,
			password,
		},
		ReturnValues: 'NONE',
		ReturnConsumedCapacity: 'NONE',
		ReturnItemCollectionMetrics: 'NONE',
	};

	await docClient.put(params).promise();
};

// ConfirmEmail

exports.updateEmailConfirmationStatus = async ({ email, isConfirmEmail }) => {
	const params = {
		TableName: variables.userTable,
		Key: {
			[variables.email]: email,
		},
		UpdateExpression: 'set isConfirmEmail = :value',
		ExpressionAttributeValues: {
			':value': isConfirmEmail,
		},
	};
	await docClient.update(params).promise();
};

exports.getItem = async (email) => {
	const user = await docClient
		.get({
			TableName: variables.userTable,
			Key: {
				[variables.email]: email,
			},
		})
		.promise();
	return user.Item;
};

exports.update = async (mail, user) => {
	const params = {
		TableName: variables.userTable,
		Key: {
			[variables.email]: mail,
		},
		UpdateExpression: 'SET #name = :nameVal',
		ExpressionAttributeNames: {
			'#name': 'name',
		},
		ExpressionAttributeValues: {
			':nameVal': user.name,
		},
		ReturnValues: 'UPDATED_NEW',
	};

	return docClient.update(params).promise();
};
exports.ChangePassword = async (email, password) => {
	const params = {
		TableName: variables.userTable,
		Key: { [variables.email]: email },
		UpdateExpression: 'set password = :password',
		ExpressionAttributeValues: {
			':password': password,
		},
		ReturnValues: 'NONE',
	};
	return docClient.update(params).promise();
};
