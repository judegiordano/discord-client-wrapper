/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHeader {
	authorization: string
}

export interface IHeaders {
	headers: IHeader
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
