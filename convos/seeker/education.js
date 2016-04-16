"use strict";

let Education = {};

module.exports = Education;

const Utils = require('../utils');

const Consent = require('../consent');

const SummaryMessage = [
  'Tell me about your most recent business :blush:',
  'What did you do before that? :smirk:'
]

let questionQueue = [];

function askSchool(r, c, m, d, b) {
	c.ask(Utils.response('Where do you go to school?', 'edu'),
		function (r, c) {

			d.education.push({
				school: r.text
			})

			questionQueue = [askSummary, askTime, askLocation];

			Utils.shuffleArray(questionQueue);

			questionQueue.push(askDegree);

			questionQueue.shift()(r, c, m, d, b);

			c.next();
		});
}

function askSummary(r, c, m, d, b) {
	let school = d.education[d.education.length - 1].school;
	c.ask(Utils.response(`How was it at ${school}? What did you do?`, 'edu'),
		function (r, c) {

			d.education[d.education.length - 1].summary = r.text;

			questionQueue.shift()(r, c, m, d, b);

			c.next();
		});
}

function askTime(r, c, m, d, b) {
	let school = d.education[d.education.length - 1].school;
	c.ask(Utils.response(`When did you attend ${school}?`, 'edu'),
		function (r, c) {

			d.education[d.education.length - 1].time = r.text;

			questionQueue.shift()(r, c, m, d, b);

			c.next();
		});
}

function askLocation(r, c, m, d, b) {
	let school = d.education[d.education.length - 1].school;
	c.ask(Utils.response(`Where was ${school}?`, 'edu'),
		function (r, c) {

			d.education[d.education.length - 1].location = r.text;

			questionQueue.shift()(r, c, m, d, b);

			c.next();
		});
}

function askDegree(r, c, m, d, b) {
	let school = d.education[d.education.length - 1].school;
	c.ask(Utils.response(`What degree did you earn at ${school}?`, 'edu'),
		function (r, c) {

			d.education[d.education.length - 1].degree = r.text;

			askGrade(r, c, m, d, b);

			c.next();
		});
}

function askGrade(r, c, m, d, b) {
	c.ask(Utils.response('What was your GPA?', 'edu'),
		function (r, c) {
			d.education[d.education.length - 1].gpa = parseFloat(r.text);

			askRepeat(r, c, m, d, b);

			c.next();
		});
}

function askRepeat(r, c, m, d, b) {
	c.ask(Utils.response('Did you attend anywhere else? :thinking_face:', 'edu'), [
		{
			pattern: b.utterances.no,
			callback: (r, c) => {

				c.next();
			}
  	}, {
			pattern: b.utterances.yes,
			callback: (r, c) => {
				askSchool(r, c, m, d, b)
				c.next();
			}
    }, {
			default: true,
			callback: (r, c) => {
				c.repeat();
				c.next();
			}
    }
  ]);
}

Education.ask = function (r, c, m, d, b) {
	if(m.education) {

		c.say(Utils.response('You might want to list your education... :thinking_face:', 'exp'));

		Consent.ask(r, c, b, function (allowed) {
			if(allowed) {

				askSchool(r, c, m, d, b);

			} else {

				c.next();
			}
		})
	}
}
