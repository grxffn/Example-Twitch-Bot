const { getUserLevel } = require('../helpers/functions');
/* eslint-disable no-unused-vars */
const commandCooldown = {};

module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(channel, tags, message, self) {
		const client = this.client;
		if(self) return;

		// Language
		const language = new (require(`../languages/${client.config.DEFAULT_LANGUAGE}.js`));

		// Prefix
		const prefix = client.functions.getPrefix(client, message);
		if(!prefix) { return; }

		// Command Handler
		const args = message.slice((typeof prefix === 'string' ? prefix.length : 0)).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		const command = client.commands.has(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd));

		if(command) {
			// Command Enabled Check
			if(!command.config.enabled) {
				return client.say(channel, language.get('COMMANDS').DISABLED(tags));
			}

			// User Level Check
			const userLevel = getUserLevel(client, channel, tags);
			if(!userLevel.includes['OWNER']) {
				const neededLevels = [];
				if(command.config.userLevel.forEach((level) => {
					if(!userLevel.includes(level)) {
						neededLevels.push(level);
					}
				}));

				if(neededLevels.length > 0) {
					return client.say(channel, `You need the following levels for this command: ${neededLevels.map((l) => `${l}`).join(', ')}`);
				}
			}

			// Argument Check
			if(command.config.requireArgs && args.length < 1) {
				return client.say(channel, language.get('COMMANDS').USAGE(tags, `${client.config.PREFIX}${command.help.usage(language)}`));
			}

			// Cooldown Check
			let userCooldown = commandCooldown[tags['user-id']];
			if(!userCooldown) {
				commandCooldown[tags['user-id']] = {};
				userCooldown = commandCooldown[tags['user-id']];
			}

			const time = userCooldown[command.help.name] || 0;
			if(time && (time > Date.now())) {
				return client.say(channel, language.get('CHECKS').COOLDOWN(Math.ceil((time - Date.now()) / 1000)));
			}
			commandCooldown[tags['user-id']][command.help.name] = Date.now() + command.config.cooldown;

			// Run Command
			try {
				command.run(client, channel, tags, message, args, self, language);
				client.logger.log(`${channel} > ${tags.username} used command ${command.help.name}`, 'cmd');
			}
			catch (error) {
				client.logger.log(error, 'error');
				return client.say(channel, language.get('COMMANDS').ERROR(tags));
			}
		}
	}
};