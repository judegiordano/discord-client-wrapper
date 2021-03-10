import axios, { AxiosResponse } from "axios";

import * as Constants from "../Types/Constants";
import { IMessage, IHeaders, IMessageData } from "../Types/Payloads";

export default class Rest {

	private static readonly baseUrl: string = Constants.Endpoints.discord;
	private static headers: IHeaders;

	constructor(token: string) {
		Rest.headers = { headers: { authorization: token } };
	}

	public static async Post(body: unknown, url?: string): Promise<AxiosResponse> {
		try {
			return await axios.post(`${Rest.baseUrl}/${url || ""}`, body, Rest.headers);
		} catch (error) {
			throw Error(error);
		}
	}

	public async SendMessage(message: string, channel: string): Promise<IMessageData> {
		try {
			const body: IMessage = { content: message, nonce: Date.now(), tts: false };
			const endpoint = `channels/${channel}/messages`;

			const response: AxiosResponse = await Rest.Post(body, endpoint);

			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}
}