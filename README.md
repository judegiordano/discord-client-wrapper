# discord-client-wrapper

```sh
npm i discord-client-wrapper
```

```js
const { Client } = require("discord-client-wrapper");

const client = new Client("my.client.token");

(async () => {
	await client.GetServers();
	await client.SendMessage("wassup", "channelId");
	await client.GetMessages("channelId");
	await client.CreateInvite("channelId");
	await client.JoinServer("inviteCode");
})();
```