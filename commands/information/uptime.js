/* eslint-disable no-unused-vars */
const Command = require('../../base/command'),
	moment = require('moment');
require('moment-duration-format');

class Uptime extends Command {
	constructor(client) {
		super(client, {
			name: 'uptime',
			usage: (language) => language.get('INFORMATION').UPTIME.USAGE,
			description: (language) => language.get('INFORMATION').UPTIME.DESCRIPTION,
			dirname: __dirname,
			enabled: true,
			requireArgs: false,
			aliases: [],
			userLevel: [],
			cooldown: 3000,
		});
	}

	async run(client, channel, tags, message, args, self, lang) {
		const stream = await client.api.getStream(tags['room-id']);
		if(stream.data.length === 0) { return client.say(channel, lang.get('INFORMATION').UPTIME.NOT_LIVE(tags)); }

		let results;
		stream.data.map(x => {
			results = { name: x.user_name, startedAt: x.started_at };
		});

		const streamUptime = moment.utc(moment.utc() - moment.utc(results.startedAt));
		const duration = moment.duration(streamUptime).format('Y [years] D [days], H [hours], m [minutes], s [seconds]');
		return client.say(channel, lang.get('INFORMATION').UPTIME.MESSAGE(tags, results.name, duration));
	}
}

module.exports = Uptime;