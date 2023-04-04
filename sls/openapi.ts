const userSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'number',
		},
		firstName: {
			type: 'string',
		},
		lastName: {
			type: 'string',
		},
		email: {
			type: 'string',
			format: 'email',
		},
		gender: {
			type: 'string',
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
		ipAddress: {
			type: 'string',
			format: 'ipv4',
		},
		dateJoined: {
			type: 'number',
		},
	},
	required: [
		'id',
		'firstName',
		'lastName',
		'email',
		'gender',
		'ipAddress',
		'dateJoined',
	],
};

export const openAPI = {
	version: '1',
	title: 'Falcon User APIs',
	servers: [
		{ url: 'https://cbziucvnqf.execute-api.ap-south-1.amazonaws.com/' },
		{ url: 'http://locahost:3000/' },
	],
	tags: [{ name: 'User' }],

	models: [
		{
			name: 'ErrorResponse',
			contentType: 'application/json',
			schema: {
				properties: {
					error: {
						type: 'string',
					},
					data: {
						type: 'null',
					},
				},
			},
		},
		{
			name: 'GetUsersResponse',
			contentType: 'application/json',
			schema: {
				properties: {
					error: {
						type: 'null',
					},
					data: {
						type: 'object',
						properties: {
							docs: {
								type: 'array',
								items: userSchema,
							},
							lastKey: {
								type: 'string',
							},
						},
					},
				},
			},
		},
		{
			name: 'GetUserResponse',
			contentType: 'application/json',
			schema: {
				properties: {
					error: {
						type: 'null',
					},
					data: userSchema,
				},
			},
		},
	],
};
