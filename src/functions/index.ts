import { Handler } from '../lib/utils';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const { handler: getUsers, config: getUsersConfig } = new Handler(
	userService.getUsers,
	'get',
	'/v1/users',
	'src/functions/index.getUsers',
	{
		summary: 'Get all users',
		description: 'list all users ordered by joining date descending',
		tags: ['User'],
		queryParams: [
			{
				name: 'lastKey',
				description:
					'used to paginated items based on joining date. pass lastKey received in last request',
				schema: {
					type: 'string',
				},
			},
			{
				name: 'pageSize',
				description: 'docs per request',
				schema: {
					type: 'number',
					minimum: 5,
					maximum: 25,
				},
			},
		],
		methodResponses: [
			{
				statusCode: 200,
				responseBody: {
					description: 'list of users',
				},
				responseModels: { 'application/json': 'GetUsersResponse' },
			},
			{
				statusCode: 400,
				responseBody: {
					description: 'validation error',
				},
				responseModels: { 'application/json': 'ErrorResponse' },
			},
			{
				statusCode: 500,
				responseBody: {
					description: 'something went wrong',
				},
				responseModels: { 'application/json': 'ErrorResponse' },
			},
		],
	},
).build();

export const { handler: getUserById, config: getUserByIdConfig } = new Handler(
	userService.getUserById,
	'get',
	'/v1/users/{id}',
	'src/functions/index.getUserById',
	{
		summary: 'Get a user by id',
		pathParams: [
			{
				name: 'id',
				description: "user's id",
				schema: {
					type: 'number',
				},
			},
		],
		tags: ['User'],
		methodResponses: [
			{
				statusCode: 200,
				responseBody: {
					description: 'list of users',
				},
				responseModels: { 'application/json': 'GetUserResponse' },
			},
			{
				statusCode: 400,
				responseBody: {
					description: 'validation error',
				},
				responseModels: { 'application/json': 'ErrorResponse' },
			},
			{
				statusCode: 404,
				responseBody: {
					description: 'Item not found',
				},
				responseModels: { 'application/json': 'ErrorResponse' },
			},
			{
				statusCode: 500,
				responseBody: {
					description: 'something went wrong',
				},
				responseModels: { 'application/json': 'ErrorResponse' },
			},
		],
	},
).build();
