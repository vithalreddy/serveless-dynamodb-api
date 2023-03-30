import { env as ENV } from 'node:process';

import { fromIni } from '@aws-sdk/credential-providers';
import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

if (ENV.IS_OFFLINE) {
	// Create new DynamoDB instance
	const ddb = new dynamoose.aws.ddb.DynamoDB({
		region: 'ap-south-1',
		credentials: fromIni({ profile: 'vithzAdmin' }),
	});

	// Set DynamoDB instance to the Dynamoose DDB instance
	dynamoose.aws.ddb.set(ddb);
	dynamoose.logger().then(async (logger) => {
		logger.providers.set(console);
	});
}

class UserClass extends Item {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	gender:
		| 'Female'
		| 'Genderfluid'
		| 'Male'
		| 'Polygender'
		| 'Bigender'
		| 'Agender'
		| 'Non-binary'
		| 'Genderqueer';
	ipAddress: string;
	dateJoined: number;
	status: 1 | 0;
}

export const User = dynamoose.model<UserClass>(
	'users',
	new dynamoose.Schema({
		id: { type: Number, hashKey: true },
		firstName: String,
		lastName: String,
		email: String,
		gender: {
			type: String,
			enum: [
				'Female',
				'Genderfluid',
				'Male',
				'Polygender',
				'Bigender',
				'Agender',
				'Non-binary',
				'Genderqueer',
			],
		},
		ipAddress: String,
		dateJoined: { type: Number },
		status: {
			type: Number,
			enum: [1, 0],
			index: [
				{
					name: 'dateJoinedIdx',
					type: 'global',
					rangeKey: 'dateJoined',
				},
			],
		},
	}),
	{ create: false, update: false },
);
