/* eslint-disable no-unused-vars */
const Command = require('../../base/command');

class Clear extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			usage: (language) => language.get('MODERATION').CLEAR.USAGE,
			description: (language) => language.get('MODERATION').CLEAR.DESCRIPTION,
			dirname: __dirname,
			enabled: true,
			requireArgs: false,
			aliases: ['clearchat', 'purge', 'prune', 'clean', 'delete'],
			userLevel: ['MODERATOR'],
			cooldown: 3000,
		});
	}

	async run(client, channel, tags, message, args, self, lang) {
		const isMod = client.isMod(channel, client.getUsername());
		if(!isMod) { return client.say(channel, lang.get('CHECKS').NOT_MOD(tags)); }

		client.clear(channel).catch(() => client.say(channel, lang.get('MODERATION').CLEAR.CLEAR_ERROR));
		return client.say(channel, lang.get('MODERATION').CLEAR.MESSAGE(tags));
	}
}

module.exports = Clear;