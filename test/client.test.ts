import "dotenv/config";

import { Client } from "@/index";

const config = {
	CLIENT_TOKEN: process.env.CLIENT_TOKEN as string,
	SERVER_ID: process.env.SERVER_ID as string,
	SERVER_NAME: process.env.SERVER_NAME as string,
	CHANNEL_ID: process.env.CHANNEL_ID as string
};

const client = new Client(config.CLIENT_TOKEN);

describe("client requests", () => {

	it("should fetch a server", async () => {
		const servers = await client.GetServers();
		const testServer = servers.filter(a => a.id == config.SERVER_ID)[0];
		expect(testServer.name).toEqual(config.SERVER_NAME);
	});

	it("should post a message", async () => {
		const message = await client.SendMessage("this is a test", config.CHANNEL_ID);
		expect(message.content).toEqual("this is a test");
	});
});