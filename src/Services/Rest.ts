/* eslint-disable @typescript-eslint/no-explicit-any */
import https from "https";
import { ClientRequest, IncomingMessage, OutgoingHttpHeaders, RequestOptions } from "node:http";

import { Method } from "../Types/Constants";

export class Rest {

	public static async Post(url: string, headers?: OutgoingHttpHeaders, body?: unknown): Promise<any> {
		try {
			const options: RequestOptions = {
				method: Method.post,
				headers: headers
			};
			return new Promise((resolve, reject) => {

				const request: ClientRequest = https.request(url, options, (response: IncomingMessage): void => {
					let data = "";
					response.on("data", (chunk): void => {
						data += chunk;
					});
					response.on("end", (): void => {
						return resolve(data);
					});
				});

				request.on("error", (error: Error): void => {
					return reject(error);
				});

				request.write(JSON.stringify(body));
				request.end();
			});
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Get(url: string, headers: OutgoingHttpHeaders): Promise<any> {
		try {
			const options: RequestOptions = {
				method: Method.get,
				headers: headers
			};
			return new Promise((resolve, reject) => {

				const request: ClientRequest = https.request(url, options, (response: IncomingMessage): void => {
					let data = "";
					response.on("data", (chunk): void => {
						data += chunk;
					});
					response.on("end", (): void => {
						return resolve(data);
					});
				});

				request.on("error", (error: Error): void => {
					return reject(error);
				});

				request.end();
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}