import type { AWS } from '@serverless/typescript';

import { usersTable } from './sls/ddb';
import { IAM } from './sls/iam';
import { openAPI } from './sls/openapi';
import { getUserByIdConfig, getUsersConfig } from './src/functions';

const serverlessConfiguration: AWS = {
	service: 'falcon',
	frameworkVersion: '3',
	plugins: [
		'serverless-esbuild',
		'serverless-offline',
		'serverless-api-gateway-throttling',
		'serverless-openapi-documenter',
	],
	provider: {
		name: 'aws',
		runtime: 'nodejs18.x',
		memorySize: 256,
		region: 'ap-south-1',
		timeout: 29,
		stage: 'dev',
		versionFunctions: false,
		logRetentionInDays: 14,
		deploymentBucket: {
			maxPreviousDeploymentArtifacts: 5,
		},
		httpApi: {
			cors: true,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
		},
		iam: IAM,
	},
	functions: { getUsers: getUsersConfig, getUserById: getUserByIdConfig },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node18',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
		apiGatewayThrottling: {
			maxRequestsPerSecond: 10,
			maxConcurrentRequests: 5,
		},
		documentation: openAPI,
	},
	resources: {
		Resources: {
			usersTable,
		},
	},
};
module.exports = serverlessConfiguration;
