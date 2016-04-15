"use strict";

let Summary = {};

module.exports = Summary;

const Next = require('./skills');

const Utils = require('../utils');

Summary.ask = function (r, c, m, d, b) {
	if(m.summary) {
		c.ask(Utils.response('How would you describe yourself?', 'summary'),
			function (r, c) {

				let sLength = r.text.trim()
					.replace(/\s+/gi, ' ')
					.split(' ')
					.length;

				if(sLength < 140) {
					c.say(Utils.response('A great summary should be longer than a tweet :sweat_smile:, can you elaborate more?'), 'summary');
					c.silentRepeat();
				} else {
					m.summary = r.text;
					c.say(Utils.response('Very interesting :blush:'), 'summary')
					Next.ask(r, c, m, d, b);
					c.next();
				}
			});
	} else {
		Next.ask(r, c, m, d, b);
		c.next();
	}
}
