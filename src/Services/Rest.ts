/* eslint-disable @typescript-eslint/no-explicit-any */
import https from "https";
import { ClientRequest, IncomingMessage, OutgoingHttpHeaders, RequestOptions } from "node:http";

import { Method } from "../Types/Constants";
import { IResponse } from "../Types/Payloads";

export class Rest {

	public static async Post(url: string, headers?: OutgoingHttpHeaders, body?: unknown): Promise<IResponse> {
		try {
			const options: RequestOptions = {
				method: Method.post,
				headers: headers
			};
			let data: any = "";

			return new Promise((resolve, reject) => {

				const request: ClientRequest = https.request(url, options, (response: IncomingMessage): void => {
					response.on("data", (chunk): void => {
						data += chunk;
					});
					response.on("end", (): void => {
						const payload: IResponse = {
							ok: true,
							statusCode: response.statusCode,
							statusMessage: response.statusMessage,
							headers: response.rawHeaders,
							data: JSON.parse(data)
						};
						return resolve(payload);
					});
				});

				request.on("error", (error: Error): void => {
					const payload: IResponse = {
						ok: false,
						statusCode: 500,
						statusMessage: error.message,
						data: error
					};
					return reject(payload);
				});

				if (body) request.write(JSON.stringify(body));
				request.end();
			});
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Get(url: string, headers?: OutgoingHttpHeaders): Promise<IResponse> {
		try {
			const options: RequestOptions = {
				method: Method.get,
				headers: headers ?? {}
			};
			let data: any = "";

			return new Promise((resolve, reject) => {

				const request: ClientRequest = https.request(url, options, (response: IncomingMessage): void => {
					response.on("data", (chunk: any): void => {
						data += chunk;
					});
					response.on("end", (): void => {
						const payload: IResponse = {
							ok: true,
							statusCode: response.statusCode,
							statusMessage: response.statusMessage,
							headers: response.rawHeaders,
							data: JSON.parse(data)
						};
						return resolve(payload);
					});
				});

				request.on("error", (error: Error): void => {
					const payload: IResponse = {
						ok: false,
						statusCode: 500,
						statusMessage: error.message,
						data: error
					};
					return reject(payload);
				});

				request.end();
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}