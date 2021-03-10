# discord-client-wrapper

```sh
npm i discord-client-wrapper
```

```js
const { Client } = require("discord-client-wrapper");

const client = new Client("my.client.token");

(async() => {
	const response = await client.SendMessage("wassup", "channelId");
	console.log(response);
})();
```