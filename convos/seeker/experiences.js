"use strict";

let Experiences = {};

module.exports = Experiences;

const Next = require('./education');

const Utils = require('../utils');

const Consent = require('../consent');

const SummaryMessage = [
  'Tell me about your most recent business :blush:',
  'What did you do before that? :smirk:'
]

function shuffleArray(array) {
	for(let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

let questionQueue = [];

function askSummary(r, c, m, d, b) {

	let question = d.experiences.length == 0 ? SummaryMessage[0] : SummaryMessage[1];

	c.ask(Utils.response(question, 'exp'),
		function (r, c) {

			d.experiences.push({
				summary: r.text
			});

			// askLocation(r, c, m, d, b);

      questionQueue = [askLocation, askTime, askRole, askCompany];

      shuffleArray(questionQueue);

      questionQueue.push(askRepeat);

      questionQueue.shift()(r, c, m, d, b)

			c.next();
		});
}

function askLocation(r, c, m, d, b) {
	c.ask(Utils.response('Where was it? :sweat_smile:', 'exp'),
		function (r, c) {

			d.experiences[d.experiences.length - 1].location = r.text;

			questionQueue.shift()(r, c, m, d, b)

			c.next();
		});
}

function askTime(r, c, m, d, b) {
	c.ask(Utils.response('And when did that happen? :thinking_face:', 'exp'),
		function (r, c) {
			d.experiences[d.experiences.length - 1].time = r.text;

			questionQueue.shift()(r, c, m, d, b)

			c.next();
		});
}

function askRole(r, c, m, d, b) {
	c.ask(Utils.response('I didn\'t get what your role was :sweat_smile: What was it again?', 'exp'),
		function (r, c) {
			d.experiences[d.experiences.length - 1].role = r.text;

			questionQueue.shift()(r, c, m, d, b)

      c.next();
		});
}

function askCompany(r, c, m, d, b) {
	c.ask(Utils.response('And the name of the company was... ?', 'exp'),
		function (r, c) {
			d.experiences[d.experiences.length - 1].company = r.text;

			questionQueue.shift()(r, c, m, d, b)

			c.next();
		});
}

function askRepeat(r, c, m, d, b) {
	c.say(Utils.response("Sounds very interesting :innocent:", 'exp'));
	c.ask(Utils.response('Would you like to add another endeavor to the list? :blush:', 'exp'), [
		{
			pattern: b.utterances.no,
			callback: (r, c) => {
				Next.ask(r, c, m, d, b);
				c.next();
			}
  	}, {
			pattern: b.utterances.yes,
			callback: (r, c) => {
				askSummary(r, c, m, d, b)
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

Experiences.ask = function (r, c, m, d, b) {
	if(m.experiences) {
		c.say(Utils.response('I could not find a description of your past experiences. :thinking_face:', 'exp'));
		Consent.ask(r, c, b, function (allowed) {
			if(allowed) {
				askSummary(r, c, m, d, b);
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
