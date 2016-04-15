"use strict";

let Skills = {};

module.exports = Skills;

const Next = require('./experiences');

const Utils = require('../utils');

const Consent = require('../consent');

function askSkillItem(r, c, m, d, b) {
	for(let s in d.skills) {
		if(d.skills.hasOwnProperty(s)) {
			c.ask(Utils.response(`What do you know about ${s}?`, 'skills'),
				function (r, c) {

					d.skills[s] = r.text.split(/\s*\,\s*/);

					c.next();
				});
		}
	}
	c.say(Utils.response('Very interesting :blush:!'), 'skills');
	Next.ask(r, c, m, d, b);
	c.next();
}

function askSkillCategory(r, c, m, d, b) {
	c.ask(Utils.response('How would you categorize your top 3 topics? (For example, `programming, chemistry, journalist`. Please separate them with comma :sweat_smile:)', 'skills'),
		function (r, c) {

			r.text.split(/\s*\,\s*/)
				.forEach((cat) => {
					d.skills[cat] = [];
				})

			askSkillItem(r, c, m, d, b);

			c.next();
		});
}

Skills.ask = function (r, c, m, d, b) {
	if(m.skills) {
		c.say(Utils.response('I think you forgot to list your skill set. :thinking_face:', 'skill'));
		Consent.ask(r, c, b, function (allowed) {
			if(allowed) {

				askSkillCategory(r, c, m, d, b);

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
