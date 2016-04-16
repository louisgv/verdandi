"use strict";

let Skills = {};

module.exports = Skills;

const Utils = require('../utils');

function askSkillItem(r, c, req) {
	c.ask(Utils.response('What skill are you looking for in the candidates? :thinking_face: (For example, `c++, calculus, wordpress`. Please separate them with comma :sweat_smile:)', 'skills'),
		function (r, c) {
			r.text.split(/\s*\,\s*/)
				.forEach((skill) => {
					req.skills.push(skill);
				})

			c.next();
		});
}

Skills.ask = function (r, c, req) {
	askSkillItem(r, c, req);

	c.next();
}
