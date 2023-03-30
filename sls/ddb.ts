export const usersTable = {
	Type: 'AWS::DynamoDB::Table',
	Properties: {
		TableName: 'users',
		AttributeDefinitions: [
			{ AttributeName: 'id', AttributeType: 'N' },
			{ AttributeName: 'dateJoined', AttributeType: 'N' },
			{ AttributeName: 'status', AttributeType: 'N' },
		],
		KeySchema: [
			{
				AttributeName: 'id',
				KeyType: 'HASH',
			},
		],
		BillingMode: 'PAY_PER_REQUEST',
		// ProvisionedThroughput: {
		// 	ReadCapacityUnits: 5,
		// 	WriteCapacityUnits: 5,
		// },
		GlobalSecondaryIndexes: [
			{
				IndexName: 'dateJoinedIdx',
				KeySchema: [
					{
						AttributeName: 'status',
						KeyType: 'HASH',
					},
					{
						AttributeName: 'dateJoined',
						KeyType: 'RANGE',
					},
				],
				Projection: {
					ProjectionType: 'ALL',
				},
			},
		],
		LocalSecondaryIndexes: [],
	},
} as const;
