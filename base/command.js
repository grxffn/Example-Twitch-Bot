module.exports = class Command {
	constructor(client, {
		name = '',
		usage = (language) => language.get('COMMANDS').INVALID_USAGE,
		description = (language) => language.get('COMMANDS').INVALID_DESCRIPTION,
		enabled = true,
		requireArgs = false,
		aliases = new Array(),
		userLevel = new Array(),
		cooldown = 3000,
	}) {
		this.client = client;
		this.help = { name, usage, description, aliases };
		this.config = { enabled, requireArgs, userLevel, cooldown };
	}
};