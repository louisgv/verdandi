"use strict";

let Location = {};

module.exports = Location;

const Next = require('./summary');

const Utils = require('../utils');

const Consent = require('../consent');

function askState(r, c, m, d, b) {
	c.ask(Utils.response('And which state? :earth_americas:', 'location'),
		function (r, c) {
			d.location.state = r.text;

			Next.ask(r, c, m, d, b);
			c.next();
		});
}

function askCity(r, c, m, d, b) {
	c.ask(Utils.response('Which city do you live in right now? :cityscape:', 'location'),
		function (r, c) {
			d.location.city = r.text;

			askState(r, c, m, d, b);
			c.next();
		});
}

Location.ask = function (r, c, m, d, b) {
	if(m.location) {
		c.say(Utils.response('I could not find any information regarding your location... :thinking_face:'));
		Consent.ask(r, c, b, function (allowed) {
			if(allowed) {
				askCity(r, c, m, d, b);
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
