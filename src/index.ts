/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rest } from "./Services/Rest";
import { OutgoingHttpHeaders } from "node:http";

import * as Constants from "./Types/Constants";
import { IMessage, IMessageData, IGuild, ICreateInvite, IInvite, IResponse } from "./Types/Payloads";

/**
 * entry point for connecting to the discord client api
 *
 * @export
 * @class Client
 */
export class Client {

	private static readonly baseUrl: string = Constants.Endpoints.discord;
	private static headers: OutgoingHttpHeaders;

	/**
	 * used by constructor to connect
	 * @param {string} token
	 * @memberof Client
	 */
	constructor(token: string) {
		if (!token)
			throw new Error(Constants.Errors.token);
		Client.headers = { "authorization": token, "Content-Type": "application/json", };
	}

	/**
	 * Wrapper for axios post
	 * @static
	 * @param {unknown} body
	 * @param {string} [url]
	 * @return {*}  {Promise<any>}
	 * @memberof Client
	 */
	private static async Post(body: unknown, url?: string): Promise<IResponse> {
		try {
			return await Rest.Post(`${Client.baseUrl}/${url || ""}`, Client.headers, body);
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Wrapper for azios get
	 * @private
	 * @static
	 * @param {string} [url]
	 * @return {*}  {Promise<any>}
	 * @memberof Client
	 */
	private static async Get(url?: string): Promise<IResponse> {
		try {
			return await Rest.Get(`${Client.baseUrl}/${url || ""}`, Client.headers);
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Send a message to the provided channel id
	 * @param {string} message
	 * @param {number} string
	 * @return {*}  {Promise<IMessageData>}
	 * @memberof Client
	 */
	public async SendMessage(message: string, channel: string): Promise<IMessageData> {
		try {
			const body: IMessage = { content: message, nonce: Date.now(), tts: false };
			const endpoint = `channels/${channel}/messages`;
			const response = await Client.Post(body, endpoint);
			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Return an array of joined guilds
	 * @return {*}  {Promise<IMessageData>}
	 * @memberof Client
	 */
	public async GetServers(): Promise<IGuild[]> {
		try {
			const response = await Client.Get(Constants.Endpoints.guilds);
			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Return an array of messages
	 * @param {string} channel
	 * @param {number} limit defaults to 50 if ommited; limit of 100
	 * @return {*}  {Promise<IMessageData[]>}
	 * @memberof Client
	 */
	public async GetMessages(channel: string, limit?: number): Promise<IMessageData[]> {
		try {
			const endpoint = `channels/${channel}/messages${!limit ? "" : `?limit=${limit}`}`;
			const response = await Client.Get(endpoint);
			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Creates a guild invite
	 * @param {string} channel
	 * @return {*}  {Promise<IInvite>}
	 * @memberof Client
	 */
	public async CreateInvite(channel: string): Promise<IInvite> {
		try {
			const body: ICreateInvite = { max_age: 0, max_uses: 0, temporary: false };
			const endpoint = `channels/${channel}/invites`;
			const response = await Client.Post(body, endpoint);
			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}

	/**
	 * Join a server from an invite code
	 * @param {string} inviteCode
	 * @return {*}  {Promise<IInvite>}
	 * @memberof Client
	 */
	public async JoinServer(inviteCode: string): Promise<IInvite> {
		try {
			const endpoint = `${Constants.Endpoints.invite}/${inviteCode}`;
			const response = await Client.Post({}, endpoint);
			return response.data;
		} catch (error) {
			throw Error(error);
		}
	}
}
