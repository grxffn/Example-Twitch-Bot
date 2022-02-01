const Command = require('../../base/command');

class Reload extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			usage: (language) => language.get('DEVELOPER').RELOAD.USAGE,
			description: (language) => language.get('DEVELOPER').RELOAD.DESCRIPTION,
			enabled: true,
			requireArgs: true,
			aliases: ['rl'],
			userLevel: ['OWNER'],
			cooldown: 3000,
		});
	}

	async run(client, channel, tags, message, args, self, lang) {
		const command = args[0];
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if(!cmd) { return client.say(channel, lang.get('DEVELOPER').RELOAD.INVALID_COMMAND(tags)); }

		delete require.cache[cmd.config.location];
		client.unloadCommand(cmd.config.location, cmd.help.name).then(() => {
			client.loadCommand(cmd.config.location, cmd.help.name);
		});

		return client.say(channel, lang.get('DEVELOPER').RELOAD.MESSAGE(cmd.help.name));
	}
}

module.exports = Reload;