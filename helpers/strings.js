module.exports = {
	capitalize: String.prototype.capitalize = function() {
		return this.slice(0, 1).toUpperCase() + this.slice(1).toLowerCase();
	},

	number: Number.prototype.formatNum = function() {
		let str = this;
		str = str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,');
		return str;
	},

	acronym: String.prototype.acronym = function() {
		let str = this;
		str = str.replace(/\w+/g, name => name[0]).replace(/\s/g, '');
		return str;
	},

	lower: String.prototype.lower = function() {
		return this.toLowerCase();
	},

	upper: String.prototype.upper = function() {
		return this.toUpperCase();
	},
};