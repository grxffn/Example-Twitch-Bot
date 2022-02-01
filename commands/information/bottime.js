/* eslint-disable no-unused-vars */
const Command = require('../../base/command'),
	moment = require('moment'),
	{ botUptime } = require('../../helpers/functions');
require('moment-duration-format');

class BotTime extends Command {
	constructor(client) {
		super(client, {
			name: 'bottime',
			usage: (language) => language.get('INFORMATION').BOTTIME.USAGE,
			description: (language) => language.get('INFORMATION').BOTTIME.DESCRIPTION,
			enabled: true,
			requireArgs: false,
			aliases: [],
			userLevel: [],
			cooldown: 3000,
		});
	}

	async run(client, channel, tags, message, args, self, lang) {
		const duration = moment.duration(botUptime(client)).format('Y [years] D [days], H [hours], m [minutes], s [seconds]');
		return client.say(channel, lang.get('INFORMATION').BOTTIME.MESSAGE(tags, duration));
	}
}

module.exports = BotTime;