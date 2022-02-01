module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(channel, username, streakMonths, recipient, methods, tags) {
		const client = this.client;
		const lang = new (require(`../languages/${client.config.DEFAULT_LANGUAGE}.js`));
		const plan = methods.plan.replace('Prime', 'Twitch Prime').replace('1000', 'Tier 1').replace('2000', 'Tier 2').replace('3000', 'Tier 3');

		return client.say(channel, lang.get('EVENTS').SUBGIFT.MESSAGE(channel, username, streakMonths, recipient, plan, tags));
	}
};