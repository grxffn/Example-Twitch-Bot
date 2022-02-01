/* eslint-disable no-shadow */
const { readFileSync, readdir } = require('fs');
const languages = module.exports.languages = new Map();
const path = require('path');

class Language {
	static load() {
		const getPath = path.join(__dirname, '../languages');
		readdir(getPath, (err, files) => {
			if(err) console.log(err);
			files.forEach(file => {
				languages.set(file.split('.')[0], JSON.parse(readFileSync(`${getPath}${file}`, 'utf8')));
			});
		});
	}

	static get(path, language = 'english') {
		function getKey(object, Language) {
			if(object.length > 0) {
				language = Language[object[0]];
				if(!language) return `Failed to get key: ${path}`;
				return getKey(object.slice(1), language);
			}
			return language;
		}
		return getKey(path.split('.'), languages.get(language));
	}
}

module.exports = Language;