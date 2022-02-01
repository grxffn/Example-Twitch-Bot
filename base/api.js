const fetch = require('node-fetch');

class API {
	constructor(options) {
		this.client = options.client;
	}

	async getStream(id) {
		return new Promise((resolve, reject) => {
			fetch(`https://api.twitch.tv/helix/streams?user_id=${id}`, {
				headers: { 'Authorization': `Bearer ${this.client.config.ACCESS_TOKEN}`, 'Client-ID': `${this.client.config.CLIENT_ID}` },
			}).then(res => res.json()).then(result => {
				resolve(result);
			}).catch(reject);
		});
	}
}

module.exports = API;