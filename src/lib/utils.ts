/* eslint-disable @typescript-eslint/naming-convention,max-classes-per-file */
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export class Response {
	#status: number;
	#body: string;

	constructor(status = 200, data = {}, error = null) {
		this.#status = status;
		const errorObj = error ? error.message || 'Something went wrong.' : error;
		this.#body = JSON.stringify({ data, error: errorObj });
	}

	build() {
		return {
			statusCode: this.#status,
			body: this.#body,
		} satisfies APIGatewayProxyResult as APIGatewayProxyResult;
	}
}

export type HTTP_METHOD = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type HANDLER_FN = (
	event: APIGatewayProxyEvent,
) => Promise<APIGatewayProxyResult>;

export class Handler {
	#fn: HANDLER_FN;
	#path: string;
	#method: HTTP_METHOD;
	#handlerPath: string;
	#docs: Record<string, unknown>;

	constructor(
		fn: HANDLER_FN,
		method: HTTP_METHOD,
		path: string,
		handlerPath,
		docs,
	) {
		this.#fn = fn;
		this.#path = path;
		this.#method = method;
		this.#handlerPath = handlerPath;
		this.#docs = docs;
	}

	config() {
		return {
			handler: this.#handlerPath,
			events: [
				{
					httpApi: {
						method: this.#method,
						path: this.#path,
						documentation: this.#docs,
					},
				},
			],
		};
	}

	handler() {
		return middy(this.#fn).use(middyJsonBodyParser());
	}

	build() {
		return { config: this.config(), handler: this.handler() };
	}
}

export class HttpError extends Error {
	status: number;
	constructor(message: string, status = 400) {
		super(message);
		this.status = status;
	}
}
