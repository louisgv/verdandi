"use strict";

let Education = {};

module.exports = Education;

const Utils = require('../utils');

const Consent = require('../consent');

function askSchool(r, c, m, d, b) {
	c.ask(Utils.response('Where did you go to school?', 'edu'),
		function (r, c) {

			c.say(Utils.response('You said : ' + r.text));

			c.next();
		});
}

Education.ask = function (r, c, m, d, b) {
	if(m.education) {

		c.say(Utils.response('You might want to list your education... :thinking_face:', 'exp'));

		Consent.ask(r, c, b, function (allowed) {
			if(allowed) {

				askSchool(r, c, m, d, b);

			} else {
				Next.ask(r, c, m, d, b);

				c.next();
			}
		})
	}
}
