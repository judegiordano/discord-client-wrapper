import axios, { AxiosResponse } from "axios";

import * as Constants from "./Types/Constants";
import { IMessage, IHeaders, IMessageData } from "./Types/Payloads";

/**
 * entry point for connecting to the discord client api
 *
 * @export
 * @class Client
 */
export class Client {

	private static readonly baseUrl: string = Constants.Endpoints.discord;
	private static headers: IHeaders;

	/**
	 * used by constructor to connect
	 * @param {string} token
	 * @memberof Client
	 */
	constructor(token: string) {
		if (!token)
			throw new Error(Constants.Errors.token);
		Client.headers = { headers: { authorization: token } };
	}

	/**
	 * Wrapper for axios post
	 * @static
	 * @param {unknown} body
	 * @param {string} [url]
	 * @return {*}  {Promise<AxiosResponse>}
	 * @memberof Client
	 */
	private static async Post(body: unknown, url?: string): Promise<AxiosResponse> {
		try {
			return await axios.post(`${Client.baseUrl}/${url || ""}`, body, Client.headers);
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Send a message to the provided channel id
	 * @param {string} message
	 * @param {string} channel
	 * @return {*}  {Promise<IMessageData>}
	 * @memberof Client
	 */
	public async SendMessage(message: string, channel: string): Promise<IMessageData> {
		try {
			const body: IMessage = { content: message, nonce: Date.now(), tts: false };
			const endpoint = `channels/${channel}/messages`;

			const response: AxiosResponse = await Client.Post(body, endpoint);

			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}
}

export { IMessage, IMessageData, IHeaders };