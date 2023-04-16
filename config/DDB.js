const AWS = require('aws-sdk');

const awsConfigs = {
	dynamodb: {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY,
			accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
		},
		region: process.env.AWS_REGION,
	},
};

if (process.env.DYNAMO_ENDPOINT) {
	awsConfigs.dynamodb.endpoint = process.env.DYNAMO_ENDPOINT;
}

AWS.config.update(awsConfigs);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
