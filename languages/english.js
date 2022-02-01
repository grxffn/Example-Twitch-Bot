/* eslint-disable no-unused-vars */
const lang = 'english';

module.exports = class {
	constructor() {
		this.language = {
			CHECKS: {
				COOLDOWN: (seconds) => `Please wait ${seconds} second(s)!`,
				NOT_MOD: (tags) => `Sorry ${tags.username}, I don't have permission to use that command.`,
			},
			COMMANDS: {
				USAGE: (tags, args) => `Did you mean ${args}?`,
				ERROR: (tags, args) => `${tags.username}, an error occured while trying to run that command.`,
				DISABLED: (tags) => `${tags.username}, that command is disabled.`,
				INVALID_ALIASES: 'No aliases found.',
				INVALID_USAGE: 'No usage set.',
				INVALID_DESCRIPTION: 'No description set.',
				INVALID_EXAMPLES: 'No examples found.',
			},
			DEVELOPER: {
				RELOAD: {
					DESCRIPTION: 'Reloads a command.',
					USAGE: 'reload <command>',
					EXAMPLES: ['reload say'],
					INVALID_COMMAND: (tags) => `${tags.username}, that command does not exist.`,
					MESSAGE: (command) => `${command} has been reloaded.`,
				},
			},
			FUN: {
				SAY: {
					DESCRIPTION: 'Says whatever you wish in chat.',
					USAGE: 'say <message>',
					EXAMPLES: ['say hello everyone!'],
					MESSAGE: (msg) => `says: ${msg}`,
				},
			},
			INFORMATION: {
				BOTTIME: {
					DESCRIPTION: 'Shows ExampleBot\'s uptime.',
					USAGE: 'bottime',
					EXAMPLES: [],
					MESSAGE: (tags, duration) => `${tags.username}, uptime: ${duration}`,
				},
				UPTIME: {
					DESCRIPTION: 'Shows the stream uptime.',
					USAGE: 'uptime',
					EXAMPLES: [],
					NOT_LIVE: (tags) => `${tags.username}, they are offline.`,
					MESSAGE: (tags, streamer, duration) => `${tags.username}, ${streamer} has been live for ${duration}.`,
				},
			},
			MODERATION: {
				CLEAR: {
					DESCRIPTION: 'Clears the chat.',
					USAGE: 'clear',
					EXAMPLES: ['clean', 'purge', 'delete'],
					CLEAR_ERROR: 'Whoops, an error occurred while trying to clear chat.',
					MESSAGE: (tags) => `${tags.username} cleared the chat.`,
				},
			},
			EVENTS: {
				SUBSCRIPTION: {
					MESSAGE: (channel, username, plan, message, tags) => `${username} subscribed with a ${plan} subscription!`,
				},
				SUBGIFT: {
					MESSAGE: (channel, username, streakMonths, recipient, plan, tags) => `${username} gifted ${recipient} a ${plan} subscription!`,
				},
			},
		};
	}

	get(term, ...args) {
		const value = this.language[term];
		switch(typeof value) {
		case 'function': return value(...args);
		default: return value;
		}
	}

	getLang() {
		return lang;
	}
};