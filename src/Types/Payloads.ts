/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHeader {
	authorization: string
}

export interface IMessage {
	content: string,
	nonce: number,
	tts: boolean
}

interface IAuthor {
	id: string,
	username: string,
	avatar: string,
	discriminator: string,
	public_flags: number
}
export interface IMessageData {
	id: string,
	type: number,
	content: string,
	channel_id: string,
	author: IAuthor,
	attachments: Array<any>,
	embeds: Array<any>,
	mentions: Array<any>,
	mention_roles: Array<any>,
	pinned: boolean,
	mention_everyone: boolean,
	tts: boolean,
	timestamp: string,
	edited_timestamp: Date | number,
	flags: number,
	nonce: number,
	referenced_message: string | any
}

interface IGuildFeature {
	feature: string | number[]
}
export interface IGuild {
	features: IGuildFeature,
	icon: string,
	splash: any,
	banner: any,
	permissions_new: string,
	description: any,
	permissions: number,
	owner: boolean,
	name: string,
	id: string
}

export interface ICreateInvite {
	max_age: number,
	max_uses: number,
	temporary: boolean
}

interface IChannel {
	id: string,
	name: string,
	type: number
}
interface IInviter {
	id: string,
	username: string,
	avatar: string,
	discriminator: string,
	public_flags: number
}
export interface IInvite {
	code: string,
	guild: IGuild,
	channel: IChannel,
	inviter: IInviter,
	uses: number,
	max_uses: number,
	max_age: number,
	temporary: boolean,
	created_at: Date
}