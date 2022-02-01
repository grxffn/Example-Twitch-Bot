const { Client } = require('tmi.js'),
	{ Collection } = require('@discordjs/collection'),
	path = require('path'),
	API = require('./api');

class ExampleBot extends Client {
	constructor(options) {
		super(options);
		this.readyAt = null;
		this.config = require('../config');
		this.logger = require('../helpers/logger');
		this.strings = require('../helpers/strings');
		this.functions = require('../helpers/functions');
		this.commands = new Collection();
		this.aliases = new Collection();
		this.api = new API({ client: this });
	}

	loadCommand(commandPath, commandName) {
		try {
			const props = new (require(`.${commandPath}${path.sep}${commandName}`));
			this.logger.log(`Loading Command: ${props.help.name}`, 'load');
			props.config.location = commandPath;
			if(props.init) {
				props.init(this);
			}
			this.commands.set(props.help.name, props);
			props.help.aliases.forEach((alias) => {
				this.aliases.set(alias, props.help.name);
			});
			return false;
		}
		catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	}

	async unloadCommand(commandPath, commandName) {
		let command;
		if(this.commands.has(commandName)) { command = this.commands.get(commandName); }
		else if(this.aliases.has(commandName)) { command = this.commands.get(this.aliases.get(commandName)); }
		if(!command) { return `The command \`${commandName}\` doesn't seem to exist or have an alias. Try again.`; }
		if(command.shutdown) { await command.shutdown(this); }
		this.logger.log(`Unloading Command: ${command.help.name}`, 'log');
		delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
		return false;
	}
}

module.exports = ExampleBot;