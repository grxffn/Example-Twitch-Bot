const util = require('util'),
	fs = require('fs'),
	config = require('./config'),
	readdir = util.promisify(fs.readdir);

const ExampleBot = require('./base/examplebot'),
	client = new ExampleBot({
		connection: { reconnect: true },
		identity: {
			username: config.BOT_USERNAME,
			password: `oauth:${config.ACCESS_TOKEN}`,
		},
		channels: [ 'griffin2k_' ],
	});

const init = async () => {

	// Search and load commands
	const directories = await readdir('./commands/');
	client.logger.log(`Loading a total of ${directories.length} categories.`, 'log');
	directories.forEach(async (dir) => {
		const commands = await readdir('./commands/' + dir + '/');
		commands.filter((cmd) => cmd.split('.').pop() === 'js').forEach((cmd) => {
			const response = client.loadCommand('./commands/' + dir, cmd);
			if(response) { client.logger.log(response, 'error'); }
		});
	});

	// Search and load events
	const evtFiles = await readdir('./events');
	client.logger.log(`Loading a total of ${evtFiles.length} events.`, 'log');
	evtFiles.forEach((file) => {
		const eventName = file.split('.')[0];
		client.logger.log(`Loading Event: ${eventName}`, 'load');
		const event = new (require(`./events/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

	client.connect();
};

init();

process.on('unhandledRejection', (error) => {
	console.error(error);
});