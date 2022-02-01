module.exports = {
	botUptime: function(client) {
		return client.readyAt ? Date.now() - client.readyAt : null;
	},

	getPrefix: function(client, message) {
		const prefixes = [
			`@${client.getUsername()}`,
			client.getUsername().toLowerCase(),
			client.config.PREFIX,
		];
		let prefix = null;
		prefixes.forEach((p) => {
			if(message.startsWith(p) || message.toLowerCase().startsWith(p)) {
				prefix = p;
			}
		});
		return prefix;
	},

	getUserLevel: function(client, channel, userstate) {
		const userLevels = { 0: 'EVERYONE', 1: 'SUBSCRIBER', 2: 'MODERATOR', 3: 'BROADCASTER', 4: 'OWNER' };
		const userLevel = ['EVERYONE'];

		if(userstate.subscriber) { userLevel.push(userLevels[1]); }
		if(userstate.mod) { userLevel.push(userLevels[2]); }
		if(channel === `#${userstate.username}`) { userLevel.push(userLevels[2], userLevels[3]); }
		if(userstate.username == client.config.BOT_OWNER) { userLevel.push(userLevels[4]); }
		return userLevel;
	},
};