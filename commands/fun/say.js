/* eslint-disable no-unused-vars */
const Command = require('../../base/command');

class Say extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			usage: (language) => language.get('FUN').SAY.USAGE,
			description: (language) => language.get('FUN').SAY.DESCRIPTION,
			enabled: true,
			requireArgs: true,
			aliases: ['echo'],
			userLevel: [],
			cooldown: 3000,
		});
	}

	async run(client, channel, tags, message, args, self, lang) {
		const msg = args.join(' ');
		return client.action (channel, lang.get('FUN').SAY.MESSAGE(msg));
	}
}

module.exports = Say;