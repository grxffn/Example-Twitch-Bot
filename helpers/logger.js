const moment = require('moment');
require('../helpers/strings');

module.exports = class Logger {
	static log(content, type = 'log') {
		const timestamp = `${moment().format('MM/DD/YY HH:mm:ss')} |`;
		switch(type) {
		case 'log':
			return console.log(`${timestamp} ${type.upper()} | ${content}`);
		case 'warn':
			return console.log(`${timestamp} ${type.upper()} | ${content}`);
		case 'error':
			return console.log(`${timestamp} ${type.upper()} | ${content}`);
		case 'cmd':
			return console.log(`${timestamp} CMD | ${content}`);
		case 'ready':
			return console.log(`${timestamp} ${type.upper()} | ${content}`);
		case 'load':
			return console.log(`${timestamp} ${type.upper()} | ${content}`);
		case 'setup':
			return console.log(`${timestamp} ${type.upper()} | ${content}`);
		default:
			throw new TypeError('Logger types must be [log, warn, error, cmd, ready, load, setup]');
		}
	}
};