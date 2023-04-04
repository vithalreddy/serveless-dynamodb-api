import { APIGatewayProxyEvent } from 'aws-lambda';

import { User } from '../db';
import { HttpError, RecordBase64Util, Response } from '../lib/utils';

export class UserService {
	async getUserById(event: APIGatewayProxyEvent) {
		try {
			const id = Number(event.pathParameters.id);
			if (!id) throw new HttpError('Missing id', 404);

			const [user] = await User.query({ id }).limit(1).exec();
			if (!user) throw new HttpError('User not found', 404);

			return new Response(200, user).build();
		} catch (error) {
			return new Response(error.status || 500, null, error).build();
		}
	}

	async getUsers(event: APIGatewayProxyEvent) {
		try {
			const { lastKey, pageSize = 25 } = event.queryStringParameters || {};
			if (Number(pageSize) > 25)
				throw new HttpError('Invalid value for pageSize', 400);
			if (Number(pageSize) < 5)
				throw new HttpError('Invalid value for pageSize', 400);

			const query = User.query({ status: 1 });
			if (lastKey) query.startAt(RecordBase64Util.decode(lastKey));

			const res = await query
				.using('dateJoinedIdx')
				.sort('descending')
				.limit(Number(pageSize))
				.exec();

			const result = { docs: res, lastKey: null };
			if (res.lastKey) result.lastKey = RecordBase64Util.encode(res.lastKey);

			return new Response(200, result).build();
		} catch (error) {
			return new Response(error.status || 500, null, error).build();
		}
	}
}
