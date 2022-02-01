# Example Twitch Bot
This is a example Twitch bot which uses [tmi.js](https://github.com/tmijs/tmi.js/blob/master/README.md).

## Installation
Once you clone this repository, use [npm](https://www.npmjs.com/) to install dependencies.
```sh
$ npm install
```

Before running this example, you will need to set configuration fields by creating `config.js`.
1. CLIENT_ID - The Client ID of your registered application or account.
2. ACCESS_TOKEN - The access token with the proper scopes.
3. and don't forget to set `<yourchannelname>` to your twitch channel name in index.js

```sh
$ node index.js OR npm start
```

## Features

Example offers:
*   🛎️ Event Handler
*   🔧 Command Handler
*   ⌛ Cooldown System
*   🔒 Permission level system
*   📖 Support for translations
*   📝 Console logger

## Disclaimer

I do not provide coding assistance. If you don't know Javascript, see below:

* Learn [Javascript](https://www.codecademy.com/learn/introduction-to-javascript) with Codecademy.
* Get familiar with [tmi.js](https://tmijs.com/).
* Generate tokens for use with the Twitch API using [Twitch Token Generator](https://twitchtokengenerator.com/).

## License

Example-Twitch-Bot is licensed under the MIT license. See the file `LICENSE` for more information.
