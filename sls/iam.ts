export const IAM = {
	role: {
		statements: [
			{
				Effect: 'Allow',
				Action: [
					'dynamodb:DescribeTable',
					'dynamodb:Query',
					'dynamodb:Scan',
					'dynamodb:GetItem',
					'dynamodb:PutItem',
					'dynamodb:UpdateItem',
					'dynamodb:DeleteItem',
				],
				Resource: [
					{ 'Fn::GetAtt': ['usersTable', 'Arn'] },
					{
						'Fn::Join': [
							'/',
							[{ 'Fn::GetAtt': ['usersTable', 'Arn'] }, 'index/*'],
						],
					},
				],
			},
		],
	},
};
