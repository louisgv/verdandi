"use strict";

let Summary = {};

module.exports = Summary;

const Next = require('./skills');

const Utils = require('../utils');

const Consent = require('../consent');

function askDescription(r, c, m, d, b) {
	c.ask(Utils.response('How would you describe yourself?', 'summary'),
		function (r, c) {
			if(r.text.length < 140) {
				c.say(Utils.response('A great summary should be longer than a tweet :sweat_smile: Can you elaborate more?'), 'summary');
				c.repeat();
				c.next();
			} else {
				d.summary = r.text;
				c.say(Utils.response('Very interesting :blush:'), 'summary')
				Next.ask(r, c, m, d, b);
				c.next();
			}
		});
}

Summary.ask = function (r, c, m, d, b) {
	if(m.summary) {
		c.say(Utils.response('I could not find the summary in your profile. :thinking_face:', 'summary'));
		Consent.ask(r, c, b, function (allowed) {
			if(allowed) {
				askDescription(r, c, m, d, b);
			} else {
				Next.ask(r, c, m, d, b);
				c.next();
			}
		})
	} else {
		Next.ask(r, c, m, d, b);
		c.next();
	}
}
