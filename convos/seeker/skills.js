"use strict";

let Skills = {};

module.exports = Skills;

const Next = require('./experiences');

const Utils = require('../utils');

function askSkillItem(r, c, m, d, b) {
	c.ask(Utils.response('What\'re your skills?', 'skills'),
		function (r, c) {
			c.say(Utils.response('You said : ' + r.text));

			Next.ask(r, c, m, d, b);

			c.next();
		});
}

function askSkillCategory(r, c, m, d, b) {
	c.ask(Utils.response('What\'re your skills?', 'skills'),
		function (r, c) {
			c.say(Utils.response('You said : ' + r.text));

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
