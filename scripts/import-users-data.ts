/* eslint-disable no-await-in-loop,import/no-extraneous-dependencies,no-param-reassign */
import { env as ENV, exit } from 'node:process';

import { fromIni } from '@aws-sdk/credential-providers';
import dynamoose from 'dynamoose';

import users from '../data/users.json';
import { User } from '../src/db';

const awsProfile = ENV.DDB_PROFILE || 'vithzAdmin';
const awsRegion = ENV.DDB_REGION || 'ap-south-1';

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
	region: awsRegion,
	credentials: fromIni({ profile: awsProfile }),
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

function chunkArray(array, size) {
	const chunks = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
}

async function script() {
	try {
		// Batch write items in chunks of 25
		const chunks = chunkArray(users, 25);

		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i].map((el) => {
				el.status = 1;
				return el;
			});
			const res = await User.batchPut(chunk);
			console.log('Result for batch: ', i + 1, res, '\n\n');
		}

		console.log('done');
	} catch (error) {
		console.error('failed', error);
	}
}

script()
	.then(() => exit(0))
	.catch(() => exit(1));
